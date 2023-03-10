import React, { useEffect, useState } from 'react'
import Input from '../../components/input/input'
import './createProject-styles.scss'
import '/public/styles/grid.scss'

import Button from '../../components/button/button'
import Textarea from '../../components/textarea/textarea'
import Select from '../../components/select/select'

type Props = {
  closeModal: Function
}

const CreateProject = (props: Props) => {
  const [disableCreate, setCanCreate] = useState(true)
  const [areaOptions, setAreaOptions] = useState([
    {
      value: 'Technology',
      label: 'Technology'
    },
    {
      value: 'Design',
      label: 'Design'
    },
    {
      value: 'RH',
      label: 'RH'
    },
    {
      value: 'Commercial',
      label: 'Commercial'
    },
    {
      value: 'Marketing',
      label: 'Marketing'
    }
  ])

  const [area, setArea] = useState('')
  const [role, setRole] = useState('')
  const [vaccancies, setVaccancies] = useState(0)

  const [addedRoles, setAddedRoles] = useState([
    {
      area: 'Technology',
      role: 'Frontend Developer',
      vaccancies: 4
    },
    {
      area: 'Design',
      role: 'UX Writter',
      vaccancies: 2
    },
    {
      area: 'Marketing',
      role: 'Media analyst',
      vaccancies: 1
    }
  ])

  const addRoles = () => {
    setAddedRoles([{
      area: area,
      role: role,
      vaccancies: vaccancies
    }])
  }

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
          <div className="grid-8 role-container">
            <div className="input-container">
              <h4 className="input-title ">Area</h4>
              <Select options={areaOptions} default="Select vaccancy area" onChange={(value: string) => setArea(value)} />
            </div>
            <div className="input-container">
              <h4 className="input-title ">Role</h4>
              <Input
                className="InputCreate"
                size='medium'
                placeholder={"e.g. DevOps"}
                type={""}
              />
            </div>
            <div className="input-container button">
              <Button type='default' text='Add' size='small' onClick={() => addRoles()}></Button>
            </div>
          </div>
        </div>

        {/* <div className="grid-12 added-roles">
          {
            addedRoles.map((role, index) => {
              return (
                <div className="added-role-container">
                  <div className='area grid-3'>
                    <h4 className="area-name">{role.area}</h4>
                  </div>
                  <div className='role grid-3'>
                    <h4 className="role-name">{role.role}</h4>
                  </div>
                  <div className='vaccancies grid-2'>
                    <h4 className="vaccancies-input">{role.vaccancies}</h4>
                  </div>
                </div>
              )
            })
          }
        </div> */}
      </div>

      <div className="create-container">
        <Button type="default" text="Create Project" size="large" disabled={disableCreate} onClick={() => false} />
      </div>
    </div>
  )
}

export default CreateProject