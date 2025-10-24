import type { FC } from "react";
import styles from "./ErrorMessage.module.scss";

export const ErrorMessage: FC<{ message: string }> = ({ message }) => {
  return <div className={styles.error_message}>{message}</div>;
};
