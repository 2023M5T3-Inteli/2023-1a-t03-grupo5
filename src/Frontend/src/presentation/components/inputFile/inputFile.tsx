import React, { useState, useEffect } from 'react'
import './inputFile-styles.scss'

type Props = {
  value: any
  onChange: Function
}

const InputFile: React.FC<Props> = (props: Props) => {
  const [value, setValue] = useState('')

  const changeValue = (value: any) => {
    setValue(value)
    if (props.onChange) {
      props.onChange(value)
    }
  }

  useEffect(() => {
    setValue(props.value)
  }, [props.value])

  return (
    <input type='file' onChange={(e: any) => changeValue(e.target.files[0])} accept='image/jpeg, image/png' />
  )
}

export default InputFile