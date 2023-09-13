import { FC, ReactNode } from "react";

interface IFiltersbarBlockProps {
  name: string;
  children: ReactNode;
}
const FiltersBarBlock: FC<IFiltersbarBlockProps> = ({ name, children }) => {
  return (
    <div className="filtersBar__block">
      <h3>{name}</h3>
      {children}
    </div>
  );
};

export default FiltersBarBlock;
