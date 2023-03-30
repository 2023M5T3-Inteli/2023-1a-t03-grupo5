import React from 'react'
import './button-styles.scss'

type Props = {
  type: 'default' | 'secundary' | 'terceary' | 'cancel',
  text: string,
  size: 'small' | 'medium' | 'large',
  disabled?: boolean
  onClick?: any
}

const Button = (props: Props) => {
  return (
    <div className="dell-button">
      <button className={`${props.type} ${props.size}`} disabled={props.disabled} onClick={(e: any) => props.onClick(e)}>{props.text}</button>
    </div>
  )
}

export default Button