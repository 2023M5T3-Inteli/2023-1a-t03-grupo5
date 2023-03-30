import React, { useState, useEffect } from 'react'
import Input from '../../components/input/input'
import './editProject-styles.scss'
import '/public/styles/grid.scss'

import Button from '../../components/button/button'
import Textarea from '../../components/textarea/textarea'
import Select from '../../components/select/select'
import { flushSync } from 'react-dom'

import ProjectService from '../../../main/services/projectService'
import UserService from '../../../main/services/userService'

import CloseIcon from '@mui/icons-material/Close'
import { useLocation, useNavigate } from 'react-router-dom'
import Loading from '../../components/loading/loading'

type Props = {
  closeModal: Function
}

const EditProject = (props: Props) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(true)
  const [disableEdit, setDisableEdit] = useState(true)
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
      value: "1",
      label: "Thiago Pontes"
    },
    {
      value: "2",
      label: "Marina Duarte"
    },
    {
      value: "3",
      label: "Rafael Rodrigues"
    },
    {
      value: "4",
      label: "Paula Diniz"
    },
    {
      value: "5",
      label: "Nathalia Melo"
    },
  ])

  const [data, setData] = useState<any>({
    projectId: "",
    name: "",
    description: "",
    tags: [],
    coleaderId: "",
    roles: [
      // {
      //   area: "Technology",
      //   role: "DevOps",
      //   vacancies: 2
      // },
      // {
      //   area: "Technology",
      //   role: "React Frontend",
      //   vacancies: 3
      // },
      // {
      //   area: "Technology",
      //   role: "Python Backend",
      //   vacancies: 5
      // }
    ],
    badge: "",
    start: "",
    end: "",
    endSubscription: ""
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
        if (!data.roles) {
          if (area === "Shadowing") {
            setRole("Shadowing")
          }
          setData({
            ...data, roles: [{
              area: area,
              role: role,
              vacancies: 1
            }]
          })
        }
        else {
          let find = data.roles.some((el: any) => el.role == role)
          if (!find) {
            if (area === "Shadowing") {
              setRole("Shadowing")
            }
            setData({
              ...data, roles: [...data.roles, {
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
    let updatedRole = data.roles[index]
    updatedRole.vacancies = value
  }

  const removeRole = (index: number) => {
    flushSync(() => {
      let newRoles = [...data.roles]
      newRoles = newRoles.filter((_: any, i: number) => i !== index)
      setData({ ...data, roles: newRoles })
    })
  }

  const getProject = async (id: string) => {
    const response = await ProjectService.findByID(id);

    console.log(response)

    response.roles = JSON.parse(response.roles)
    response.tags = JSON.parse(response.tags)
    setData(response)
  }

  const createOptions = async () => {
    const response = await UserService.findAll()

    let options: any = []
    response.map((user: any) => {
      options.push({
        value: user.id,
        label: user.name
      })
    })

    console.log(response)
    setUsersOptions(options)

    setLoading(false)
  }

  const validateFields = () => {
    console.log('entrou', disableEdit)
    if (
      data.name &&
      data.description &&
      data.roles &&
      data.endSubscription &&
      data.start &&
      data.end
    ) {
      setDisableEdit(false)
    }
    else {
      setDisableEdit(true)
    }
  }

  const submit = async () => {
    let response = await ProjectService.edit({
      projectId: data.projectId,
      name: data.name,
      description: data.description,
      tags: JSON.stringify(data.tags),
      roles: JSON.stringify(data.roles),
      start: new Date(data.start),
      end: new Date(data.end),
      badge: data.badge,
      endSubscription: new Date(data.endSubscription),
      coleaderId: data.coleaderId,
    })
    if(response) {
      navigate("/")
    }
  }

  useEffect(() => {
    getProject(location.state.projectId)

  }, [])

  useEffect(() => {
    createOptions()
  }, [data])

  useEffect(() => {
    validateFields()
    console.log(data)
  }, [data])

  return (
    <div id="edit-project">
      {
        loading && <Loading />
      }
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
                onChange={(value: any) => setData({ ...data, name: value })}
              />
            </div>

            <div className="input-container">
              <h4 className="input-title">Project Description *</h4>
              <Input
                size='medium'
                placeholder={"Enter the project description"}
                type='text'
                value={data.description}
                onChange={(value: any) => setData({ ...data, description: value })}
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
                        <div className='tag grid-3' key={`${tag}-${index}`}>
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
              <Select value={data.coleaderId} options={usersOptions} showDefault size="small" default="Co-leader name" onChange={(value: string) => setData({ ...data, coleaderId: value })} />
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
              data.roles && data.roles.length > 0 && (
                <div className="added-roles">
                  <p className='added-roles-title'>Roles / Vacancies</p>
                  {
                    data.roles.map((role: any, index: number) => {
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
                onChange={(value: any) => setData({ ...data, endSubscription: value })}
              />
            </div>

            <div className="input-container">
              <h4 className="input-title ">Import badge</h4>
              <Input
                size='large'
                placeholder={""}
                type={"text"}
                value={data.badge}
                onChange={(value: any) => setData({ ...data, badge: value })}
              />
            </div>

            <div className="divider"></div>

            <div className="input-container">
              <h4 className="input-title">Project start *</h4>
              <Input
                size='large'
                placeholder={"xx/xx/xxxx"}
                type={"date"}
                value={data.start}
                onChange={(value: any) => setData({ ...data, start: value })}
              />
            </div>

            <div className="input-container">
              <h4 className="input-title">Project end *</h4>
              <Input
                size='large'
                placeholder={"xx/xx/xxxx"}
                type={"date"}
                value={data.end}
                onChange={(value: any) => setData({ ...data, end: value })}
              />
            </div>

            <div className="edit-container">
              <Button type="default" text="Save" size="medium" disabled={disableEdit} onClick={() => submit()} />
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default EditProject