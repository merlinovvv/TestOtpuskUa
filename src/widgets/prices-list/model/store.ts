import { startSearchPrices } from "@/shared/api/api";
import type {
  ErrorResponse,
  PriceOffer,
  StartSearchResponse,
} from "@/shared/types";
import { create } from "zustand";
import { createPricesList, getPricesWithRetry } from "./functions";

interface SearchPricesProps {
  prices: PriceOffer[];
  pricesCountries: { [countryId: string]: PriceOffer[] };
  loading: boolean;
  error: ErrorResponse["message"] | null;
  searchPrices: (countryId: string) => Promise<void>;
}

export const useSearchPricesStore = create<SearchPricesProps>((set, get) => ({
  prices: [],
  pricesCountries: {},
  loading: false,
  error: null,
  searchPrices: async (countryId) => {
    set({ loading: true, error: null });

    if (
      !!get().pricesCountries[countryId] &&
      get().pricesCountries[countryId].length > 0
    ) {
      set({ loading: false, prices: get().pricesCountries[countryId] });
      return;
    }

    const start: StartSearchResponse & ErrorResponse = await startSearchPrices(
      countryId
    )
      .then((d) => d.json())
      .catch((e) => e.json());

    if (start.error) {
      set({ error: start.message, loading: false });
      return;
    }

    let until = new Date(start.waitUntil).getTime();

    const resp = await getPricesWithRetry({ token: start.token, until });

    if (resp?.error) {
      set({ error: resp.message, loading: false });
      return;
    }

    const presentPrices = createPricesList({ prices: resp.prices });

    set(({ pricesCountries }) => ({
      pricesCountries: {
        ...pricesCountries,
        [countryId]: presentPrices,
      },
      prices: presentPrices,
      loading: false,
    }));
    return;
  },
}));
