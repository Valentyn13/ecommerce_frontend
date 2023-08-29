export interface ILaptop {
    name: string;
    _id:string;
    price: number;
    producer: string;
    mainImage: string;
    screen: {
        size: number;
        screenType: 'IPS'|"OLED";
        resolution: string;
    };
    CPU: {
        producer: "Intel"|"AMD"|"Apple";
        model: string;
        cores: number
    };
    videoCard: {
        producer: 'Intel' | 'AMD';
        model: string;
    };
    hardDrive: {
        value:number;
        hardType: 'SSD'|'HDD'
    }
}

export type ILaptopList = ILaptop[]

export interface ILaptopsState {
    laptops: ILaptop[]
}