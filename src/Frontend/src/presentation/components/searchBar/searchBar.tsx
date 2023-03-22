import React, { useState } from 'react'
import Input from '../input/input'

import './searchBar-styles.scss'

type Props = {
  onChange: Function;
}

const SearchBar: React.FC<Props> = (props: Props) => {

  return (
    <div className="search-bar">
      <Input type="text" placeholder='Search' onChange={(value: string) => props.onChange(value)}/>
    </div>
  )
}

export default SearchBar