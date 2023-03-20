import React, { useEffect, useState } from 'react'
import './input-styles.scss'

type InputProps = {
  className?: string;
  placeholder: string;
  type: any;
  size?: 'small' | 'medium' | 'large';
  value?: any;
  onChange?: Function;
  disabled?: boolean;
  autocomplete?: "off" | "on";
}

const Input = (props: InputProps) => {
  const [value, setValue] = useState('')

  const changeValue = (value: any) => {
    setValue(value)
    if (props.onChange) {
      props.onChange(value)
    }
  }

  useEffect(() => {
    setValue(props.value)
  }, [props.value])

  return (
    <div className='dell-input'>
      <input
        type={props.type}
        autoComplete={props.autocomplete ? props.autocomplete : "on"}
        disabled={props.disabled}
        placeholder={'' + props.placeholder}
        className={`${props.className} ${props.size} ${props.disabled && "disabled"}`}
        value={value}
        onChange={(e) => changeValue(e.target.value)}
      />
    </div>
  )
}

export default Input