import React from 'react'
import Button from '../../components/button/button'
import './deleteProject-styles.scss'

type Props = {
  closeModal: Function;
  delete: Function
}

const DeleteProject = (props: Props) => {
  return (
    <div id='delete-project'>
      <h2>Delete Project</h2>
      <p>You really want to delete the project?</p>
      <div className="delete-buttons">
        <Button text="Yes, delete" size='medium' type='cancel'  onClick={() => props.delete()}/>
        <Button text="Cancel" size='medium' type='default' onClick={() => props.closeModal()}/>
      </div>
    </div>
  )
}

export default DeleteProject