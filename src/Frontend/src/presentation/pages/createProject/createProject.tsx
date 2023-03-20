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
    },
    {
      value: 'Shadowing',
      label: 'Shadowing'
    }
  ])

  const [tag, setTag] = useState<any>(null)
  const [tags, setTags] = useState<any>(null)
  const [area, setArea] = useState('')
  const [role, setRole] = useState('')

  const addTag = (e: any) => {
    e.preventDefault()
    if (tag) {
      if (tags) {
        setTags([...tags, tag])
      }
      else {
        setTags([tag])
      }
    }
    setTag('')
  }

  const removeTag = (index: number) => {
    if (index === -1) {
      setTags(null)
    }
    else {
      flushSync(() => {
        let newTags = [...tags]
        newTags = newTags.filter((_: any, i: number) => i !== index)
        setTags(newTags)
      })
    }
  }

  const [addedRoles, setAddedRoles] = useState<any>(null)

  const addRoles = (e?: any) => {
    if(e) {
      e.preventDefault()
    }
    if (area && role || area === "Shadowing") {
      flushSync(() => {
        if (!addedRoles) {
          if (area === "Shadowing") {
            setRole("Shadowing")
          }
          setAddedRoles([{
            area: area,
            role: role,
            vacancies: 1
          }])
        }
        else {
          let find = addedRoles.some((el: any) => el.role == role)
          if (!find) {
            if (area === "Shadowing") {
              setRole("Shadowing")
            }
            setAddedRoles([...addedRoles, {
              area: area,
              role: role,
              vacancies: 1
            }])
          }
        }
      })
      setRole("")

      const element = document.getElementsByClassName('added-roles')[0]
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    console.log(addedRoles)
  }

  const updateRole = (value: number, index: number) => {
    let updatedRole = addedRoles[index]
    updatedRole.vacancies = value
  }

  const removeRole = (index: number) => {
    flushSync(() => {
      let newRoles = [...addedRoles]
      newRoles = newRoles.filter((_: any, i: number) => i !== index)
      setAddedRoles(newRoles)
    })
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
              <h4 className="input-title">Project Description *</h4>
              <Input
                size='medium'
                className="InputCreatedescription"
                placeholder={"Enter the project description"}
                type='text'
              />
            </div>

            <div className="input-container">
              <h4 className="input-title">Tags</h4>
              <form onSubmit={addTag}>
                <Input
                  size='medium'
                  placeholder={"Enter new tag"}
                  type={"text"}
                  value={tag}
                  autocomplete="off"
                  onChange={(value: any) => setTag(value)}
                />
              </form>
            </div>

            {
              tags &&
              <div className='tags-container'>
                {
                  tags.map((tag: any, index: number) => {
                    return (
                      <>
                        <div className='tag grid-3'>
                          {tag}
                          <div className='remove-icon' onClick={() => removeTag(index)}>
                            <CloseIcon />
                          </div>
                        </div>
                      </>

                    )
                  })
                }
                {
                  tags.length > 0 &&
                  <div className='tag-remove grid-3' onClick={() => removeTag(-1)}>Clear all</div>
                }
              </div>
            }

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
                <form onSubmit={addRoles}>
                  {
                    area == "Shadowing" ? (
                      <Input
                        disabled={true}
                        size='large'
                        placeholder={"e.g. DevOps"}
                        type={""}
                        value={role}
                        onChange={(role: any) => setRole(role)}
                      />
                    ) :
                      <Input
                        size='large'
                        placeholder={"e.g. DevOps"}
                        value={role}
                        type={""}
                        onChange={(role: any) => setRole(role)}
                      />
                  }
                </form>
              </div>
              <div className="input-container button">
                <Button type='terceary' text='Add' size='small' onClick={() => addRoles()}></Button>
              </div>
            </div>

            {
              addedRoles && addedRoles.length > 0 && (
                <div className="added-roles">
                  <p className='added-roles-title'>Roles / Vacancies</p>
                  {
                    addedRoles.map((role: any, index: number) => {
                      return (
                        <div className='added-role' key={`${role.area}-${role.role}-${index}`}>
                          <div className="container">
                            <div className='area'>
                              <p className="area-name">{role.area}</p>
                            </div>
                            {
                              role.role !== 'Shadowing' &&
                              <div className='role'>
                                <p className="role-name">{role.role}</p>
                              </div>
                            }
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
      </div>
    </div >
  )
}

export default CreateProject