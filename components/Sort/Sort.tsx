import React, { KeyboardEvent } from "react";
import { SortEnum, SortProps } from "./Sort.props";
import styles from "./Sort.module.css";
import SortIcon from "./sort.svg";
import cn from "classnames";

export const Sort = ({ sort, setSort, className, ...props }: SortProps): JSX.Element => {
  return (
    <div className={cn(styles.sort, className)} {...props}>
      <div id='sort' className={styles.sortName}>
        Сортировка
      </div>
      <button
        id='rating'
        aria-selected={sort === SortEnum.Rating}
        aria-labelledby='sort rating'
        onClick={() => setSort(SortEnum.Rating)}
        className={cn({
          [styles.active]: sort === SortEnum.Rating,
        })}
      >
        <SortIcon className={styles.sortIcon} />
        По рейтингу
      </button>
      <button
        id='price'
        aria-selected={sort === SortEnum.Price}
        aria-labelledby='sort price'
        onClick={() => setSort(SortEnum.Price)}
        className={cn({
          [styles.active]: sort === SortEnum.Price,
        })}
      >
        <SortIcon className={styles.sortIcon} />
        По цене
      </button>
    </div>
  );
};
