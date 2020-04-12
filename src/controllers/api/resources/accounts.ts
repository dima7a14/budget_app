import { AxiosInstance } from 'axios';

import {
  ICreateResource,
  IListResource,
  IUpdateResource,
  IDestroyResource,
  IRetrieveResource,
  IBaseError,
  IPaginatedResponse,
  handleError,
} from '../common';


export interface IAccount {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  balance: number;
  balanceCurrency: string;
  ownerId: number;
}

export interface IAccountError extends Partial<IBaseError> {
  name?: string[];
  balance?: string[];
  balanceCurrency?: string[];
}

class Accounts implements ICreateResource, IListResource, IRetrieveResource, IUpdateResource, IDestroyResource {
  prefix: string;
  instance: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.instance = instance;
    this.prefix = '/accounts';
  }

  public async getMany(page: number) {
    try {
      const { data } = await this.instance.get<IPaginatedResponse<IAccount>>(
        `${this.prefix}/`,
        { params: { page } },
      );

      return data;
    } catch (err) {
      handleError<IBaseError>(err);
    }
  }

  public async get(id: number) {
    try {
      const { data } = await this.instance.get<IAccount>(`${this.prefix}/${id}/`);

      return data;
    } catch (err) {
      handleError<IBaseError>(err);
    }
  }

  public async create(
    name: string,
    balance: number,
    balanceCurrency: string,
    optional: { description?: string } = {},
  ) {
    try {
      const params = {
        name,
        balance,
        balanceCurrency,
        ...optional,
      };
      const { data } = await this.instance.post<IAccount>(`${this.prefix}/`, { params });

      return data;
    } catch (err) {
      handleError<IAccountError>(err);
    }
  }

  public async update(
    id: number,
    params: { name?: string, description?: string, balance?: number, currency?: string } = {},
  ) {
    try {
      const { data } = await this.instance.patch<IAccount>(`${this.prefix}/${id}/`, { params });

      return data;
    } catch (err) {
      handleError<IAccountError>(err);
    }
  }

  public async destroy(id: number) {
    try {
      await this.instance.delete(`${this.prefix}/${id}/`);
    } catch (err) {
      handleError<IBaseError>(err);
    }
  }
}

export default Accounts;
