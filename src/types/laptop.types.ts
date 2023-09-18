export interface ILaptop {
    name: string;
    _id: string;
    price: number;
    producer:"Lenovo"| "Acer"|"HP"|"Asus"|"Apple"|"Dell";
    mainImage: string;
    screen: {
        size: "13"| "14"|"15.6"|"16"|"17";
        screenType: "IPS" | "OLED";
        resolution: string;
    };
    CPU: {
        producer: "Intel" | "AMD" | "Apple" | "Nvidia";
        model: string;
        cores: number;
    };
    videoCard: {
        producer: "Intel" | "AMD" | "Apple" | "Nvidia";
        model: string;
    };
    hardDrive: {
        value: 256 | 512| 1024 ;
        hardType: "SSD" | "HDD";
    };
}

export interface ILaptopFetchData  extends ILaptop {
    __v: number;
}

export interface ILaptopFetchListData  {
    laptopList: ILaptopFetchData [],
    pageCount: number
}

export interface ILaptopFormData {
    name: string;
    price: number;
    producer: "Lenovo"| "Acer"|"HP"|"Asus"|"Apple"|"Dell"| "";
    mainImage?: string;
    screen: {
        size: "13"| "14"|"15.6"|"16"|"17"| ""
        screenType: "IPS" | "OLED" | "";
        resolution: string;
    };
    CPU: {
        producer: "Intel" | "AMD" | "Apple" | "Nvidia" | "";
        model: string;
        cores: number;
    };
    videoCard: {
        producer: "Intel" | "AMD" | "Apple" | "Nvidia" | "";
        model: string;
    };
    hardDrive: {
        value: 256 | 512| 1024 ;
        hardType: "SSD" | "HDD" | "";
    };
}


export interface IUpdateLaptopData {
    name: string;
    price: number;
    producer: "Lenovo"| "Acer"|"HP"|"Asus"|"Apple"|"Dell"| "";
    screen: {
        size: "13"| "14"|"15.6"|"16"|"17"| ""
        screenType: "IPS" | "OLED" | "";
        resolution: string;
    };
    CPU: {
        producer: "Intel" | "AMD" | "Apple" | "Nvidia" | "";
        model: string;
        cores: number;
    };
    videoCard: {
        producer: "Intel" | "AMD" | "Apple" | "Nvidia" | "";
        model: string;
    };
    hardDrive: {
        value: 256 | 512| 1024 ;
        hardType: "SSD" | "HDD" | "";
    };
}

export interface IEditLaptops {
    id:string,
    payload:ILaptopFormData
}

export type UpdateLaptopsFielsd = keyof IUpdateLaptopData 
export type ILaptopList = ILaptop[];
export type ILaptopPayload ={
    laptops: ILaptopList
    isLoadSuccess: boolean
    pageCount: number
}
export interface ILaptopsState {
    laptops: ILaptop[];
    pageCount: number;
    isLoadSuccess: boolean
}
