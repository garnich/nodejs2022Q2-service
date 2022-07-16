export interface IBaseUser {
    id: string; // uuid v4
    login: string;
    version: number; // integer number, increments on update
    createdAt: number; // timestamp of creation
    updatedAt: number; 
}

export interface IFullUser extends IBaseUser {
    password: string;
}
