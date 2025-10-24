import type { Tour } from "@/shared/types";
import { Card } from "@/shared/ui";
import clsx from "clsx";
import {
    SquareParking,
    Volleyball,
    WashingMachine,
    WavesLadder,
    Wifi,
} from "lucide-react";
import type { FC } from "react";
import styles from "../styles/TourCard.module.scss";
import { TourImage } from "./TourImage";
import { TourLocation } from "./TourLocation";
import { TourPrice } from "./TourPrice";
import { TourStartDate } from "./TourStartDate";

const servicesIconsAs = {
  wifi: {
    icon: Wifi,
    name: "Wi-Fi",
  },
  aquapark: {
    icon: WavesLadder,
    name: "Aquapark",
  },
  tennis_court: {
    icon: Volleyball,
    name: "Tennis court",
  },
  laundry: {
    icon: WashingMachine,
    name: "Laundry",
  },
  parking: {
    icon: SquareParking,
    name: "Parking",
  },
};

export const TourCard: FC<Tour> = (tour) => {
  return (
    <Card className={styles.tour_card} title={tour.name}>
      <div className={styles.tour_card__wrapper}>
        <TourLocation location={tour.location} />
        <TourImage src={tour.img} alt={tour.name} />
        <div className={clsx(styles.tour_card__desc, styles.desc)}>
          <p className={styles.desc__title}>Опис</p>
          <p className={styles.desc__text}>{tour.description}</p>
        </div>
        {tour.services && (
          <div className={clsx(styles.tour_card__services, styles.services)}>
            <p className={styles.services__title}>Сервіси</p>
            <ul className={styles.services__list}>
              {Object.entries(tour.services).map(([key, value]) => {
                if (value !== "yes") return null;

                const Icon =
                  servicesIconsAs[key as keyof typeof servicesIconsAs].icon;
                const name =
                  servicesIconsAs[key as keyof typeof servicesIconsAs].name;
                return (
                  <li key={key} className={styles.services__item}>
                    <Icon size={20} />
                    {name}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        <div className={styles.tour_card__divider}></div>
        <TourStartDate startDate={tour.startDate} />
        <TourPrice amount={tour.amount} />
      </div>
    </Card>
  );
};
