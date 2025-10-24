import type { PriceTour } from "@/shared/types";
import type { FC } from "react";
import styles from "../styles/TourUI.module.scss";

export const TourImage: FC<{
  src: PriceTour["img"];
  alt: PriceTour["name"];
}> = ({ src, alt }) => {
  return <img className={styles.tour_image} src={src} alt={alt} />;
};
