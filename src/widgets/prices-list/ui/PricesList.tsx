import { ErrorMessage, Loader } from "@/shared/ui";
import { useSearchPricesStore } from "../model/store";
import styles from "./PricesList.module.scss";

export const PricesList = () => {
  const { prices, loading, error } = useSearchPricesStore();

  return (
    <div className={styles.prices_list}>
      {loading && <Loader />}
      {!!error && !loading && <ErrorMessage message={error} />}
      {(!error && !loading && prices.length === 0) && (
        <p>За вашим запитом турів не знайдено</p>
      )}
    </div>
  );
};
