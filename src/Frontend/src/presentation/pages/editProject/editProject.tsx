import React, { useState } from 'react'
import Input from '../../components/input/input'
import './editProject-styles.scss'
import '/public/styles/grid.scss'

import Button from '../../components/button/button'
import Textarea from '../../components/textarea/textarea'
import Select from '../../components/select/select'
import { flushSync } from 'react-dom'

import CloseIcon from '@mui/icons-material/Close'

type Props = {
  closeModal: Function
}

const EditProject = (props: Props) => {
  const [disableEdit, setCanEdit] = useState(true)
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

  const [usersOptions, setUsersOptions] = useState([
    {
      value: "Thiago Pontes",
      label: "Thiago Pontes"
    },
    {
      value: "Marina Duarte",
      label: "Marina Duarte"
    },
    {
      value: "Rafael Rodrigues",
      label: "Rafael Rodrigues"
    },
    {
      value: "Paula Diniz",
      label: "Paula Diniz"
    },
    {
      value: "Nathalia Melo",
      label: "Nathalia Melo"
    },
  ])

  const [data, setData] = useState<any>({
    name: "Project 1",
    description: "A project about IOT",
    tags: ['React', 'Python', 'MongoDB'],
    coLeader: "Thiago Pontes",
    addedRoles: [
      {
        area: "Technology",
        role: "DevOps",
        vacancies: 2
      },
      {
        area: "Technology",
        role: "React Frontend",
        vacancies: 3
      },
      {
        area: "Technology",
        role: "Python Backend",
        vacancies: 5
      }
    ],
    badge: "NFT",
    startDate: "2023-07-19",
    endDate: "2023-11-30",
    endSubscription: "2023-07-21"
  })

  const [tag, setTag] = useState<any>(null)
  const [area, setArea] = useState('')
  const [role, setRole] = useState('')

  const addTag = (e: any) => {
    e.preventDefault()
    if (tag) {
      if (data.tags) {
        setData({ ...data, tags: [...data.tags, tag] })
      }
      else {
        setData({ ...data, tags: [tag] })
      }
    }
    setTag('')
  }

  const removeTag = (index: number) => {
    if (index === -1) {
      setData({ ...data, tags: null })
    }
    else {
      flushSync(() => {
        let newTags = [...data.tags]
        newTags = newTags.filter((_: any, i: number) => i !== index)
        setData({ ...data, tags: newTags })
      })
    }
  }

  const addRoles = (e?: any) => {
    if (e) {
      e.preventDefault()
    }
    if (area && role || area === "Shadowing") {
      flushSync(() => {
        if (!data.addedRoles) {
          if (area === "Shadowing") {
            setRole("Shadowing")
          }
          setData({
            ...data, addedRoles: [{
              area: area,
              role: role,
              vacancies: 1
            }]
          })
        }
        else {
          let find = data.addedRoles.some((el: any) => el.role == role)
          if (!find) {
            if (area === "Shadowing") {
              setRole("Shadowing")
            }
            setData({
              ...data, addedRoles: [...data.addedRoles, {
                area: area,
                role: role,
                vacancies: 1
              }]
            })
          }
        }
      })
      setRole("")

      const element = document.getElementsByClassName('added-roles')[0]
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  const updateRole = (value: number, index: number) => {
    let updatedRole = data.addedRoles[index]
    updatedRole.vacancies = value
  }

  const removeRole = (index: number) => {
    flushSync(() => {
      let newRoles = [...data.addedRoles]
      newRoles = newRoles.filter((_: any, i: number) => i !== index)
      setData({ ...data, addedRoles: newRoles })
    })
  }

  return (
    <div id="edit-project">
      <div className="container">
        <h1 className="title">Edit project</h1>
        <div className="grid-12">
          <div className="left-side section-container grid-8">
            <div className="input-container">
              <h4 className="input-title">Project name *</h4>
              <Input
                size='medium'
                placeholder={"Enter the project name"}
                type={"text"}
                value={data.name}
                onChange={(value: any) => setData({...data, name: value})}
              />
            </div>

            <div className="input-container">
              <h4 className="input-title">Project Description *</h4>
              <Input
                size='medium'
                placeholder={"Enter the project description"}
                type='text'
                value={data.description}
                onChange={(value: any) => setData({...data, description: value})}
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
              data.tags &&
              <div className='tags-container'>
                {
                  data.tags.map((tag: any, index: number) => {
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
                  data.tags.length > 0 &&
                  <div className='tag-remove grid-3' onClick={() => removeTag(-1)}>Clear all</div>
                }
              </div>
            }

            <div className="input-container">
            <h4 className="input-title ">Co-leader</h4>
              <Select options={usersOptions} size="small" default="Co-leader name" onChange={(value: string) => setData({ ...data, coLeader: value })} />
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
              data.addedRoles && data.addedRoles.length > 0 && (
                <div className="added-roles">
                  <p className='added-roles-title'>Roles / Vacancies</p>
                  {
                    data.addedRoles.map((role: any, index: number) => {
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
                value={data.endSubscription}
                onChange={(value: any) => setData({...data, endSubscription: value})}
              />
            </div>

            <div className="input-container">
              <h4 className="input-title ">Import badge</h4>
              <Input
                size='large'
                placeholder={""}
                type={"text"}
                value={data.badge}
                onChange={(value: any) => setData({...data, badge: value})}
              />
            </div>

            <div className="divider"></div>

            <div className="input-container">
              <h4 className="input-title">Project start *</h4>
              <Input
                size='large'
                placeholder={"xx/xx/xxxx"}
                type={"date"}
                value={data.startDate}
                onChange={(value: any) => setData({...data, startDate: value})}
              />
            </div>

            <div className="input-container">
              <h4 className="input-title">Project end *</h4>
              <Input
                size='large'
                placeholder={"xx/xx/xxxx"}
                type={"date"}
                value={data.endDate}
                onChange={(value: any) => setData({...data, endDate: value})}
              />
            </div>

            <div className="edit-container">
              <Button type="default" text="Save" size="medium" disabled={disableEdit} onClick={() => false} />
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default EditProject