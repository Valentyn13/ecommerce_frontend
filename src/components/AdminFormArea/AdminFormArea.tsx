import { FC, ReactNode } from "react";

interface IAdminFormAreaProps {
    areaName: string;
    children:ReactNode
}
const AdminFormArea:FC<IAdminFormAreaProps> = ({areaName, children}) => {
  return (
    <div className="add_section__area" id={areaName.toLocaleLowerCase()}>
    <h4 className="add_section__label">{areaName}</h4>
    <div className="add_section__content">
      <div className="add_section__inputs inputs">
        {children}
      </div>
    </div>
  </div>
  )
}

export default AdminFormArea;