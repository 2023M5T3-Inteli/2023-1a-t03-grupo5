import React from 'react'
import './compInput-styles.scss'

type InputProps = {
    Title: string;
    className: string;
    placeholder: string;
    type: string;
}

const Input = ({Title, className, placeholder, type}: InputProps ) => {
  return (
    <div className=''>
        <h4 className='text-Input'>{Title}</h4>  
        <input type={type} placeholder={''+placeholder} className='InputCreateIn'></input>
    </div>
  )
}

export default Input