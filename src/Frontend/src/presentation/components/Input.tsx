import React from 'react'
import './compInput-styles.scss'

type InputProps = {
    className: string;
    placeholder: string;
    type: string;
}

const Input = ({className, placeholder, type}: InputProps ) => {
  return (
    <div className=''>
        <input type={type} placeholder={''+placeholder} className={className}></input>
    </div>
  )
}

export default Input