export interface IResource {
  prefix: string;
}

export interface IListResource extends IResource {
  getMany(page: number): Promise<any>;
}

export interface ICreateResource extends IResource {
  create(...args: any[]): Promise<any>;
}

export interface IRetrieveResource extends IResource {
  get(id: number): Promise<any>;
}

export interface IUpdateResource extends IResource {
  update(id: number, ...args: any[]): Promise<any>;
}

export interface IDestroyResource extends IResource {
  destroy(id: number): Promise<void>;
}

export function handleError<F extends {}>(error: any) {
  if (typeof error === 'object') {
    if (typeof error.response !== 'undefined') {
      const { data } = error.response;
      console.error('Error from API - ', data);

      throw data as F;
    }
  }
  throw error;
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

export interface IPaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
