import React, { useState } from 'react'
import Input from '../../components/input/input'
import './editProject-styles.scss'
import '/public/styles/grid.scss'

import Button from '../../components/button/button'
import Textarea from '../../components/textarea/textarea'

type Props = {
  closeModal: Function
}

const EditProject = (props: Props) => {
  const [canEdit, setCanEdit] = useState(false)
  const [data, setData] = useState({
    name: 'Project 1',
    date: '2022-05-27',
    coLeader: 'Co-leader 1',
    description: 'Project of computers manufactory'
  })

  return (
    <div id="edit-project">
      <h1 className="title">Edit Project</h1>

      <div className="container">
        <div className="grid-12">
          <div className="section-container grid-6">
            <div className="input-container">
              <h4 className="input-title">Project name *</h4>
              <Input
                className="Inputedit"
                size='medium'
                placeholder={"Enter the project name"}
                type={"text"}
                value={data.name}
              />
            </div>

            <div className="input-container">
              <h4 className="input-title">Dead Line *</h4>
              <Input
                className="Inputedit"
                size='small'
                placeholder={"xx/xx/xxxx"}
                type={"date"}
                value={data.date}
              />
            </div>

            <div className="input-container">
              <h4 className="input-title">Project co-leader</h4>
              <Input
                className="Inputedit"
                size='small'
                placeholder={"Co-leader name"}
                type={"text"}
                value={data.coLeader}
              />
            </div>
          </div>
          <div className="section-container grid-6">
            <div className="input-container">
              <h4 className="input-title">Project Description</h4>
              <Textarea
                size='large'
                className="Inputeditdescription"
                placeholder={"Enter the project description"}
                value={data.description}
              />
            </div>
          </div>
        </div>
        <div className="grid-12 inputRow">
          <div className="input-container grid-4">
            <h4 className="input-title ">Area</h4>
            <Input
              className="Inputedit "
              size='small'
              placeholder={"xx/xx/xxxx"}
              type={"date"}
            />
          </div>
          <div className="input-container grid-4">
            <h4 className="input-title ">Number of vacancies</h4>
            <Input
              className="Inputedit"
              size='small'
              placeholder={"xx/xx/xxxx"}
              type={"date"}
            />
          </div>
          <div className="input-container grid-4">
            <h4 className="input-title">Position</h4>
            <Input
              className="Inputedit"
              size='small'
              placeholder={"xx/xx/xxxx"}
              type={"date"}
            />
          </div>
        </div>
      </div>

      <div className="edit-container">
        <Button type="default" text="edit Project" size="large" disabled={canEdit} onClick={() => false} />
      </div>
    </div>
  )
}

export default EditProject