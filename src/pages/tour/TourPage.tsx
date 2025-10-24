import { TourCard, useTourStore } from "@/entities/tour";
import { useEffect, type FC } from "react";
import styles from "./TourPage.module.scss";
import { useParams } from "react-router-dom";
import { ErrorMessage } from "@/shared/ui";

export const TourPage: FC = () => {
  const { priceId, hotelId, error } = useParams();
  const { tour, getTour } = useTourStore();

  useEffect(() => {
    if (priceId && hotelId) {
      getTour({ priceId, hotelId });
    }
  }, [priceId, hotelId]);

  return (
    <main className={styles.tour_page}>
      {!!error && <ErrorMessage message={error} />}
      {!!tour && <TourCard {...tour} />}
    </main>
  );
};
