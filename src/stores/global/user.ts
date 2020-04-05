import { createStore, createEffect } from 'effector';

import storage from 'controllers/storage';
import api from 'controllers/api';
import { IRegisterError } from 'controllers/api/resources/auth';
import {
  IUser as IApiUser,
  IUpdateError,
  IUpdateData as IApiUpdateData,
} from 'controllers/api/resources/user';

import { IGlobalStore } from './index';


export interface IUser extends IApiUser {
  loading: boolean;
  token: string;
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
  token: '',
};

export interface IRegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  remember: boolean;
}

export interface IUpdateData extends IApiUpdateData {
  id: number;
}

export function createUserApi(rootStore: IGlobalStore, cachedUser: IUser = initialUser) {
  const loginFx = createEffect<
    { email: string, password: string, remember: boolean },
    string | undefined,
    IRegisterError
  >('Login user', {
    handler: async ({ email, password, remember }) => {
      const tokens = await api.auth.login(email, password);

      if (typeof tokens !== 'undefined') {
        storage.cacheData(remember);

        return tokens.access;
      }
    },
  });

  const logoutFx = createEffect<{ refresh: string }, void, Error>('Logout user', {
    handler: async ({ refresh }) => {
      await api.auth.logout(refresh);
    },
  });

  const registerFx = createEffect<
    IRegisterData,
    string | undefined,
    IRegisterError
  >('Register user', {
    handler: async ({ email, password, firstName, lastName, remember }) => {
      await api.auth.register(email, password, firstName, lastName);

      const tokens = await api.auth.login(email, password);

      if (typeof tokens !== 'undefined') {
        storage.cacheData(remember);

        return tokens.access;
      }
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

  const $user = createStore<IUser>(cachedUser)
    .on(loginFx.pending, (state, loading) => ({ ...state, loading }))
    .on(loginFx.done, (state, { result }) => {
      if (typeof result !== 'undefined') {
        rootStore.app.api.show({ text: 'Logged in', variant: 'success' });

        return { ...state, token: result };
      }
    })
    .on(loginFx.fail, (state, { error }) => {
      Object.values(error).forEach((err: string) => {
        rootStore.app.api.show({ text: err, variant: 'error' });
      });

      return initialUser;
    })

    .on(logoutFx.pending, (state, loading) => ({ ...state, loading }))
    .on(logoutFx.done, () => {
      rootStore.app.api.show({ text: 'Logged out' });

      return initialUser;
    })
    .on(logoutFx.fail, () => {
      rootStore.app.api.show({ text: 'Logged out' });

      return initialUser;
    })

    .on(registerFx.pending, (state, loading) => ({ ...state, loading }))
    .on(registerFx.done, (state, { result }) => {
      if (typeof result !== 'undefined') {
        rootStore.app.api.show({ text: 'Signed up', variant: 'success' });

        return { ...state, token: result };
      }
    })
    .on(registerFx.fail, (state, { error }) => {
      Object.values(error).forEach((err: string) => {
        rootStore.app.api.show({ text: err, variant: 'error' });
      });

      return state;
    })

    .on(detailFx.pending, (state, loading) => ({ ...state, loading }))
    .on(detailFx.done, (state, { result }) => {
      if (typeof result !== 'undefined') {
        return { ...state, ...result };
      }
    })
    .on(detailFx.fail, (state, { error }) => {
      Object.values(error).forEach((err: string) => {
        rootStore.app.api.show({ text: err, variant: 'error' });
      });

      return state;
    })

    .on(updateFx.pending, (state, loading) => ({ ...state, loading }))
    .on(updateFx.done, (state, { result }) => {
      if (typeof result !== 'undefined') {
        rootStore.app.api.show({ text: 'Updated', variant: 'success' });

        return { ...state, ...result };
      }
    })
    .on(updateFx.fail, (state, { error }) => {
      Object.values(error).forEach((err: string) => {
        rootStore.app.api.show({ text: err, variant: 'error' });
      });

      return state;
    })

  return {
    $store: $user,
    api: {
      login: loginFx,
      logout: logoutFx,
      register: registerFx,
      get: detailFx,
      update: updateFx,
    },
  };
}
