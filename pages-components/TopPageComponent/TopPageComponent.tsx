import cn from "classnames";
import React from "react";
import { Htag, Tag, HhData, Advantages, Ptag } from "../../components";
import { TopPageComponentProps } from "./TopPageComponent.props";
import styles from "./TopPageComponent.module.css";
import { TopLevelCategory } from "../../interfaces/page.interface";

export const TopPageComponent = ({
  products,
  page,
  firstCategory,
}: TopPageComponentProps): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <Htag tag='h1'>{page.title}</Htag>
        {products && (
          <Tag color='grey' size='m'>
            {products.length}
          </Tag>
        )}
        <span>Сортировка</span>
      </div>
      <div>{products && products.map((p) => <div key={p._id}>{p.title}</div>)}</div>
      <div className={styles.hhTitle}>
        <Htag tag='h2'>Вакансии - {page.category}</Htag>
        <Tag color='red' size='m'>
          hh.ru
        </Tag>
      </div>
      {firstCategory == TopLevelCategory.Courses && page.hh && <HhData {...page.hh} />}

      {page.advantages && page.advantages.length > 0 && (
        <>
          <Htag tag='h2'>Преимущества</Htag>
          <Advantages advantages={page.advantages} />
        </>
      )}
      {page.seoText && <Ptag size='l'>{page.seoText}</Ptag>}

      <Htag tag='h2' className={styles.titleSkills}>
        Получаемые навыки
      </Htag>
      <div className={styles.skills}>
        {page.tags.map((t) => (
          <Tag color='primary' size='m' key={t}>
            {t}
          </Tag>
        ))}
      </div>
    </div>
  );
};
