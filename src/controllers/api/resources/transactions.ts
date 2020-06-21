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


export interface ITransaction {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  value: number;
  accountId: number;
  createdById: number;
  categories: Array<{
    id: number;
    name: string;
  }>;
}

export interface ITransactionError extends Partial<IBaseError> {
  name?: string[];
  value?: string[];
}

class Transactions implements ICreateResource, IListResource, IUpdateResource, IDestroyResource, IRetrieveResource {
  prefix: string;
  instance: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.instance = instance;
    this.prefix = '/transactions';
  }

  public async getMany(page: number) {
    try {
      const { data } = await this.instance.get<IPaginatedResponse<ITransaction>>(
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
      const { data } = await this.instance.get<ITransaction>(`${this.prefix}/${id}/`);

      return data;
    } catch (err) {
      handleError<IBaseError>(err);
    }
  }

  public async create(
    name: string,
    value: number,
    accountId: number,
    optional: { categoryId?: number } = {},
  ) {
    try {
      const params = {
        name,
        value,
        accountId,
        ...optional,
      };
      const { data } = await this.instance.post<ITransaction>(`${this.prefix}/`, { params });

      return data;
    } catch (err) {
      handleError<ITransactionError>(err);
    }
  }

  public async update(
    id: number,
    params: { value?: number, name?: string, accountId?: number, categoryId?: number } = {},
  ) {
    try {
      const { data } = await this.instance.patch<ITransaction>(`${this.prefix}/${id}/`, { params });

      return data;
    } catch (err) {
      handleError<ITransactionError>(err);
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

export default Transactions;
