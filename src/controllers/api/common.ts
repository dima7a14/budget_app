export interface IResource {
  prefix: string;
}

export function handleError<F extends {}>(error: any) {
  if (typeof error === 'object') {
    if (typeof error.response !== 'undefined') {
      const { data } = error.response;
      console.error('Error from API - ', data);

      return data as F;
    }

    throw error;
  }
}

// Common error interfaces
export interface IBaseError {
  detail: string;
}

export interface INotValidToken extends IBaseError {
  code: string;
  messages?: Array<{
    tokenClass: string;
    tokenType: 'access' | 'refresh';
    message: string;
  }>;
}
