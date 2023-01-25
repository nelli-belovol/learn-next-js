import React from "react";
import { AdvantagesProps } from "./Advantages.props";
import styles from "./Advantages.module.css";
import CheckIcon from "./check.svg";
import { Htag } from "../Htag/Htag";
import { Ptag } from "../Ptag/Ptag";

export const Advantages = ({ advantages }: AdvantagesProps): JSX.Element => {
  return (
    <ul className={styles.advantagesList}>
      {advantages.map((a) => (
        <li className={styles.advantage} key={a._id}>
          <CheckIcon />
          <Htag tag='h3' className={styles.title}>
            {a.title}
          </Htag>
          <hr className={styles.line} />
          <Ptag size='l'>{a.description}</Ptag>
        </li>
      ))}
    </ul>
  );
};
