import clsx from "clsx";
import type { FC } from "react";
import styles from "./Button.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export const Button: FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button className={clsx(styles.button, className)} {...props}>
      {children}
    </button>
  );
};
