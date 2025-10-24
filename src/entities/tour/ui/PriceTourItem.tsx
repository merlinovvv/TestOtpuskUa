import type { PriceTour } from "@/shared/types";
import { Card } from "@/shared/ui";
import type { FC } from "react";
import styles from "./PriceTourItem.module.scss";
import { Globe } from "lucide-react";
import { Link } from "react-router-dom";

export const PriceTourItem: FC<PriceTour> = (price) => {
  return (
    <Card className={styles.price}>
      <img className={styles.price__image} src={price.img} alt={price.name} />
      <h3 className={styles.price__title}>{price.name}</h3>
      <div className={styles.price__location}>
        <Globe />
        <div>{price.location}</div>
      </div>
      <div className={styles.price__start_date}>
        <p>Початок туру</p>
        <p>{price.startDate}</p>
      </div>
      <div className={styles.price__price}>{price.amount}</div>
      <Link
        to={`/tour/${price.priceId}/${price.hotelId}`}
        className={styles.price__link}
      >
        Відкрити ціну
      </Link>
    </Card>
  );
};
