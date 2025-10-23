import { SearchToursForm } from "@/widgets/search-tours-form";
import type { FC } from "react";
import styles from "./SearchPage.module.scss";

export const SearchPage: FC = () => {
  return (
    <main className={styles.search_page}>
      <SearchToursForm />
    </main>
  );
};
