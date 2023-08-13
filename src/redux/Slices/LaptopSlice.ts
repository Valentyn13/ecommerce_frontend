import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface ILaptop {
    name: string;
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

interface ILaptopsState {
    laptops: ILaptop[]
}

const initialState: ILaptopsState = {
    laptops: []
}


const laptopReducer = createSlice({
    name:'laptops',
    initialState,
    reducers: {
        loadLaptops: (state, action:PayloadAction<ILaptop[]>) => {
            state.laptops = action.payload
        }
    }
})


export const {loadLaptops} = laptopReducer.actions;
export default laptopReducer.reducer;