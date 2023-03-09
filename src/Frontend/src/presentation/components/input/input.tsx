import React from 'react'
import './input-styles.scss'

type InputProps = {
    className: string;
    placeholder: string;
    type: string;
    size?: 'small' | 'medium' | 'large';
}

const Input = ({className, size, placeholder, type}: InputProps ) => {
  return (
    <div className='dell-input'>
        <input type={type} placeholder={''+placeholder} className={`${className} ${size}`}></input>
    </div>
  )
}

export default Input