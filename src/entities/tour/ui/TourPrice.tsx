import type { PriceTour } from "@/shared/types";
import type { FC } from "react";
import styles from "../styles/TourUI.module.scss";

export const TourPrice: FC<{ amount: PriceTour["amount"] }> = ({ amount }) => {
  return <div className={styles.tour_price}>{amount}</div>;
};
