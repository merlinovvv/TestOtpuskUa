import { ErrorMessage, Loader } from "@/shared/ui";
import { useSearchPricesStore } from "../model/store";
import styles from "./PricesList.module.scss";
import { PriceTourItem } from "@/entities/tour";

export const PricesList = () => {
  const { prices, loading, error, isEmptyPrices } = useSearchPricesStore();

  if (loading) {
    return <Loader />;
  }

  if (!!error && !loading) {
    return <ErrorMessage message={error} />;
  }

  if (isEmptyPrices) {
    return <p>За вашим запитом турів не знайдено</p>;
  }

  return (
    <div className={styles.prices}>
      <div className={styles.prices__list}>
        {prices.map((price) => (
          <PriceTourItem {...price} />
        ))}
      </div>
    </div>
  );
};
