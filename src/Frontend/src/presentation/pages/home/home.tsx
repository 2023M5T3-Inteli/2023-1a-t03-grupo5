import React, { useState, useEffect } from 'react'
import { Project } from '../../../shared/lib/types'
import Card from '../../components/card/card'

import AddIcon from '@mui/icons-material/Add'

import './home-styles.scss'
import Modal from '../../components/modal/modal'
import CreateProject from '../createProject/createProject'
import EditProject from '../editProject/editProject'
import VisualizeProject from '../visualizeProject/visualizeProject'
import ApplicationForm from '../applicationForm/applicationForm'
import DeleteProject from '../deleteProject/deleteProject'
import SearchBar from '../../components/searchBar/searchBar'
import { Link } from 'react-router-dom'
import ProjectService from '../../../main/services/projectService'
import Loading from '../../components/loading/loading'
import UserService from '../../../main/services/userService'

const Home: React.FC = () => {
  const isMobile = true;
  const [loading, setLoading] = useState(true)
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [openViewModal, setOpenViewModal] = useState(false)
  const [openApplyModal, setOpenApplyModal] = useState(false)
  const [openConfirmModal, setOpenConfirmModal] = useState(true)
  const [search, setSearch] = useState("")
  const [projects, setProjects] = useState([])

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

  const toggleConfirmModal = () => {
    setOpenConfirmModal(!openConfirmModal)
  }

  const getAll = async () => {
    const allProjects = await ProjectService.findAll();

    setProjects(allProjects);
    setLoading(false)
  }

  const validateUser = async () => {
    const user = await UserService.validate();

    if (user.response.status === 401) {
      window.location.href = '/login'
    }
  }

  // useEffect(() => {
  //   validateUser();

  //   getAll()
  // }, [])

  useEffect(() => {
    validateUser();
    getAll()
  }, [location])

  const filter = () => {
    return projects.map((project: any, index: number) => {
      if (project.name.toUpperCase().includes(search.toUpperCase())) {
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
    })
  }

  return (
    <div className='home'>
      {
        !loading && <div className='search-container'>
          <SearchBar value={search} onChange={(value: string) => setSearch(value)} />
        </div>
      }
      {
        openCreateModal && <Modal closeArrow={true} closeModal={() => closeCreateModal()} content={<CreateProject closeModal={() => closeCreateModal()} />} />
      }
      {
        openEditModal && <Modal closeArrow={true} closeModal={() => toggleEditModal()} content={<EditProject closeModal={() => toggleEditModal()} />} />
      }
      {/* {
        openViewModal && <Modal closeArrow={true} closeModal={() => toggleViewModal()} content={<VisualizeProject closeModal={() => toggleEditModal()} openEdit={() => toggleEditModal()} openApply={() => toggleApplyModal()} />} />
      } */}
      {
        openApplyModal && <Modal closeArrow={true} closeModal={() => toggleApplyModal()} content={<ApplicationForm closeModal={() => toggleApplyModal()} />} />
      }
      {loading && <Loading />}
      {
        <div className="body-cards">
          {
            filter()
          }
        </div>
        // 
      }
      {/* {
        openConfirmModal && <Modal type="warning" closeModal={() => toggleConfirmModal()} content={<DeleteProject closeModal={() => toggleConfirmModal()} />} />
      }  */}

      {/* <div className="button-container">
        <div className='add-icon' onClick={() => setOpenCreateModal(!openCreateModal)}>
          <AddIcon />
        </div>
        <p className='tooltip'>Criar Projeto</p>
      </div> */}
    </div>
  )
}

export default Home