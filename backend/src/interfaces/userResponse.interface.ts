import { IContactRequest } from "./contact.interface";

export interface IUserResponse {
  id: number;
  password?: string;
  name: string;
  email: string;
  contact?: [];
}
