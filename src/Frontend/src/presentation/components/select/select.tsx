import React from 'react'
import './select-styles.scss'

type Options = {
  value: string;
  label: string;
}

type Props = {
  value?: string;
  options: Options[];
  default: string;
  showDefault?: boolean;
  onChange: Function;
  size?: 'small' | 'medium' | 'large';
}

const Select = (props: Props) => {
  return (
    <div className="dell-select">
      <select value={props.value} className={props.size} onChange={(e) => props.onChange(e.target.value)}>
        <option hidden={!props.showDefault} value={""}>{props.default}</option>
        {
          props.options.map((option, index) => {
            return (
              <option value={option.value} key={index}>{option.label}</option>
            )
          })
        }
      </select>
    </div>
  )
}

export default Select