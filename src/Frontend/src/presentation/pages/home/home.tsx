import React, {useState} from 'react'
import { Project } from '../../../shared/lib/types'
import Card from '../../components/card/card'

import AddIcon from '@mui/icons-material/Add'

import './home-styles.scss'
import Modal from '../../components/modal/modal'

const Home: React.FC = () => {
  const isMobile = true;
  const [openModal, setOpenModal] = useState(false)

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
        openModal && <Modal />
      }
      {
        projects.map((project: any, index: number) => {
          return (
            <div key={index} className="grid-4">
              <Card {...project}></Card>
            </div>
          )
        })
      }
      <div className="button-container">
        <div className='add-icon' onClick={() => setOpenModal(!openModal)}>
          <AddIcon />
        </div>
        <p className='tooltip'>Criar Projeto</p>
      </div>
    </div>
  )
}

export default Home