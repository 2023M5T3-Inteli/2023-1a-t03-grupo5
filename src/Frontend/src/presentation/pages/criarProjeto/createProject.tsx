import React from 'react'
import Input from '../../components/Input'
import './createProject-styles.scss'

const CreateProject: React.FC = () => {
  return (
    <div>
      <h1 className='TitleProject'>Create Project</h1>
        <Input
        Title='Project name'
        className='InputCreate'
        placeholder={"Enter the project name"}
        type={'text'}
        />
        <h4>Project Description</h4>
        <textarea
        className='InputCreatedescription'
        placeholder={"Enter the project description"}
        />
        <Input
        Title='Email'
        className='InputCreate'
        placeholder={"Digite seu email"}
        type={'email'}
        />
        <Input
        Title='End of Registrations'
        className='InputCreate'
        placeholder={"xx/xx/xxxx"}
        type={'date'}
        />
    </div>
  )
}

export default CreateProject