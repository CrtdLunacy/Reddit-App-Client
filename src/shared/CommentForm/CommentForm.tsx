import React, {ChangeEvent} from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState, updateComment } from '../store/store';
import { EIcons, Icon } from '../Icon';
import styles from './commentform.css';

interface ICommentFormProps {
  name?: string
}

type Inputs = {
  commentInput: string,
};

export function CommentForm({name}:ICommentFormProps) {
  const value = useSelector<RootState, string>(state => state.commentText);
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const dispatch = useDispatch();

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(updateComment(e.target.value))
  }

  const onSubmit: SubmitHandler<Inputs> = (data) => {
      console.log(data);

      alert('Форма отправлена!');
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <textarea
        className={styles.input}
        value={value}
        {...register("commentInput", {minLength: 5, maxLength: 250, required: "Field is required"})}
        onChange={handleChange}
        aria-invalid={errors.commentInput ? "true" : "false"}
      />
      {errors.commentInput?.type === 'required' && <p role="alert">{errors.commentInput.message}</p>}
      {errors.commentInput?.type === 'minLength' && <p role="alert">Слишком короткий комментарий</p>}
      <div className={styles.panel__wrap}>
        <div className={styles.button__wrap}>
          <Icon name={EIcons.arrow} />
          <Icon name={EIcons.image} />
          <Icon name={EIcons.files} />
          <Icon name={EIcons.download} />
          <Icon name={EIcons.contact} />
          <Icon name={EIcons.reload} />
          <Icon name={EIcons.link} />
          <Icon name={EIcons.record} />
          <Icon name={EIcons.chat} />
          <Icon name={EIcons.draw} />
          <Icon name={EIcons.words} />
          <Icon name={EIcons.pdf} />
        </div>
       <button className={styles.button} type='submit'>Комментировать</button>
      </div>
    </form>
  );
}
