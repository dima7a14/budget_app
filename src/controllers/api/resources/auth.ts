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
  loginPath: string;
  logoutPath: string;
  registerPath: string;
  refreshPath: string;
  instance: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.instance = instance;
    this.prefix = '/auth';
    this.loginPath = `${this.prefix}/login/`;
    this.logoutPath = `${this.prefix}/logout/`;
    this.registerPath = `${this.prefix}/register/`;
    this.refreshPath = `${this.prefix}/refresh/`;
  }

  public async login(email: string, password: string) {
    try {
      const { data } = await this.instance.post<ITokens>(this.loginPath, { email, password });

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
      await this.instance.post(this.logoutPath, { refresh });

      this.instance.defaults.headers.common.Authorization = '';
    } catch (err) {
      handleError(err);
    }
  }

  public async register(email: string, password: string, firstName: string, lastName: string) {
    try {
      await this.instance.post(this.registerPath, { email, password, firstName, lastName });
    } catch (err) {
      handleError<IRegisterError>(err);
    }
  }

  public async refresh(refresh: string) {
    try {
      const { data } = await this.instance.post<ITokens>(this.refreshPath, { refresh });

      return data;
    } catch (err) {
      handleError(err);
    }
  }
}

export default Auth;
