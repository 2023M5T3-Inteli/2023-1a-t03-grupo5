import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import React from 'react'
import './modal-styles.scss'

import CloseIcon from '@mui/icons-material/Close'

type Props = {
  closeArrow?: boolean;
  closeModal: Function;
  content: ReactJSXElement;
  type?: 'warning';
  size?: 'small' | 'medium' | 'large';
}

const Modal = (props: Props) => {
  return (
    <div className='modal'>
      {/* <div>Modal</div> */}
      <div className={`modal-container ${props.size ? props.size : 'small'}`}>
        {
          props.closeArrow &&
          <div className='backIcon' onClick={() => props.closeModal()}>
            <CloseIcon />
          </div>
        }
        {
          props.content
        }
      </div>
    </div>
  )
}

export default Modal