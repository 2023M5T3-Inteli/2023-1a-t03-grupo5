import React, { useEffect, useRef, useState } from 'react'

import Input from '../../components/input/input'
import './createProject-styles.scss'
import '/public/styles/grid.scss'

import Button from '../../components/button/button'
import Select from '../../components/select/select'
import { flushSync } from 'react-dom'

import CloseIcon from '@mui/icons-material/Close'
import ProjectService from '../../../main/services/projectService'
import UserService from '../../../main/services/userService'
import { useNavigate } from 'react-router-dom'
import Loading from '../../components/loading/loading'
import { toast } from 'react-toastify'
import InputFile from '../../components/inputFile/inputFile'
import S3Service from '../../../main/services/s3Service'

type Props = {
  closeModal: Function
}

const CreateProject = (props: Props) => {
  const navigate = useNavigate()
  const [disableCreate, setDisableCreate] = useState(true)
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

  const [file, setFile] = useState<any>(null)
  const [data, setData] = useState<any>({
    name: "",
    description: "",
    tags: [],
    ownerId: "1",
    coleaderId: "",
    roles: [],
    badge: "",
    start: "",
    end: "",
    endSubscription: ""
  })

  const [tag, setTag] = useState('')
  // const [tags, setTags] = useState<any>(null)
  const [area, setArea] = useState('')
  const [role, setRole] = useState('')
  const [loading, setLoading] = useState(false)

  const createOptions = async () => {
    const response = await UserService.findAll()

    let options: any = []
    response.data.map((user: any) => {
      options.push({
        value: user.id,
        label: user.name
      })
    })

    console.log(response)
    setUsersOptions(options)
  }

  const addTag = (e: any) => {
    e.preventDefault()
    if (tag) {
      if (data.tags) {
        setData({ ...data, tags: [...data.tags, tag] })
      }
      else {
        setData({ ...data, tag: [tag] })
      }
    }
    setTag('')
  }

  const removeTag = (index: number) => {
    if (index === -1) {
      setData({ ...data, tags: [] })
    }
    else {
      flushSync(() => {
        let newTags = [...data.tags]
        newTags = newTags.filter((_: any, i: number) => i !== index)
        setData({ ...data, tags: newTags })
      })
    }
  }

  // const [addedRoles, setAddedRoles] = useState<any>(null)

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

  const validateFields = () => {
    console.log('entrou', disableCreate)
    if (
      data.name &&
      data.description &&
      data.roles.length > 0 &&
      data.endSubscription &&
      data.start &&
      data.end &&
      file
    ) {
      setDisableCreate(false)
    }
    else {
      setDisableCreate(true)
    }
  }

  const submit = async () => {
    setLoading(true)

    // if (file) {
    // let s3Response = await S3Service.uploadFile(file)

    // if (s3Response === 200)
    let response = await ProjectService.create({
      name: data.name,
      description: data.description,
      tags: JSON.stringify(data.tags),
      roles: JSON.stringify(data.roles),
      start: new Date(data.start),
      end: new Date(data.end),
      badge: "teste 123",
      endSubscription: new Date(data.endSubscription),
      coleaderId: data.coleaderId,
    })
    console.log(response)

    if (response.status === 201) {
      setLoading(false)
      toast.success('Project created successfully! Please check your email for more details.')
      setTimeout(() => {
        props.closeModal()
        navigate(0)
      }, 2000)
    }
    else {
      toast.error("Error to create the project")
    }
    console.log(response)
  }

  useEffect(() => {
    validateFields()
    console.log(data)
  }, [data])

  useEffect(() => {
    createOptions()
  }, [])

  // useEffect(() => {
  //   submit()
  // }, [])

  return (
    <div id="create-project">
      {loading && <Loading />}
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
                value={data.name}
                onChange={(value: any) => setData({ ...data, name: value })}
              />
            </div>

            <div className="input-container">
              <h4 className="input-title">Project Description *</h4>
              <Input
                size='medium'
                className="InputCreatedescription"
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
              <Select options={usersOptions} size="small" showDefault default="Co-leader name" onChange={(value: string) => setData({ ...data, coleaderId: value })} />
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
              <InputFile value={data.badge} onChange={(file: any) => setFile(file)} />
              {/* <input
                placeholder={""}
                type={"file"}
                value={data.badge}
                onChange={(value: any) => setData({ ...data, badge: value })}
              /> */}
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

            <div className="create-container">
              <Button type="default" text="Create" size="medium" disabled={disableCreate} onClick={() => submit()} />
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default CreateProject