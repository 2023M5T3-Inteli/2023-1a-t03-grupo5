import React, { useState } from 'react'
import Input from '../input/input'

import './searchBar-styles.scss'
import SearchIcon from '@mui/icons-material/Search'

type Props = {
  value: string;
  onChange: Function;
}

const SearchBar: React.FC<Props> = (props: Props) => {
  return (
    <div className="search-bar">
      <Input type="text" placeholder='Search' size='small' value={props.value} onChange={(value: string) => props.onChange(value)} />
      <div className="icon">
        <SearchIcon />
      </div>
    </div>
  )
}

export default SearchBar