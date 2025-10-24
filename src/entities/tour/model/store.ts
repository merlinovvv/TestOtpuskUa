import { getHotel, getPrice } from "@/shared/api/api";
import type { ErrorResponse, Hotel, PriceOffer, Tour } from "@/shared/types";
import { create } from "zustand";
import { createTourEntity } from "./functions";

interface TourStoreProps {
  tour: Tour | null;
  loading: boolean;
  error: string | null;
  getTour: ({
    priceId,
    hotelId,
  }: {
    priceId: string;
    hotelId: string;
  }) => Promise<void>;
}

export const useTourStore = create<TourStoreProps>((set) => ({
  tour: null,
  loading: false,
  error: null,
  getTour: async ({ priceId, hotelId }) => {
    set({ loading: true, error: null });

    const respPrice: PriceOffer & ErrorResponse = await getPrice(priceId)
      .then((d) => d.json())
      .catch((e) => e.json());

    if (respPrice.error) {
      set({ error: respPrice.message, loading: false });
      return;
    }

    const respHotel: Hotel & ErrorResponse = await getHotel(Number(hotelId))
      .then((d) => d.json())
      .catch((e) => e.json());

    if (respHotel.error) {
      set({ error: respHotel.message, loading: false });
      return;
    }

    set({
      tour: createTourEntity({ price: respPrice, hotel: respHotel }),
      loading: false,
    });
  },
}));
