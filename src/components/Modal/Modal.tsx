import {FC, ReactNode, Dispatch} from 'react';

import './Modal.scss';

interface IModalProps {
    active:boolean;
    setActive:Dispatch<React.SetStateAction<boolean>>
    children?: ReactNode
}

export const Modal:FC<IModalProps> = ({active, setActive, children}) => {
  return (
    <div className={active? "modal modal-active": "modal"} onClick={() => setActive(false)}>
        <div className={active? "modal__content content-active": "modal__content"} onClick={(e) => e.stopPropagation()}>
            {children}
        </div>
    </div>
  )
}
