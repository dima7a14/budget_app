import { createStore, createEffect } from 'effector';

import api from 'controllers/api';
import { ITokens, IRegisterError } from 'controllers/api/resources/auth';

export interface IUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  admin: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  loading: boolean;
  token: string;
}

const initialUser: IUser = {
  id: 0,
  email: '',
  firstName: '',
  lastName: '',
  admin: false,
  active: false,
  createdAt: '',
  updatedAt: '',
  loading: false,
  token: '',
};

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

  const $user = createStore<IUser>(initial)
    .on(loginFx.pending, (state, loading) => ({ ...state, loading }))
    .on(loginFx.done, (state, { result }) => {
      if (typeof result !== 'undefined') {
        console.log('TOKENS - ', result);

        return { ...state, token: result.access };
      }
    })
    .on(loginFx.fail, (state, { error }) => {
      console.log(error);

      return state;
    })
    .on(logoutFx.pending, (state, loading) => ({ ...state, loading }))
    .on(logoutFx.done, (state) => initial)
    .on(logoutFx.fail, (state) => initial);

  return {
    $store: $user,
    api: {
      login: loginFx,
      logout: logoutFx,
    },
  };
}
