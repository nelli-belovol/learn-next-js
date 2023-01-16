import React from "react";
import { FooterProps } from "./Footer.props";
import cn from "classnames";
import styles from "./Footer.module.css";
import { Ptag } from "../../components";
import { format } from "date-fns";

export const Footer = ({ className, ...props }: FooterProps): JSX.Element => {
  return (
    <footer className={cn(className, styles.footerWrap)} {...props}>
      <div className={styles.rights}>
        OwlTop © 2020 - {format(new Date(), "yyyy")} Все права защищены
      </div>
      <a href='#' target='_blank' className={styles.agreement}>
        Пользовательское соглашение
      </a>
      <a href='#' target='_blank' className={styles.confidentiality}>
        Политика конфиденциальности
      </a>
    </footer>
  );
};
