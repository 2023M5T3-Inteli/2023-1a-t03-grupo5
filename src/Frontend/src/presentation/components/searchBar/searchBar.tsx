import React, { useState } from 'react'
import Input from '../input/input'

import './searchBar-styles.scss'

type Props = {
  value: string;
  onChange: Function;
}

const SearchBar: React.FC<Props> = (props: Props) => {

  return (
    <div className="search-bar">
      <Input type="text" placeholder='Search' value={props.value} onChange={(value: string) => props.onChange(value)}/>
    </div>
  )
}

export default SearchBar