import { Roles } from "@/enums/roles.enums"

export interface User {
    email: string
    firstName: string
    lastName: string
    phoneNumber: string
    role: Roles;
    password: string
}