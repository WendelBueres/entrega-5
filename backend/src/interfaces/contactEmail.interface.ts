import { IUserRequest } from "./user.interface";

export interface IContactEmailRequest {
  id?: number;
  email: string;
  contactId: number;
}
