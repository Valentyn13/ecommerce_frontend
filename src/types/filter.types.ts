
export type ReducerAction = {
    type: REDUCER_ACTION_TYPE;
    payload: string;
  };
  
  export const enum REDUCER_ACTION_TYPE {
    CHOOSE_PRODUCER,
    CHOOSE_SCREEN_TYPE,
    CHOOSE_SCREEN_SIZE,
    CHOOSE_HARD_TYPE,
    CHOOSE_CPU_PRODUCER,
    CHOOSE_VIDEOCARD_PRODUCER,
  }
  
  export type IFiletersFields = {
    producer: string[];
    screenType: string[];
    screenSize: string[];
    hardDriveType: string[];
    cpuProducer: string[];
    videoCardProducer: string[];
    page: number
  };


  export type IFiletersFieldsPrepeared = {
    producer?: string[];
    screenType?: string[];
    screenSize?: string[];
    hardDriveType?: string[];
    cpuProducer?: string[];
    videoCardProducer?: string[];
    page?: number
  };
  