import { SearchPricesForm } from "@/widgets/search-prices-form";
import { PricesList } from "@/widgets/prices-list";
import type { FC } from "react";
import styles from "./SearchPage.module.scss";

export const SearchPage: FC = () => {
  return (
    <main className={styles.search_page}>
      <SearchPricesForm />
      <PricesList />
    </main>
  );
};
