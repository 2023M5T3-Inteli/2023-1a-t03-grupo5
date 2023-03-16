import React, { useState } from 'react'
import './input-styles.scss'

type InputProps = {
  className?: string;
  placeholder: string;
  type: any;
  size?: 'small' | 'medium' | 'large';
  value?: any;
  onChange?: Function
}

const Input = (props: InputProps) => {
  const [value, setValue] = useState(props.value || '')

  const changeValue = (value: any) => {
    setValue(value)
    if(props.onChange) {
      props.onChange(value)
    }
  }

  return (
    <div className='dell-input'>
      <input type={props.type} placeholder={'' + props.placeholder} className={`${props.className} ${props.size}`} value={value} onChange={(e) => changeValue(e.target.value)}></input>
    </div>
  )
}

export default Input