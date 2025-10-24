import type { PriceTour } from "@/shared/types";
import type { FC } from "react";
import styles from "../styles/TourUI.module.scss";

export const TourStartDate: FC<{ startDate: PriceTour["startDate"] }> = ({
  startDate,
}) => {
  return (
    <div className={styles.tour_start_date}>
      <p>Початок туру</p>
      <p>{startDate}</p>
    </div>
  );
};
