import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import React, { useState, useEffect } from 'react'
import { flushSync } from 'react-dom';
import Input from '../input/input';

import './tags-styles.scss'

type Props = {
  value?: any;
  change?: any;
  removeTag?: any;
}

const Tags = (props: Props) => {
  const [value, setValue] = useState(props.value)
  const [tags, setTags] = useState<any>(null)

  const addTag = (tag: any) => {
    setValue(tag)
    if (tags) {
      setTags([...tags, tag])
    }
    else {
      setTags([tag])
    }
  }

  const removeTag = (index: number) => {
    flushSync(() => {
      let newTags = [...tags]
      newTags = newTags.filter((_: any, i: number) => i !== index)
      setTags(newTags)
    })
  }

  useEffect(() => {
    props.change(tags)
  }, [tags, addTag])

  return (
    <div className='tags'>
      <Input placeholder="tag" type="text" value={value} onChange={(tag: any) => addTag(tag)} />
    </div>
  )
}

export default Tags