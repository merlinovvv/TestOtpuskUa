import { create } from "zustand";
//ts-ignore
import { getCountries, searchGeo } from "@/shared/api/api"; 
import type { CountriesMap, GeoResponse } from "@/shared/types";
import { createDropdownOptions } from "./functions";

interface SearchToursStore {
  loading: boolean;
  error: string | null;
  searchToursDropdownOptions: any[];
  fetchSearchToursOptions: (query?: string) => Promise<void>;
}

export const useSearchToursStore = create<SearchToursStore>((set) => ({
  loading: false,
  error: null,
  searchToursDropdownOptions: [],
  fetchSearchToursOptions: async (query) => {
    set({ loading: true });
    try {
      if (!query) {
        const countries: CountriesMap = await getCountries().then(
          (data: Response) => data.json()
        );
        set({
          searchToursDropdownOptions: createDropdownOptions({
            countriesMap: countries,
          }),
        });
      } else {
        const results: GeoResponse = await searchGeo(query).then(
          (data: Response) => data.json()
        );

        set({
          searchToursDropdownOptions: createDropdownOptions({
            geoMap: results,
          }),
        });
      }
    } catch (error) {
      console.error(error);
    }

    set({ loading: false });
  },
}));
