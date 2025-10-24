import clsx from "clsx";
import type { FC } from "react";
import styles from "./Card.module.scss";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  title?: string;
}

export const Card: FC<CardProps> = ({
  children,
  className,
  title,
  ...props
}) => {
  return (
    <div className={clsx(styles.card, className)} {...props}>
      {!!title && <h2 className={styles.card__title}>{title}</h2>}
      {children}
    </div>
  );
};
