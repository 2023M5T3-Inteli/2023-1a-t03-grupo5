import React, { useState } from 'react'
import './textarea-styles.scss'

type Props = {
  className: string;
  placeholder: string;
  value?: string;
  size?: 'small' | 'medium' | 'large';
}

const Textarea = (props: Props) => {
  const [value, setValue] = useState(props.value || '')
  return (
    <div className='dell-textarea'>
      <textarea placeholder={'' + props.placeholder} className={`${props.className} ${props.size}`} value={value} onChange={(e) => setValue(e.target.value)}></textarea>
    </div>
  )
}

export default Textarea