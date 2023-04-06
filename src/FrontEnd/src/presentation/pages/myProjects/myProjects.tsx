import React, { useState, useEffect } from 'react'
import Card from '../../components/card/card'

import AddIcon from '@mui/icons-material/Add'

import './myProjects-styles.scss'
import SearchBar from '../../components/searchBar/searchBar'
import { Link } from 'react-router-dom'
import ProjectService from '../../../main/services/projectService'
import Loading from '../../components/loading/loading'
import UserService from '../../../main/services/userService'
import { toast } from 'react-toastify'
import Select from '../../components/select/select'
import ApplyService from '../../../main/services/applyService'

const MyProjects: React.FC = () => {
  const isMobile = true
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState(1)
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [openViewModal, setOpenViewModal] = useState(false)
  const [openApplyModal, setOpenApplyModal] = useState(false)
  const [openConfirmModal, setOpenConfirmModal] = useState(true)
  const [search, setSearch] = useState("")

  const [projects, setProjects] = useState([])
  const [statusFilter, setStatusFilter] = useState("")
  const [tagFilter, setTagFilter] = useState("")
  const [areaFilter, setAreaFilter] = useState("")

  const [user, setUser] = useState({
    id: ""
  })

  const [areaOptions, setAreaOptions] = useState([
    {
      value: "Technology",
      label: "Technology"
    },
    {
      value: "Design",
      label: "Design"
    },
    {
      value: "Marketing",
      label: "Marketing"
    },
    {
      value: "RH",
      label: "RH"
    },
    {
      value: "Shadowing",
      label: "Shadowing"
    }
  ])

  const [tagOptions, setTagOptions] = useState<any>([{
    value: "",
    label: ""
  }])

  const [statusOptions, setStatusOptions] = useState([
    {
      value: "Finished",
      label: "Finished"
    },
    {
      value: "Approved",
      label: "On going"
    }
  ])

  const closeCreateModal = () => {
    setOpenCreateModal(!openCreateModal)
  }

  const toggleEditModal = () => {
    setOpenViewModal(false)
    setOpenEditModal(!openEditModal)
  }

  const toggleViewModal = () => {
    setOpenViewModal(!openViewModal)
  }

  const toggleApplyModal = () => {
    setOpenViewModal(false)
    setOpenApplyModal(!openApplyModal)
  }

  const getAll = async () => {
    setLoading(true)
    let response

    if (active == 1) {
      response = await ProjectService.findAll()
    }
    else {
      response = await ApplyService.getAllAppliesFromUser(user.id)
    }

    if (response.status === 200) {
      setProjects(response.data)
      setLoading(false)
    }
    else {
      toast.error("Error to load all projects")
    }
  }

  const validateUser = async () => {
    const response = await UserService.validate()

    if (response.statusCode === 401) {
      window.location.href = '/login'
    }
    else {
      console.log(response)
      setUser(response.data)
    }
  }

  // useEffect(() => {
  //   validateUser()

  //   getAll()
  // }, [])

  const createTagOptions = () => {
    let options: any = []

    projects.map((project: any, index: number) => {
      if (project.status !== "Pending") {
        project.tags = JSON.parse(project.tags)
        project.tags.map((tag: string, index: number) => {
          if (options.indexOf(tag) === -1) {
            let newOption = {
              value: tag,
              label: tag
            }
            options.push(newOption)
          }
        })
      }
    })
    setTagOptions(options)
  }

  useEffect(() => {
    if (!loading) {
      createTagOptions()
    }
  }, [projects])

  useEffect(() => {
    validateUser()
    getAll()
  }, [location])

  useEffect(() => {
    getAll()
  }, [active])

  const filter = () => {
    return projects.map((project: any, index: number) => {
      if (
        project.name.toUpperCase().includes(search.toUpperCase()) &&
        (project.tags.includes(tagFilter) || tagFilter === "") &&
        (project.roles.includes(areaFilter)) &&
        project.status.includes(statusFilter) &&
        (project.status !== "Pending" || active == 1)
      ) {
        if (active === 1 && (user.id === project.ownerId || user.id === project.coleaderId)) {
          return (
            <Link to="/visualizeProject" state={{ projectId: project.projectId }} key={`${project.name}-${index}`}>
              {/* <div onClick={() => setOpenEditModal(!openEditModal)} key={index}>
                <Card {...project}></Card>
              </div> */}
              <div className='grid-4'>
                <Card {...project}></Card>
              </div>
            </Link>
          )
        }
        else if (active === 2) {
          return (
            <Link to="/visualizeProject" state={{ projectId: project.projectId }} key={`${project.name}-${index}`}>
              {/* <div onClick={() => setOpenEditModal(!openEditModal)} key={index}>
                <Card {...project}></Card>
              </div> */}
              <div className='grid-4'>
                <Card {...project}></Card>
              </div>
            </Link>
          )
        }
      }
    })
  }

  return (
    <div className='myProjects'>
      <div style={{ "width": "100%" }}>
        <div className="options">
          <div className='option1'>
            <button className={`btnProjects ${active === 1 && 'active'}`} onClick={() => setActive(1)}>Created Projects</button>
          </div>
          <div className='option2'>
            <button className={`btnProjects ${active === 2 && 'active'}`} onClick={() => setActive(2)}>Participated Projects</button>
          </div>
        </div>
      </div>

      {
        !loading && <div className="filter">
          <div className='search-container'>
            <SearchBar value={search} onChange={(value: string) => setSearch(value)} />
          </div>
          <Select options={areaOptions} default='Show all areas' onChange={(value: string) => setAreaFilter(value)} showDefault={true} />
          <Select options={tagOptions} default='Show all tags' onChange={(value: string) => setTagFilter(value)} showDefault={true} />
          <Select options={statusOptions} default='Show all status' onChange={(value: string) => setStatusFilter(value)} showDefault={true} />
        </div>
      }

      {loading && <Loading />}

      {
        <div className="body-cards">
          {
            filter()
          }
        </div>
      }
    </div>
  )
}

export default MyProjects