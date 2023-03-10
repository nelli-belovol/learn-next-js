import React, { ForwardedRef, forwardRef, useRef, useState } from "react";
import { ProductProps } from "./Product.props";
import cn from "classnames";
import styles from "./Product.module.css";
import { Card } from "../Card/Card";
import { Rating } from "../Rating/Rating";
import { Tag } from "../Tag/Tag";
import { Button } from "../Button/Button";
import { declOfNum, priceRu } from "../../helpers/helpers";
import { Divider } from "../Divider/Divider";
import Image from "next/image";
import { Review, ReviewForm } from "../index";
import { motion } from "framer-motion";

export const Product = motion(
  forwardRef(
    (
      { product, className, ...props }: ProductProps,
      ref: ForwardedRef<HTMLDivElement>
    ): JSX.Element => {
      const [isReviewOpen, setIsReviewOpened] = useState<boolean>(false);
      const reviewRef = useRef<HTMLDivElement>(null);
      const scrollToReview = () => {
        setIsReviewOpened(true);
        reviewRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        reviewRef.current?.focus();
      };

      const variants = {
        visible: {
          opacity: 1,
          height: "auto",
        },
        hidden: { opacity: 0, height: 0 },
      };

      return (
        <div className={className} {...props} ref={ref}>
          <Card className={styles.product}>
            <div className={styles.logo}>
              <Image
                width={70}
                height={70}
                src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
                alt={product.title}
              />
            </div>
            <div className={styles.title}>{product.title}</div>
            <div className={styles.price}>
              <span>
                <span className='visualyHidden'>цена</span>
                {priceRu(product.price)}
              </span>

              {product.oldPrice && (
                <Tag className={styles.oldPrice} size='s' color='green'>
                  <span className='visualyHidden'>скидка</span>
                  {priceRu(product.price - product.oldPrice)}
                </Tag>
              )}
            </div>
            <div className={styles.credit}>
              <span className='visualyHidden'>кредит</span>
              {priceRu(product.credit)}/<span className={styles.months}>мес</span>
            </div>
            <div className={styles.rating}>
              <span className='visualyHidden'>
                {"Рейтинг" + (product.reviewAvg ?? product.initialRating)}
              </span>
              <Rating rating={product.reviewAvg ?? product.initialRating} />
            </div>
            <div className={styles.tags}>
              {product.categories.map((c) => (
                <Tag color='ghost' className={styles.category} key={c}>
                  {c}
                </Tag>
              ))}
            </div>
            <div className={styles.priceTitle} aria-hidden={true}>
              цена
            </div>
            <div className={styles.creditTitle} aria-hidden={true}>
              кредит
            </div>
            <div className={styles.rateTitle}>
              <a href='#ref' onClick={scrollToReview}>
                {product.reviewCount}
                {declOfNum(product.reviewCount, ["отзыв", "отзыва", "отзывов"])}
              </a>
            </div>
            <Divider className={styles.hr} />
            <div className={styles.description}>{product.description}</div>
            <div className={styles.features}>
              {product.characteristics.map((ch) => (
                <div className={styles.characteristics} key={ch.name}>
                  <span className={styles.characteristicsName}>{ch.name}</span>
                  <span className={styles.characteristicsDots}></span>
                  <span>{ch.value}</span>
                </div>
              ))}
            </div>
            <div className={styles.advBlock}>
              {product.advantages && (
                <div className={styles.advantages}>
                  <div className={styles.advTitle}>Преимущества</div>
                  <div> {product.advantages}</div>
                </div>
              )}
              {product.disadvantages && (
                <div className={styles.disadvantages}>
                  <div className={styles.disadvTitle}>Недостатки</div>
                  <div> {product.disadvantages}</div>
                </div>
              )}
            </div>
            <Divider className={cn(styles.hr, styles.hr2)} />
            <div className={styles.actions}>
              <Button appearance='primary'>Узнать больше</Button>
              <Button
                onClick={() => setIsReviewOpened(!isReviewOpen)}
                className={styles.reviewButton}
                appearance='ghost'
                arrow={isReviewOpen ? "down" : "right"}
                aria-expanded={isReviewOpen}
              >
                Читать отзывы
              </Button>
            </div>
          </Card>
          <motion.div
            variants={variants}
            initial={"hidden"}
            animate={isReviewOpen ? "visible" : "hidden"}
          >
            <Card
              color='blue'
              className={cn(styles.reviews)}
              ref={reviewRef}
              tabIndex={isReviewOpen ? 0 : -1}
            >
              {product.reviews.map((r) => (
                <div key={r._id}>
                  <Review review={r} />
                  <Divider />
                </div>
              ))}
              <ReviewForm productId={product._id} isOpened={isReviewOpen} />
            </Card>
          </motion.div>
        </div>
      );
    }
  )
);
