import type { Hotel, PriceOffer } from "@/shared/types";
import { formatDate, formatPrice } from "@/shared/utils/utils";

export const createTourEntity = ({
  hotel,
  price,
}: {
  hotel: Hotel;
  price: PriceOffer;
}) => {
  let newItem: PriceOffer & Partial<Omit<Hotel, "id">> = {
    ...price,
    ...hotel,
    id: price.id,
  };

  return {
    img: newItem.img!,
    name: newItem.name!,
    location: `${newItem.countryName}, ${newItem.cityName}`,
    startDate: formatDate(newItem.startDate),
    amount: formatPrice(newItem.amount, newItem.currency),
    priceId: newItem.id,
    hotelId: newItem.hotelID!,
    description: newItem.description,
    services: newItem.services
  };
};
