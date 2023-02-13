import React, { useState } from "react";
import { ReviewFormProps } from "./ReviewForm.props";
import cn from "classnames";
import styles from "./ReviewForm.module.css";
import { Rating } from "../Rating/Rating";
import { Textarea } from "../Textarea/Textarea";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import CloseSvg from "./close.svg";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { IReviewForm, IReviewSentResponse } from "./ReviewForm.interface";
import axios from "axios";
import { API } from "../../helpers/api";

export const ReviewForm = ({
  isOpened,
  productId,
  className,
  ...props
}: ReviewFormProps): JSX.Element => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<IReviewForm>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const onSubmit: SubmitHandler<IReviewForm> = async (formData: IReviewForm) => {
    try {
      const { data } = await axios.post<IReviewSentResponse>(API.review.createDemo, {
        ...formData,
        productId,
      });
      if (data.message) {
        setIsSuccess(true);
        reset();
      } else {
        setError("Что-то пошло не так");
      }
    } catch (e) {
      setIsSuccess(false);
      setError((e as Error).message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(styles.reviewForm, className)} {...props}>
        <Input
          tabIndex={isOpened ? 0 : -1}
          {...register("name", { required: { value: true, message: "Заполните имя" } })}
          placeholder='Имя'
          error={errors.name}
          aria-invalid={errors.name ? true : false}
        />
        <Input
          tabIndex={isOpened ? 0 : -1}
          {...register("title", { required: { value: true, message: "Заполните заголовок" } })}
          placeholder='Заголовок отзыва'
          error={errors.title}
          aria-invalid={errors.title ? true : false}
        />
        <div className={styles.rating}>
          <span>Оценка</span>
          <Controller
            control={control}
            name='rating'
            rules={{ required: { value: true, message: "Поставьте оценку" } }}
            render={({ field }) => (
              <Rating
                rating={field.value}
                error={errors.rating}
                ref={field.ref}
                isEditable
                setRating={field.onChange}
              />
            )}
          />
        </div>
        <Textarea
          tabIndex={isOpened ? 0 : -1}
          {...register("description", {
            required: { value: true, message: "Заполните описание" },
          })}
          className={styles.description}
          placeholder='Текст отзыва'
          error={errors.description}
          aria-label='Текст отзыва'
          aria-invalid={errors.description ? true : false}
        />
        <div className={styles.submit}>
          <Button
            tabIndex={isOpened ? 0 : -1}
            appearance='primary'
            type='submit'
            onClick={() => clearErrors()}
          >
            Отправить
          </Button>
          <span>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
        </div>
      </div>
      {isSuccess && (
        <div className={cn(styles.panel, styles.success)} role='alert'>
          <div className={styles.successTitle}>Ваш отзыв отправлен!</div>
          <div>Спасибо, ваш отзыв будет опубликован после проверки.</div>
          <button
            className={styles.close}
            onClick={() => setIsSuccess(false)}
            aria-label='закрыть оповещение'
          >
            <CloseSvg />
          </button>
        </div>
      )}

      {error && (
        <div className={cn(styles.panel, styles.error)} role='alert'>
          Что-то пошло не так, попробуйте обновить страницу
          <button
            className={styles.close}
            onClick={() => setError(undefined)}
            aria-label='закрыть оповещение'
          >
            <CloseSvg />
          </button>
        </div>
      )}
    </form>
  );
};
