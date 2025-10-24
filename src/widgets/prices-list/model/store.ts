import { getHotels, startSearchPrices } from "@/shared/api/api";
import type {
  ErrorResponse,
  HotelsMap,
  PriceTour,
  StartSearchResponse,
} from "@/shared/types";
import { create } from "zustand";
import { createPricesList, getPricesWithRetry } from "./functions";

interface SearchPricesProps {
  prices: PriceTour[];
  isEmptyPrices: boolean;
  hotelsCountries: { [countryId: string]: HotelsMap };
  loading: boolean;
  error: ErrorResponse["message"] | null;
  searchPrices: (countryId: string) => Promise<void>;
}

export const useSearchPricesStore = create<SearchPricesProps>((set, get) => ({
  prices: [],
  isEmptyPrices: false,
  hotelsCountries: {},
  loading: false,
  error: null,
  searchPrices: async (countryId) => {
    set({ loading: true, error: null, isEmptyPrices: false });

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

    let hotelsList = {};

    if (!!get().hotelsCountries[countryId]) {
      hotelsList = get().hotelsCountries[countryId];
    } else {
      hotelsList = await getHotels(countryId).then((d) => d.json());
      set(({ hotelsCountries }) => ({
        hotelsCountries: {
          ...hotelsCountries,
          [countryId]: hotelsList,
        },
      }));
    }

    const presentPrices = createPricesList({
      prices: resp.prices,
      hotels: hotelsList,
    });

    set({
      prices: presentPrices,
      isEmptyPrices: presentPrices.length === 0,
      loading: false,
    });
    return;
  },
}));
