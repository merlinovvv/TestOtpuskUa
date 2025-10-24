import {
  getHotels,
  startSearchPrices,
  stopSearchPrices,
} from "@/shared/api/api";
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
  activeToken: string | null;
  restart: boolean;
  searchPrices: (countryId: string) => Promise<void>;
}

export const useSearchPricesStore = create<SearchPricesProps>((set, get) => ({
  prices: [],
  isEmptyPrices: false,
  hotelsCountries: {},
  loading: false,
  error: null,
  activeToken: null,
  restart: false,
  searchPrices: async (countryId) => {
    const { activeToken, restart } = get();

    // якщо процес рестарту, то пропускаємо
    if (restart) return;

    // якщо є активний токен (тобто, є пошук), то зупиняємо
    if (activeToken) {
      set({ loading: true, restart: true });

      const stopResp = await stopSearchPrices(activeToken)
        .then((d) => d.json())
        .catch((e) => e.json());

      if (stopResp.error) {
        set({ error: stopResp.message, restart: false, activeToken: null });
        return;
      }

      set({ activeToken: null });
    }

    set({ loading: true, error: null, isEmptyPrices: false });

    // отримуємо токен і час очікування
    const start: StartSearchResponse & ErrorResponse = await startSearchPrices(
      countryId
    )
      .then((d) => d.json())
      .catch((e) => e.json());

    if (start.error) {
      set({
        error: start.message,
        loading: false,
        restart: false,
        activeToken: null,
      });
      return;
    }

    set({ activeToken: start.token });

    let until = new Date(start.waitUntil).getTime();

    // отримання дані з ретраями
    const resp = await getPricesWithRetry({
      token: start.token,
      until,
    });

    // якщо токени не співпадають, то скіпаємо процес (захист від race-conditiions)
    if (get().activeToken !== start.token) {
      console.log("ignore");
      return;
    }

    if (resp?.error) {
      set({
        error: resp.message,
        loading: false,
        restart: false,
        activeToken: null,
      });
      return;
    }

    let hotelsList = {};

    // зберігаємо в стані, або отримуємо готелі за країною
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

    // створюємо презентаційну модель турів з готелів та цін
    const presentPrices = createPricesList({
      prices: resp.prices,
      hotels: hotelsList,
    });

    // оновлюємо стан
    set({
      prices: presentPrices,
      isEmptyPrices: presentPrices.length === 0,
      loading: false,
      restart: false,
      activeToken: null,
    });
    return;
  },
}));
