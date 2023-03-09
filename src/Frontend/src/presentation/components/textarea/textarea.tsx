import React from 'react'
import './textarea-styles.scss'

type Props = {
  className: string;
  placeholder: string;
  size?: 'small' | 'medium' | 'large'
}

const Textarea = ({ size, className, placeholder }: Props) => {
  return (
    <div className='dell-textarea'>
      <textarea placeholder={'' + placeholder} className={`${className} ${size}`}></textarea>
    </div>
  )
}

export default Textarea