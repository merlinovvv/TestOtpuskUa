import type { PriceTour } from "@/shared/types";
import { Globe } from "lucide-react";
import type { FC } from "react";
import styles from "../styles/TourUI.module.scss";

export const TourLocation: FC<{ location: PriceTour["location"] }> = ({
  location,
}) => {
  return (
    <div className={styles.tour_location}>
      <Globe />
      <div>{location}</div>
    </div>
  );
};
