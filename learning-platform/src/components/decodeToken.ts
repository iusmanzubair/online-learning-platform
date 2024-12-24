import {jwtDecode} from "jwt-decode"

export interface tokenType {
    id: string,
    email: string,
    name: string,
    role: "INSTRUCTOR" | "STUDENT"
}
export const decodeToken = (token: string)=> {
    const decoded = jwtDecode(token);
    return decoded as tokenType;
}   