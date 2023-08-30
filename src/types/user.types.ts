type UserRole = 'USER' | 'ADMIN';

export interface IUser {
    info: string;
    email: string;
    password: string;
    name: string;
    role: UserRole;
    _id: string;
    __v: number
}

export interface ILoginData {
    email: string;
    password: string;
}

export interface IRegisterData {
    role?: UserRole
    name: string;
    email: string;
    password: string;
}


export interface IUserFetchData {
    token: string;
    user: IUser
}