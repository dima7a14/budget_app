import { AxiosInstance } from 'axios';
import { IResource, IBaseError, handleError } from '../common';


export interface IUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  isStaff: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IUpdateError {
  email?: string[];
  password?: string[];
  firstName?: string[];
  lastName?: string[];
}

export interface IUpdateData {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
}

class User implements IResource {
  prefix: string;
  instance: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.instance = instance;
    this.prefix = '/users';
  }

  public async get() {
    try {
      const { data } = await this.instance.get<IUser>(`${this.prefix}/detail/`);

      return data;
    } catch (err) {
      handleError<IBaseError>(err);
    }
  }

  public async update(id: number, updateData: IUpdateData) {
    try {
      const url = `${this.prefix}/${id}/`;
      const { data } = await this.instance.patch<IUser>(url, { updateData });

      return data
    } catch (err) {
      handleError<IUpdateError>(err);
    }
  }
}

export default User;
