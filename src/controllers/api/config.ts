export function getPath() {
  let address = '';

  switch (process.env.REACT_APP_API_ENV) {
    case 'local': {
      address = 'http://localhost:8000';
      break;
    }
    default: {
      address = 'http://family-budget-api.herokuapp.com';
      break;
    }
  }

  return `${address}/api`;
}
