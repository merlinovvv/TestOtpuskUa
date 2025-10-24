import { getSearchPrices } from "@/shared/api/api";
import type {
  ErrorResponse,
  GetSearchPricesResponse,
  StartSearchResponse,
} from "@/shared/types";
import { sleep } from "@/shared/utils/utils";

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
}: {
  prices: GetSearchPricesResponse["prices"];
}) => {
  return Object.values(prices);
};
