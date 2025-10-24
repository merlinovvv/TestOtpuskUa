import type { PriceTour } from "@/shared/types";
import { Card } from "@/shared/ui";
import type { FC } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/PriceTourItem.module.scss";
import { TourImage } from "./TourImage";
import { TourLocation } from "./TourLocation";
import { TourPrice } from "./TourPrice";
import { TourStartDate } from "./TourStartDate";

export const PriceTourItem: FC<PriceTour> = (price) => {
  return (
    <Card className={styles.price}>
      <TourImage src={price.img} alt={price.name} />
      <h3 className={styles.price__title}>{price.name}</h3>
      <TourLocation location={price.location} />
      <TourStartDate startDate={price.startDate} />
      <TourPrice amount={price.amount} />
      <Link
        to={`/tour/${price.priceId}/${price.hotelId}`}
        className={styles.price__link}
      >
        Відкрити ціну
      </Link>
    </Card>
  );
};
