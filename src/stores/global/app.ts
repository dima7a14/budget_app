import { createStore, createEvent } from 'effector';

import { IGlobalStore } from './index';


export interface IApp {
  message?: IMessage;
}

type TMessageVariant = 'error' | 'warning' | 'info' | 'success';

export interface IMessage {
  text: string;
  variant?: TMessageVariant;
}

const initialApp: IApp = {
  message: undefined,
};

export function createAppApi(rootStore: IGlobalStore) {
  // Events
  const showMsg = createEvent<IMessage>();
  const clearMsg = createEvent();

  // Store
  const $app = createStore<IApp>({})
    .on(showMsg, (state, msg) => ({ message: msg }))
    .on(clearMsg, () => ({}));

  return {
    $store: $app,
    api: {
      show: showMsg,
      clear: clearMsg,
    },
  };
}
