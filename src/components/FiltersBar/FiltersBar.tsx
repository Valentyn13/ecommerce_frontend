import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import FiltersBarBlock from "../FiltersBarBlock/FiltersBarBlock";
import FiltersBarInput from "../FiltersBarInput/FiltersBarInput";
import { isCheckedHandler, prepearer } from "../../utils/utils";
import { useLazyFetchLaptopsQuery } from "../../redux/Slices/api/laptopApiSlice";
import { loadLaptops } from "../../redux/Slices/LaptopSlice";
import { useAppDispatch } from "../../redux/hooks";
import { ReducerAction, IFiletersFields, REDUCER_ACTION_TYPE } from "../../types/filter.types";

import "./FiltersBar.scss";

const FiltersBar = () => {
  const dispatch = useAppDispatch()
const [makeRquest, setMakeRequest] = useState(false)
  const [checkboxesValues, setCheckboxesValues] = useState<IFiletersFields>({
    producer: [],
    screenType: [],
    screenSize: [],
    hardDriveType: [],
    cpuProducer: [],
    videoCardProducer: [],
  });

  const [fetchLaptops, {data, error, isSuccess}]= useLazyFetchLaptopsQuery()

  const reducer = (action: ReducerAction) => {
    switch (action.type) {
      case REDUCER_ACTION_TYPE.CHOOSE_PRODUCER:
        setCheckboxesValues({
          ...checkboxesValues,
          producer: isCheckedHandler(checkboxesValues.producer, action.payload),
        });
        return;
      case REDUCER_ACTION_TYPE.CHOOSE_SCREEN_TYPE:
        setCheckboxesValues({
          ...checkboxesValues,
          screenType: isCheckedHandler(
            checkboxesValues.screenType,
            action.payload
          ),
        });
        return;
      case REDUCER_ACTION_TYPE.CHOOSE_SCREEN_SIZE:
        setCheckboxesValues({
          ...checkboxesValues,
          screenSize: isCheckedHandler(
            checkboxesValues.screenSize,
            action.payload
          ),
        });
        return;
      case REDUCER_ACTION_TYPE.CHOOSE_HARD_TYPE:
        setCheckboxesValues({
          ...checkboxesValues,
          hardDriveType: isCheckedHandler(
            checkboxesValues.hardDriveType,
            action.payload
          ),
        });
        return;
      case REDUCER_ACTION_TYPE.CHOOSE_CPU_PRODUCER:
        setCheckboxesValues({
          ...checkboxesValues,
          cpuProducer: isCheckedHandler(
            checkboxesValues.cpuProducer,
            action.payload
          ),
        });
        return;
      case REDUCER_ACTION_TYPE.CHOOSE_VIDEOCARD_PRODUCER:
        setCheckboxesValues({
          ...checkboxesValues,
          videoCardProducer: isCheckedHandler(
            checkboxesValues.videoCardProducer,
            action.payload
          ),
        });
        return;
      default:
        console.log("Incorrect reducer type");
    }
  };


  
  useEffect(() => {
    if (data) {
      dispatch(loadLaptops({laptops:data, isLoadSuccess: isSuccess}))
    }
    if (error) {
      console.log(error)
      if ('data' in error) {
        toast.error(JSON.stringify(error.data), {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }
    }
  },[data,dispatch, error])

  useEffect(() => {
    fetchLaptops(prepearer(checkboxesValues))
  },[makeRquest])
  return (
    <div className="filtersBar">
      <ToastContainer/>
      <FiltersBarBlock name="Producer">
            <FiltersBarInput name="Asus" reducer={reducer} type={REDUCER_ACTION_TYPE.CHOOSE_PRODUCER}/>
            <FiltersBarInput name="Lenovo" reducer={reducer} type={REDUCER_ACTION_TYPE.CHOOSE_PRODUCER}/>
            <FiltersBarInput name="Acer" reducer={reducer} type={REDUCER_ACTION_TYPE.CHOOSE_PRODUCER}/>
            <FiltersBarInput name="Apple" reducer={reducer} type={REDUCER_ACTION_TYPE.CHOOSE_PRODUCER}/>
            <FiltersBarInput name="HP" reducer={reducer} type={REDUCER_ACTION_TYPE.CHOOSE_PRODUCER}/>
      </FiltersBarBlock>
      <FiltersBarBlock name="Screen size">
            <FiltersBarInput name="13" reducer={reducer} type={REDUCER_ACTION_TYPE.CHOOSE_SCREEN_SIZE}/>
            <FiltersBarInput name="14" reducer={reducer} type={REDUCER_ACTION_TYPE.CHOOSE_SCREEN_SIZE}/>
            <FiltersBarInput name="15.6" reducer={reducer} type={REDUCER_ACTION_TYPE.CHOOSE_SCREEN_SIZE}/>
            <FiltersBarInput name="16" reducer={reducer} type={REDUCER_ACTION_TYPE.CHOOSE_SCREEN_SIZE}/>
            <FiltersBarInput name="17" reducer={reducer} type={REDUCER_ACTION_TYPE.CHOOSE_SCREEN_SIZE}/>
      </FiltersBarBlock>
      <FiltersBarBlock name="Screen type">
            <FiltersBarInput name="IPS" reducer={reducer} type={REDUCER_ACTION_TYPE.CHOOSE_SCREEN_TYPE}/>
            <FiltersBarInput name="OLED" reducer={reducer} type={REDUCER_ACTION_TYPE.CHOOSE_SCREEN_TYPE}/>
      </FiltersBarBlock>
      <FiltersBarBlock name="Hard disk type">
            <FiltersBarInput name="SSD" reducer={reducer} type={REDUCER_ACTION_TYPE.CHOOSE_HARD_TYPE}/>
            <FiltersBarInput name="HDD" reducer={reducer} type={REDUCER_ACTION_TYPE.CHOOSE_HARD_TYPE}/>
      </FiltersBarBlock>
      <FiltersBarBlock name="Cpu producers">
            <FiltersBarInput name="Itel" reducer={reducer} type={REDUCER_ACTION_TYPE.CHOOSE_CPU_PRODUCER}/>
            <FiltersBarInput name="AMD" reducer={reducer} type={REDUCER_ACTION_TYPE.CHOOSE_CPU_PRODUCER}/>
            <FiltersBarInput name="Apple" reducer={reducer} type={REDUCER_ACTION_TYPE.CHOOSE_CPU_PRODUCER}/>
            <FiltersBarInput name="Nvidia" reducer={reducer} type={REDUCER_ACTION_TYPE.CHOOSE_CPU_PRODUCER}/>
      </FiltersBarBlock>
      <FiltersBarBlock name="Cpu video card producer">
            <FiltersBarInput name="Itel" reducer={reducer} type={REDUCER_ACTION_TYPE.CHOOSE_VIDEOCARD_PRODUCER}/>
            <FiltersBarInput name="AMD" reducer={reducer} type={REDUCER_ACTION_TYPE.CHOOSE_VIDEOCARD_PRODUCER}/>
            <FiltersBarInput name="Apple" reducer={reducer} type={REDUCER_ACTION_TYPE.CHOOSE_VIDEOCARD_PRODUCER}/>
            <FiltersBarInput name="Nvidia" reducer={reducer} type={REDUCER_ACTION_TYPE.CHOOSE_VIDEOCARD_PRODUCER}/>
      </FiltersBarBlock>
        <button className="filtersBar__applyButton" onClick={() => {
        setMakeRequest(!makeRquest)
        }}>Apply</button>
    </div>
  );
};

export default FiltersBar;
