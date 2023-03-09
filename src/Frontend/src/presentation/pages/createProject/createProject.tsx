import React, { useState } from 'react'
import Input from '../../components/input/input'
import './createProject-styles.scss'
import '/public/styles/grid.scss'

import Button from '../../components/button/button'
import Textarea from '../../components/textarea/textarea'

type Props = {
  closeModal: Function
}

const CreateProject = (props: Props) => {
  const [canCreate, setCanCreate] = useState(false)

  return (
    <div id="create-project">
      <h1 className="title">Create Project</h1>

      <div className="container">
        <div className="grid-12">
          <div className="section-container grid-6">
            <div className="input-container">
              <h4 className="input-title">Project name *</h4>
              <Input
                className="InputCreate"
                size='medium'
                placeholder={"Enter the project name"}
                type={"text"}
              />
            </div>

            <div className="input-container">
              <h4 className="input-title">Dead Line *</h4>
              <Input
                className="InputCreate"
                size='small'
                placeholder={"xx/xx/xxxx"}
                type={"date"}
              />
            </div>

            <div className="input-container">
              <h4 className="input-title">Project co-leader</h4>
              <Input
                className="InputCreate"
                size='small'
                placeholder={"Co-leader name"}
                type={"text"}
              />
            </div>
          </div>
          <div className="section-container grid-6">
            <div className="input-container">
              <h4 className="input-title">Project Description</h4>
              <Textarea
                size='large'
                className="InputCreatedescription"
                placeholder={"Enter the project description"}
              />
            </div>
          </div>
        </div>
        <div className="grid-12 inputRow">
          <div className="input-container grid-4">
            <h4 className="input-title ">Area</h4>
            <Input
              className="InputCreate "
              size='small'
              placeholder={"xx/xx/xxxx"}
              type={"date"}
            />
          </div>
          <div className="input-container grid-4">
            <h4 className="input-title ">Number of vacancies</h4>
            <Input
              className="InputCreate"
              size='small'
              placeholder={"xx/xx/xxxx"}
              type={"date"}
            />
          </div>
          <div className="input-container grid-4">
            <h4 className="input-title">Position</h4>
            <Input
              className="InputCreate"
              size='small'
              placeholder={"xx/xx/xxxx"}
              type={"date"}
            />
          </div>
        </div>
      </div>

      <div className="create-container">
        <Button type="default" text="Create Project" size="large" disabled={canCreate} onClick={() => false} />
      </div>
    </div>
  )
}

export default CreateProject