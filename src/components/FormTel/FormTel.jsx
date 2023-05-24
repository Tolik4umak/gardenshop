import s from './style.module.css'
import { useForm } from 'react-hook-form'
 
export default function FormTel({button, sendForm, btnStyle, inputStyle}) {

  const {register, reset, handleSubmit, formState: {errors}} = useForm({
    defaultValues:{
      tel: '+49'
    }
  })
  const onSubmit = data => {
    sendForm(data)
    reset()
  }

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={s.tel}>

        <input 
          {...register('tel', 
            {
              required: {message: 'This field is required', value: true}, 
              minLength: {message: `Telephone must contain minimum 13 simbols`, value: 13},
              maxLength: {message: `Telephone must contain maximum 14 simbols`, value: 14},
              pattern: {message: 'Telephone number not correct (only numbers required)'  ,  value: /^[\d\+][\d]{1,13}$/},
            })
          } 
          type='tel'
          placeholder='+4912345678900'
          style={{...inputStyle, border: errors.tel ? '1px solid #d32f2f': `${inputStyle.border}`}}
        />

        {errors.tel ? (<div className={s.err_label}>{errors.tel.message}</div>): ''}

      </div>
      <input className={s.btn} type='submit' value = {button} style={btnStyle}/>
    </form>
  )
}
