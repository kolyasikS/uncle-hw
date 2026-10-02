import { CreateAdminDto } from "../../application/dto/create-admin.dto";
export declare class Admin {
    readonly id: string;
    readonly email: string;
    readonly password: string;
    constructor(id: string, email: string, password: string);
    static create(createUserDto: CreateAdminDto): Promise<Admin>;
}
export type AdminHttp = Pick<Admin, "email">;
