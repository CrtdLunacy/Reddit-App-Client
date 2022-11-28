import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import { EIcons, Icon } from '../Icon';
import styles from './answerform.css';

interface IAnswerFormProps {
  name?: string
}

export function AnswerForm({name}:IAnswerFormProps) {
  const [value, setValue] = useState('');
  const ref = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
  }

  // const handleSubmit = (e: FormEvent) => {
  //   console.log(value);
  // }

  useEffect(()=> {
    if(ref.current) {
      ref.current.focus()
      window.scrollTo({left: 0, top: ref.current.offsetTop, behavior: "smooth"})
    }
  }, [])

  return (
    <form className={styles.form}>
      <textarea className={styles.input} value={(value) ? value : `${name}, `} onChange={handleChange} ref={ref}/>
      <div className={styles.panel__wrap}>
        {/* <div className={styles.button__wrap}>
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
        </div> */}
       <button className={styles.button} type='submit'>Ответить</button>
      </div>
    </form>
  );
}
