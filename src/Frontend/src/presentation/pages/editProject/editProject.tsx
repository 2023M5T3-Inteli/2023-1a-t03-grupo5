import React, { useState } from 'react'
import Input from '../../components/input/input'
import './editProject-styles.scss'
import '/public/styles/grid.scss'

import Button from '../../components/button/button'
import Textarea from '../../components/textarea/textarea'
import Select from '../../components/select/select'

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
      label: 'Comemrcial'
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
                className="InputEditdescription"
                placeholder={"Enter the project description"}
                value={data.description}
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
      </div>

      <div className="edit-container">
        <Button type="default" text="Save" size="large" disabled={canEdit} onClick={() => false} />
      </div>
    </div>
  )
}

export default EditProject