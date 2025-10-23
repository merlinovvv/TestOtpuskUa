import type { FC } from "react";
import styles from "./Loader.module.scss";
import clsx from "clsx";

interface LoaderProps {
  size?: "small" | "medium" | "large";
  className?: string;
}

export const Loader: FC<LoaderProps> = ({ size = "medium", className }) => {
  return (
    <div
      className={clsx(styles.loader, styles[`loader--${size}`], className)}
    ></div>
  );
};
