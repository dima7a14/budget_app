import { AxiosInstance } from 'axios';
import { IResource, IBaseError, handleError } from '../common';


export interface ITokens {
  refresh: string;
  access: string;
}

export interface IRegisterError {
  email?: string[];
  firstName?: string[];
  lastName?: string[];
  password?: string[];
}

class Auth implements IResource {
  prefix: string;
  instance: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.instance = instance;
    this.prefix = '/auth';
  }

  public async login(email: string, password: string) {
    try {
      const { data } = await this.instance.post<ITokens>(`${this.prefix}/login/`, { email, password });

      if (data.access) {
        this.instance.defaults.headers.common.Authorization = `Bearer ${data.access}`;
      }

      return data;
    } catch (err) {
      handleError<IBaseError>(err);
    }
  }

  public async logout(refresh: string) {
    try {
      await this.instance.post(`${this.prefix}/logout/`, { refresh });

      this.instance.defaults.headers.common.Authorization = '';
    } catch (err) {
      handleError(err);
    }
  }

  public async register(email: string, password: string, firstName: string, lastName: string) {
    try {
      await this.instance.post(`${this.prefix}/register/`, { email, password, firstName, lastName });
    } catch (err) {
      handleError<IRegisterError>(err);
    }
  }

  public async refresh(refresh: string) {
    try {
      const { data } = await this.instance.post<ITokens>(`${this.prefix}/refresh/`, { refresh });

      return data;
    } catch (err) {
      handleError(err);
    }
  }
}

export default Auth;
