import React from 'react'
import Input from '../../components/Input'
import './createProject-styles.scss'
import './../../../../public/styles/grid.scss'

const CreateProject: React.FC = () => {
  return (
    <div id="create-project">
       <h1 className="TitleProject">Create Project</h1>
      <div className="container grid-12">
        <div className="DivInput grid-6">
          <h4 className="titleInput">Project name</h4>
          <Input
            className="InputCreate"
            placeholder={"Enter the project name"}
            type={"text"}
          />

          <h4 className="titleInput">Email</h4>
          <Input
            className="InputCreate"
            placeholder={"Digite seu email"}
            type={"email"}
          />
          <h4 className="titleInput">Dead Line</h4>
          <Input
            className="InputCreate"
            placeholder={"xx/xx/xxxx"}
            type={"date"}
          />
          <h4 className="titleInput">Co-leader</h4>
          <Input
            className="InputCreate"
            placeholder={"xx/xx/xxxx"}
            type={"date"}
          />
        </div>
        <div className="grid-6 input-container">
          <h4 className="titleInput">Project Description</h4>
          <textarea
            className="InputCreatedescription"
            placeholder={"Enter the project description"}
          />
        </div>
      </div>
      <div className="grid-12 inputRow">
        <div className="input-container grid-4">
          <h4 className="titleInput ">Area</h4>
          <Input
            className="InputCreate "
            placeholder={"xx/xx/xxxx"}
            type={"date"}
          />
        </div>
        <div className="input-container grid-4">
          <h4 className="titleInput ">Number of vacancies</h4>
          <Input
            className="InputCreate"
            placeholder={"xx/xx/xxxx"}
            type={"date"}
          />
        </div>
        <div className="input-container grid-4">
          <h4 className="titleInput">Position</h4>
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