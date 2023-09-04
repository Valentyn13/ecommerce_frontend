import { ChangeEventHandler, FC } from "react";

interface IAddLaptoptFieldProps {
    text: string
    onChange: ChangeEventHandler<HTMLInputElement>
}
const AddLaptopImageField:FC<IAddLaptoptFieldProps> = ({text, onChange}) => {
  return (
    <div>
    <h2>{text}</h2>
    <input
      className="file-input"
      type="file"
      id="main_image"
      accept=".jpeg, .png, .jpg .webp"
      onChange={onChange}
    />
  </div>
  )
}

export default AddLaptopImageField;
