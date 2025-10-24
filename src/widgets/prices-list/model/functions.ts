import { getSearchPrices } from "@/shared/api/api";
import type {
  ErrorResponse,
  GetSearchPricesResponse,
  Hotel,
  HotelsMap,
  PriceOffer,
  StartSearchResponse,
} from "@/shared/types";
import { formatDate, formatPrice, sleep } from "@/shared/utils/utils";

export const getPricesWithRetry = async ({
  token,
  until,
  attemptsLeft = 2,
}: {
  token: StartSearchResponse["token"];
  until: number;
  attemptsLeft?: number;
}): Promise<GetSearchPricesResponse & ErrorResponse> => {
  await sleep(until - Date.now());
  const data = await getSearchPrices(token)
    .then((d) => d.json())
    .catch((e) => e.json());

  if (data?.waitUntil && attemptsLeft > 0) {
    const nextUntil = new Date(data.waitUntil).getTime();
    return getPricesWithRetry({
      token,
      until: nextUntil,
      attemptsLeft: attemptsLeft - 1,
    });
  }

  return { ...data };
};

export const createPricesList = ({
  prices,
  hotels,
}: {
  prices: GetSearchPricesResponse["prices"];
  hotels: HotelsMap;
}) => {
  const newPrices = Object.values(prices).map((priceItem) => {
    let newItem: PriceOffer & Partial<Omit<Hotel, "id">> = priceItem;

    if (priceItem.hotelID) {
      newItem = {
        ...priceItem,
        ...hotels[priceItem.hotelID],
        id: priceItem.id,
      };
    }

    const price = {
      img: newItem.img!,
      name: newItem.name!,
      location: `${newItem.countryName}, ${newItem.cityName}`,
      startDate: formatDate(newItem.startDate),
      amount: formatPrice(newItem.amount, newItem.currency),
      priceId: newItem.id,
      hotelId: newItem.hotelID!,
    };

    return price;
  });
  return newPrices;
};
