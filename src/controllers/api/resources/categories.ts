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


export interface ICategory {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  type: 'def' | 'cus';
  createdById: number;
}

export interface ICategoryError extends IBaseError {
  name?: string[];
}

class Categories implements ICreateResource, IListResource, IUpdateResource, IDestroyResource, IRetrieveResource {
  prefix: string;
  instance: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.instance = instance;
    this.prefix = '/categories';
  }

  public async getMany(page: number) {
    try {
      const { data } = await this.instance.get<IPaginatedResponse<ICategory>>(
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
      const { data } = await this.instance.get<ICategory>(`${this.prefix}/${id}/`);

      return data;
    } catch (err) {
      handleError<IBaseError>(err);
    }
  }

  public async create(name: string, optional: { description?: string } = {}) {
    try {
      const params = {
        name,
        ...optional,
      };
      const { data } = await this.instance.post<ICategory>(`${this.prefix}/`, { params });

      return data;
    } catch (err) {
      handleError<ICategoryError>(err);
    }
  }

  public async update(id: number, params: { name?: string, description?: string } = {}) {
    try {
      const { data } = await this.instance.patch(`${this.prefix}/${id}/`, { params });

      return data;
    } catch (err) {
      handleError<ICategoryError>(err);
    }
  }

  public async destroy(id: number) {
    try {
      await this.instance.delete(`${this.prefix}/${id}/`);
    } catch (err) {
      handleError<ICategoryError>(err);
    }
  }
}

export default Categories;
