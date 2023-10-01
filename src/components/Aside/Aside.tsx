import { useState } from "react";
import FiltersBar from "../FiltersBar/FiltersBar";

import { GrFilter as OpenFilter } from "react-icons/gr";

import "./Aside.scss";

const Aside = () => {
  const [filterActive, setFilterActive] = useState(false);
  return (
    <aside className="sidebar">
      {!filterActive && (
        <div className="sidebar__open-filter">
          <OpenFilter onClick={() => setFilterActive(true)} />
        </div>
      )}

      <FiltersBar isFilerOpen={filterActive} setIsFilterOpen={setFilterActive} />
    </aside>
  );
};

export default Aside;
