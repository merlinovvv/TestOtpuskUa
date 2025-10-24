import { create } from "zustand";
import { getCountries, searchGeo } from "@/shared/api/api";
import type { CountriesMap, GeoResponse } from "@/shared/types";
import { createDropdownOptions } from "./functions";

interface DropdownOptionsStore {
  loading: boolean;
  error: string | null;
  dropdownOptions: any[];
  fetchDropdownOptions: (query?: string) => Promise<void>;
}

export const useDropdownOptionsStore = create<DropdownOptionsStore>((set) => ({
  loading: false,
  error: null,
  dropdownOptions: [],
  fetchDropdownOptions: async (query) => {
    set({ loading: true });
    try {
      if (!query) {
        const countries: CountriesMap = await getCountries().then(
          (data: Response) => data.json()
        );
        set({
          dropdownOptions: createDropdownOptions({
            countriesMap: countries,
          }),
        });
      } else {
        const results: GeoResponse = await searchGeo(query).then(
          (data: Response) => data.json()
        );

        set({
          dropdownOptions: createDropdownOptions({
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
