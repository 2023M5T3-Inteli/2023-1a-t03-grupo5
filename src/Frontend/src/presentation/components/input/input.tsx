import React, { useState } from 'react'
import './input-styles.scss'

type InputProps = {
  className: string;
  placeholder: string;
  type: string;
  size?: 'small' | 'medium' | 'large';
  value?: string
}

const Input = (props: InputProps) => {
  const [value, setValue] = useState(props.value || '')

  return (
    <div className='dell-input'>
      <input type={props.type} placeholder={'' + props.placeholder} className={`${props.className} ${props.size}`} value={value} onChange={(e) => setValue(e.target.value)}></input>
    </div>
  )
}

export default Input