import React from "react";
import { ParagraphProps } from "./Ptag.props";
import cn from "classnames";
import styles from "./Ptag.module.css";

export const Ptag = ({
  size = "m",
  children,
  className,
  ...props
}: ParagraphProps): JSX.Element => {
  return (
    <p
      className={cn(styles.paragraph, className, {
        [styles.small]: size == "s",
        [styles.medium]: size == "m",
        [styles.large]: size == "l",
      })}
      {...props}
    >
      {children}
    </p>
  );
};
