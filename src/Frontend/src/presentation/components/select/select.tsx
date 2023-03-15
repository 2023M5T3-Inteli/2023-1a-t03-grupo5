import React from 'react'
import './select-styles.scss'

type Options = {
  value: string;
  label: string;
}

type Props = {
  options: Options[];
  default: string;
  onChange: Function;
}

const Select = (props: Props) => {
  return (
    <div className="dell-select">
      <select onChange={(e) => props.onChange(e.target.value)}>
        <option hidden>{props.default}</option>
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