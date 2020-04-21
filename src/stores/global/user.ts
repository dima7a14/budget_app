import { createStore, createEffect } from 'effector';

import storage from 'controllers/storage';
import api from 'controllers/api';
import { IBaseError } from 'controllers/api/common';
import { IRegisterError, ITokens } from 'controllers/api/resources/auth';
import {
  IUser as IApiUser,
  IUpdateError,
  IUpdateData as IApiUpdateData,
} from 'controllers/api/resources/users';

import { IGlobalStore } from './index';


export interface IUser extends IApiUser {
  loading: boolean;
  tokens: ITokens;
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
  tokens: {
    access: '',
    refresh: '',
  },
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

export function createUserApi(
  rootStore: IGlobalStore,
  tokens: ITokens = { access: '', refresh: '' },
) {
  const loginFx = createEffect<
    { email: string, password: string, remember: boolean },
    ITokens | undefined,
    IRegisterError
  >('Login user', {
    handler: async ({ email, password, remember }) => {
      const tokens = await api.auth.login(email, password);

      if (typeof tokens !== 'undefined') {
        storage.enableCaching(remember);

        return tokens;
      }
    },
  });

  loginFx.done.watch(({ result }) => {
    if (typeof result !== 'undefined') {
      rootStore.app.api.show({ text: 'Logged in', variant: 'success' });
      storage.save({ tokens: result });
    }
  });

  loginFx.fail.watch(({ error }) => {
    Object.values(error).forEach((err: string) => {
      rootStore.app.api.show({ text: err, variant: 'error' });
    });
  });

  const logoutFx = createEffect<{ refresh: string }, void, Error>('Logout user', {
    handler: async ({ refresh }) => {
      await api.auth.logout(refresh);
    },
  });

  logoutFx.done.watch(() => {
    storage.save({ tokens: { access: '', refresh: '' } });
    rootStore.app.api.show({ text: 'Logged out' });
  });

  logoutFx.fail.watch(() => {
    storage.save({ tokens: { access: '', refresh: '' } });
    rootStore.app.api.show({ text: 'Logged out' });
  });

  const registerFx = createEffect<
    IRegisterData,
    ITokens | undefined,
    IRegisterError
  >('Register user', {
    handler: async ({ email, password, firstName, lastName, remember }) => {
      await api.auth.register(email, password, firstName, lastName);

      const tokens = await api.auth.login(email, password);

      if (typeof tokens !== 'undefined') {
        storage.enableCaching(remember);

        return tokens;
      }
    },
  });

  registerFx.done.watch(({ result }) => {
    if (typeof result !== 'undefined') {
      rootStore.app.api.show({ text: 'Signed up', variant: 'success' });
      storage.save({ tokens: result });
    }
  });

  registerFx.fail.watch(({ error }) => {
    Object.values(error).forEach((err: string) => {
      rootStore.app.api.show({ text: err, variant: 'error' });
    });
  });

  const detailFx = createEffect<void, IApiUser | undefined, IBaseError>('Detail user', {
    handler: async () => {
      const data = await api.users.get();

      return data;
    },
  });

  detailFx.fail.watch(({ error }) => {
    if (typeof error.detail !== 'undefined') {
      rootStore.app.api.show({ text: error.detail, variant: 'error' });
    } else {
      Object.values(error).forEach((err: string) => {
        rootStore.app.api.show({ text: err, variant: 'error' });
      });
    }
  });

  const updateFx = createEffect<IUpdateData, IApiUser | undefined, IUpdateError>('Update user', {
    handler: async ({ id, ...rest }) => {
      const data = await api.users.update(id, rest);

      return data;
    },
  });

  updateFx.done.watch(({ result }) => {
    if (typeof result !== 'undefined') {
      rootStore.app.api.show({ text: 'Updated', variant: 'success' });
    }
  });

  updateFx.fail.watch(({ error }) => {
    Object.values(error).forEach((err: string) => {
      rootStore.app.api.show({ text: err, variant: 'error' });
    });
  });

  const $user = createStore<IUser>({ ...initialUser, tokens })
    .on(loginFx.pending, (state, loading) => ({ ...state, loading }))
    .on(loginFx.done, (state, { result }) => {
      if (typeof result !== 'undefined') {
        return { ...state, tokens: result };
      }
    })
    .on(loginFx.fail, () => initialUser)

    .on(logoutFx.pending, (state, loading) => ({ ...state, loading }))
    .on(logoutFx.done, () => initialUser)
    .on(logoutFx.fail, () => initialUser)

    .on(registerFx.pending, (state, loading) => ({ ...state, loading }))
    .on(registerFx.done, (state, { result }) => {
      if (typeof result !== 'undefined') {
        return { ...state, tokens: result };
      }
    })
    .on(registerFx.fail, () => initialUser)

    .on(detailFx.pending, (state, loading) => ({ ...state, loading }))
    .on(detailFx.done, (state, { result }) => {
      if (typeof result !== 'undefined') {
        return { ...state, ...result };
      }
    })
    .on(detailFx.fail, () => initialUser)

    .on(updateFx.pending, (state, loading) => ({ ...state, loading }))
    .on(updateFx.done, (state, { result }) => {
      if (typeof result !== 'undefined') {
        return { ...state, ...result };
      }
    })
    .on(updateFx.fail, () => initialUser);

  // Check if need to fetch user
  const state = $user.getState();
  if (state.tokens.access && !state.id) {
    api.setTokens(state.tokens);
    detailFx();
  }

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
