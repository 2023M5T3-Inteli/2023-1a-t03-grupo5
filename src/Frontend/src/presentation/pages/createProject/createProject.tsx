import React, { useEffect, useRef, useState } from 'react'
import Input from '../../components/input/input'
import './createProject-styles.scss'
import '/public/styles/grid.scss'

import Button from '../../components/button/button'
import Textarea from '../../components/textarea/textarea'
import Select from '../../components/select/select'
import { flushSync } from 'react-dom'

import CloseIcon from '@mui/icons-material/Close'

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

  const listRef = useRef<any | null>(null);

  const [addedRoles, setAddedRoles] = useState<any>(null)
  // const [addedRoles, setAddedRoles] = useState([
  //   {
  //     area: '',
  //     role: '',
  //     vacancies: 0
  //   }
  // ])

  const addRoles = () => {
    console.log(addedRoles)
    flushSync(() => {
      if (!addedRoles) {
        setAddedRoles([{
          area: area,
          role: role,
          vacancies: 0
        }])
      }
      // if (addedRoles[0].area == '') {
      //   setAddedRoles([{
      //     area: area,
      //     role: role,
      //     vacancies: vacancies
      //   }])
      // }
      else {
        setAddedRoles([...addedRoles, {
          area: area,
          role: role,
          vacancies: 0
        }])
      }
    })

    const element = document.getElementsByClassName('added-roles')[0]
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const updateRole = (value: number, index: number) => {
    let updatedRole = addedRoles[index]
    updatedRole.vacancies = value
    // setAddedRoles([...addedRoles, updatedRole])
  }

  const removeRole = (index: number) => {
    let newRoles = addedRoles.filter((_: any, i: number) => i !== index)
    setAddedRoles(newRoles)
  }

  return (
    <div id="create-project">
      <div className="container">
        <h1 className="title">Add new project</h1>
        <div className="grid-12">
          <div className="left-side section-container grid-8">
            <div className="input-container">
              <h4 className="input-title">Project name *</h4>
              <Input
                size='medium'
                placeholder={"Enter the project name"}
                type={"text"}
              />
            </div>

            <div className="input-container">
              <h4 className="input-title">Project Description</h4>
              <Input
                size='medium'
                className="InputCreatedescription"
                placeholder={"Enter the project description"}
                type='text'
              />

            </div>
            <div className="input-container">
              <h4 className="input-title">Project co-leader</h4>
              <Input
                size='medium'
                placeholder={"Co-leader name"}
                type={"text"}
              />
            </div>
            <div className="role-container">
              <div className="input-container">
                <h4 className="input-title ">Area</h4>
                <Select options={areaOptions} default="Vacancy area" onChange={(value: string) => setArea(value)} />
              </div>
              <div className="input-container">
                <h4 className="input-title ">Role</h4>
                <Input

                  size='large'
                  placeholder={"e.g. DevOps"}
                  type={""}
                  onChange={(role: any) => setRole(role)}
                />
              </div>
              <div className="input-container button">
                <Button type='terceary' text='Add' size='small' onClick={() => addRoles()}></Button>
              </div>
            </div>

            {
              addedRoles && addedRoles.length > 0 && (
                <div className="added-roles">
                  <p className='added-roles-title'>Added Roles</p>
                  {
                    addedRoles.map((role: any, index: number) => {
                      return (
                        <div className='added-role'>
                          <div className="container">
                            <div className='area'>
                              <p className="area-name">{role.area}</p>
                            </div>
                            <div className='role'>
                              <p className="role-name">{role.role}</p>
                            </div>
                          </div>
                          <div className='vacancies'>
                            <Input type="number" value={role.vacancies} size="small" placeholder='0' onChange={(value: number) => updateRole(value, index)} />
                          </div>
                          <div className='remove-role' onClick={() => removeRole(index)}>
                            <CloseIcon />
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              )
            }

          </div>

          <div className="right-side section-container grid-4">
            <div className="input-container">
              <h4 className="input-title">End of subscription *</h4>
              <Input
                size='large'
                placeholder={"xx/xx/xxxx"}
                type={"date"}
              />
            </div>

            <div className="input-container">
              <h4 className="input-title ">Import badge</h4>
              <Input
                size='large'
                placeholder={""}
                type={"text"}
              />
            </div>

            <div className="divider"></div>

            <div className="input-container">
              <h4 className="input-title">Project start *</h4>
              <Input
                size='large'
                placeholder={"xx/xx/xxxx"}
                type={"date"}
              />
            </div>

            <div className="input-container">
              <h4 className="input-title">Project end *</h4>
              <Input
                size='large'
                placeholder={"xx/xx/xxxx"}
                type={"date"}
              />
            </div>

            <div className="create-container">
              <Button type="default" text="Create" size="medium" disabled={disableCreate} onClick={() => false} />
            </div>
          </div>
        </div>
        {/* <div className="grid-12 inputRow">

        </div> */}
      </div>
    </div >
  )
}

export default CreateProject