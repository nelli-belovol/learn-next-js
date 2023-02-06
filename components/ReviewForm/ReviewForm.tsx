import React from "react";
import { ReviewFormProps } from "./ReviewForm.props";
import cn from "classnames";
import styles from "./ReviewForm.module.css";
import { Rating } from "../Rating/Rating";
import { Textarea } from "../Textarea/Textarea";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import CloseSvg from "./close.svg";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { IReviewForm } from "./ReviewForm.interface";

export const ReviewForm = ({ productId, className, ...props }: ReviewFormProps): JSX.Element => {
  const { register, control, handleSubmit, reset } = useForm<IReviewForm>();

  const onSubmit: SubmitHandler<IReviewForm> = (data: IReviewForm) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(styles.reviewForm, className)} {...props}>
        <Input {...register("name")} placeholder='Имя' />
        <Input {...register("title")} placeholder='Заголовок отзыва' />
        <div className={styles.rating}>
          <span>Оценка</span>
          <Controller
            control={control}
            name='rating'
            render={({ field }) => (
              <Rating rating={field.value} ref={field.ref} isEditable setRating={field.onChange} />
            )}
          />
        </div>
        <Textarea
          {...register("description")}
          className={styles.description}
          placeholder='Текст отзыва'
        />
        <div className={styles.submit}>
          <Button appearance='primary' type='submit'>
            Отправить
          </Button>
          <span>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
        </div>
      </div>
      <div className={styles.success}>
        <div className={styles.successTitle}>Ваш отзыв отправлен!</div>
        <div>Спасибо, ваш отзыв будет опубликован после проверки.</div>
        <CloseSvg className={styles.close} />
      </div>
    </form>
  );
};
