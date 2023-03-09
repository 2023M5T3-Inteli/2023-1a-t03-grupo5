import React from 'react'
import './button-styles.scss'

type Props = {
  type: 'default' | 'secundary' | 'cancel',
  text: string,
  size: 'small' | 'medium' | 'large',
  disabled: boolean
  onClick: Function
}

const Button = (props: Props) => {
  return (
    <div className="dell-button">
      <button className={`dell-button ${props.type} ${props.size}`} disabled={true} onClick={() => props.onClick()}>{props.text}</button>
    </div>
  )
}

export default Button