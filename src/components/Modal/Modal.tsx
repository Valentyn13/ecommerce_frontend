import {FC, ReactNode, Dispatch} from 'react';

import './Modal.scss';

interface IModalProps {
    active:boolean;
    setActive:Dispatch<React.SetStateAction<boolean>>
    children?: ReactNode
    contentWidth?: string
    contentHeight?: string
    modalAlignItems?: string
    modalJustifyContent?: string
}

export const Modal:FC<IModalProps> = ({modalJustifyContent, modalAlignItems,contentHeight, contentWidth, active, setActive, children}) => {
  return (
    <div style={{justifyContent:modalJustifyContent || 'flex-start', alignItems:modalAlignItems || 'flex-start'}} className={active? "modal modal-active": "modal"} onClick={() => setActive(false)}>
        <div style={{width: contentWidth, height: contentHeight}} className={active? "modal__content content-active": "modal__content"} onClick={(e) => e.stopPropagation()}>
            {children}
        </div>
    </div>
  )
}
