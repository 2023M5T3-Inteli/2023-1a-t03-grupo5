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

const Home: React.FC = () => {
  const isMobile = true;
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [openViewModal, setOpenViewModal] = useState(false)
  const [openApplyModal, setOpenApplyModal] = useState(false)
  const [openConfirmModal, setOpenConfirmModal] = useState(true)

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

  const projects: Project[] = [
    {
      title: 'Project 1',
      startDate: '22/11/2022',
      description: 'We are find people with skills in React and Nest',
      vacancies: '10 vacancies'
    },
    {
      title: 'Project 2',
      startDate: '22/11/2022',
      description: 'Project built with Next',
      vacancies: '5 vacancies'
    },
    {
      title: 'Project 3',
      startDate: '22/11/2022',
      description: 'Project built with Next',
      vacancies: '15 vacancies'
    },
    {
      title: 'Project 1',
      startDate: '22/11/2022',
      description: 'Project built with Next',
      vacancies: '7 vacancies'
    },
    {
      title: 'Project 2',
      startDate: '22/11/2022',
      description: 'Project built with Next',
      vacancies: '12 vacancies'
    }, {
      title: 'Project 3',
      startDate: '22/11/2022',
      description: 'Project built with Next',
      vacancies: '8 vacancies'
    },
    {
      title: 'Project 3',
      startDate: '22/11/2022',
      description: 'Project built with Next',
      vacancies: '3 vacancies'
    },
    {
      title: 'Project 1',
      startDate: '22/11/2022',
      description: 'Project built with Next',
      vacancies: '1 vacancy'
    },
    {
      title: 'Project 2',
      startDate: '22/11/2022',
      description: 'Project built with Next',
      vacancies: '5 vacancies'
    }, {
      title: 'Project 3',
      startDate: '22/11/2022',
      description: 'Project built with Next',
      vacancies: '4 vacancies'
    }
  ]

  return (
    <div className='home'>
      {
        openCreateModal && <Modal closeArrow={true} closeModal={() => closeCreateModal()} content={<CreateProject closeModal={() => closeCreateModal()} />} />
      }
      {
        openEditModal && <Modal closeArrow={true} closeModal={() => toggleEditModal()} content={<EditProject closeModal={() => toggleEditModal()} />} />
      }
      {
        openViewModal && <Modal closeArrow={true} closeModal={() => toggleViewModal()} content={<VisualizeProject closeModal={() => toggleEditModal()} openEdit={() => toggleEditModal()} openApply={() => toggleApplyModal()} />} />
      }
      {
        openApplyModal && <Modal closeArrow={true} closeModal={() => toggleApplyModal()} content={<ApplicationForm closeModal={() => toggleApplyModal()} />} />
      }
      {
        <div className = "bodyCards">
          {
          projects.map((project: any, index: number) => {
            return (
              <div onClick={() => setOpenViewModal(!openCreateModal)}>
                <Card {...project}></Card>
              </div>
            )
          })
          }
        </div>
        // 
      }
      {/* {
        openConfirmModal && <Modal type="warning" closeModal={() => toggleConfirmModal()} content={<DeleteProject closeModal={() => toggleConfirmModal()} />} />
      } */}
      <div className="button-container">
        <div className='add-icon' onClick={() => setOpenCreateModal(!openCreateModal)}>
          <AddIcon />
        </div>
        <p className='tooltip'>Criar Projeto</p>
      </div>
    </div>
  )
}

export default Home