import {FC, ReactNode, Dispatch} from 'react';

import './Modal.scss';

interface IModalProps {
    active:boolean;
    type: string
    setActive:Dispatch<React.SetStateAction<boolean>>
    children?: ReactNode
}

export const Modal:FC<IModalProps> = ({active, setActive, children, type}) => {
  return (
    <div className={active? "modal modal-active": "modal"} onClick={() => setActive(false)}>
        <div className={active? "modal__content content-active": "modal__content"} onClick={(e) => e.stopPropagation()}>
            <div className='modal__header'>
                <h3>{type}</h3>
            </div>
            {children}
        </div>
    </div>
  )
}
