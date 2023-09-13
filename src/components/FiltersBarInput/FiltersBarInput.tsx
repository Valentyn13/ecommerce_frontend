import { FC } from "react";

import { REDUCER_ACTION_TYPE, ReducerAction } from "../../types/filter.types";

interface IFiltersBarInputProps {
  name: string;
  reducer: (action: ReducerAction) => void;
  type: REDUCER_ACTION_TYPE;
}

const FiltersBarInput: FC<IFiltersBarInputProps> = ({
  name,
  reducer,
  type,
}) => {
  return (
    <div className="filtersBar__input">
      <label>
        <input
          type="checkbox"
          value={name}
          onChange={(e) =>
            reducer({
              type,
              payload: e.target.value,
            })
          }
        />
        {name}
      </label>
    </div>
  );
};

export default FiltersBarInput;
