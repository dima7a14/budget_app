import { createStoreObject, createApi } from 'effector';

interface Account {
  id: string;
  currency: string;
  name: string;
}

const initialState: {
  data: Record<string, Account>;
  loading: boolean;
} = {
  data: {},
  loading: false,
};

const accounts = createStoreObject(initialState);

const { setAccounts } = createApi(accounts, {
  setAccounts: (state, payload: Record<string, Account>) => ({
    ...state,
    data: payload,
  }),
});

export { setAccounts };
export default accounts;
