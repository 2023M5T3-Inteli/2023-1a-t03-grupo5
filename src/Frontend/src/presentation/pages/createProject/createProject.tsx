import React from 'react'
import Input from '../../components/Input'
import './createProject-styles.scss'
import './../../../../public/styles/grid.scss'

const CreateProject: React.FC = () => {
  return (
    <div id="create-project">
      <h1 className="title">Create Project</h1>
      <div className="grid-12">
        <div className="container grid-6">
          <div className="input-container">
            <h4 className="input-title">Project name</h4>
            <Input
              className="InputCreate"
              placeholder={"Enter the project name"}
              type={"text"}
            />
          </div>

          <div className="input-container">
            <h4 className="input-title">Email</h4>
            <Input
              className="InputCreate"
              placeholder={"Digite seu email"}
              type={"email"}
            />
          </div>

          <div className="input-container">
            <h4 className="input-title">Dead Line</h4>
            <Input
              className="InputCreate"
              placeholder={"xx/xx/xxxx"}
              type={"date"}
            />
          </div>

          <div className="input-container">
            <h4 className="input-title">Co-leader</h4>
            <Input
              className="InputCreate"
              placeholder={"xx/xx/xxxx"}
              type={"date"}
            />
          </div>
        </div>
        <div className="container grid-6">
          <div className="input-container">
            <h4 className="input-title">Project Description</h4>
            <textarea
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
            placeholder={"xx/xx/xxxx"}
            type={"date"}
          />
        </div>
        <div className="input-container grid-4">
          <h4 className="input-title ">Number of vacancies</h4>
          <Input
            className="InputCreate"
            placeholder={"xx/xx/xxxx"}
            type={"date"}
          />
        </div>
        <div className="input-container grid-4">
          <h4 className="input-title">Position</h4>
          <Input
            className="InputCreate"
            placeholder={"xx/xx/xxxx"}
            type={"date"}
          />
        </div>
      </div>
    </div>
  )
}

export default CreateProject