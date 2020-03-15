import { createStore, createEffect } from 'effector';

import api from 'controllers/api';
import { ITokens, IRegisterError } from 'controllers/api/resources/auth';
import {
  IUser as IApiUser,
  IUpdateError,
  IUpdateData as IApiUpdateData,
} from 'controllers/api/resources/user';


export interface IUser extends IApiUser {
  loading: boolean;
  accessToken: string;
  refreshToken: string;
}

const initialUser: IUser = {
  id: 0,
  email: '',
  firstName: '',
  lastName: '',
  isStaff: false,
  isActive: false,
  createdAt: '',
  updatedAt: '',
  loading: false,
  accessToken: '',
  refreshToken: '',
};

export interface IUpdateData extends IApiUpdateData {
  id: number;
}

export function createUserApi(initial: IUser = initialUser) {
  const loginFx = createEffect<
    { email: string, password: string },
    ITokens | undefined,
    IRegisterError
  >('Login user', {
    handler: async ({ email, password }) => {
      const tokens = await api.auth.login(email, password);

      return tokens;
    },
  });

  const logoutFx = createEffect<{ refresh: string }, void, Error>('Logout user', {
    handler: async ({ refresh }) => {
      await api.auth.logout(refresh);
    },
  });

  const detailFx = createEffect<void, IApiUser | undefined, Error>('Detail user', {
    handler: async () => {
      const data = await api.user.get();

      return data;
    },
  });

  const updateFx = createEffect<IUpdateData, IApiUser | undefined, IUpdateError>('Update user', {
    handler: async ({ id, ...rest }) => {
      const data = await api.user.update(id, rest);

      return data;
    },
  });

  const $user = createStore<IUser>(initial)
    .on(loginFx.pending, (state, loading) => ({ ...state, loading }))
    .on(loginFx.done, (state, { result }) => {
      if (typeof result !== 'undefined') {

        return { ...state, accessToken: result.access, refreshToken: result.refresh };
      }
    })
    .on(loginFx.fail, (state, { error }) => {
      console.log(error);

      return state;
    })
    .on(logoutFx.pending, (state, loading) => ({ ...state, loading }))
    .on(logoutFx.done, (state) => initial)
    .on(logoutFx.fail, (state) => initial)
    .on(detailFx.pending, (state, loading) => ({ ...state, loading }))
    .on(detailFx.done, (state, { result }) => {
      if (typeof result !== 'undefined') {
        return { ...state, ...result };
      }
    })
    .on(detailFx.fail, (state, { error }) => {
      console.log(error);

      return state;
    })
    .on(updateFx.pending, (state, loading) => ({ ...state, loading }))
    .on(updateFx.done, (state, { result }) => {
      if (typeof result !== 'undefined') {
        return { ...state, ...result };
      }
    })
    .on(updateFx.fail, (state, { error }) => {
      console.log(error);

      return state;
    })

  return {
    $store: $user,
    api: {
      login: loginFx,
      logout: logoutFx,
      get: detailFx,
      update: updateFx,
    },
  };
}
