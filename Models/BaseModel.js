import axios from 'axios';

export default class BaseModel {
  constructor(options) {
    this.options = options;

    this.oneTimeOptions = {};
  }

  setOAuthToken(token) {
    this.oneTimeOptions.headers = { ...this.oneTimeOptions.headers, Authorization: `${token.type} ${token.key}` };
  }

  setAuthorizationToken(token) {
    this.oneTimeOptions.headers = { ...this.oneTimeOptions.headers, Authorization: `${token.type} ${token.key}` };
  }

  getOptions = () => {
    const options = {};

    // dmv: deep lvl - 1
    Object.keys(this.options).concat(Object.keys(this.oneTimeOptions)).forEach(
      (key) => {
        options[key] = typeof (this.options[key]) === 'object'
          ? { ...this.options[key], ...this.oneTimeOptions[key] }
          : options[key] = this.oneTimeOptions[key] || this.options[key];
      },
    );

    this.oneTimeOptions = {};

    return options;
  };

  getUrl = endpoint => `${this.options.domain}/${endpoint}`;

  catchError = () => {
    throw Error('Undefined request error');
  };

  post(endpoint, body) {
    this.options.method = 'POST';

    const url = this.getUrl(endpoint);
    const requestData = { url, ...this.getOptions(), data: JSON.stringify(body) };

    return axios({ ...requestData })
      .then((response) => {
        // @TODO нужно ли?
        if (response.status === 204) {
          return Promise.resolve({});
        }

        return Promise.resolve(response.data);
      })
      .catch(error => this.catchError(error));
  }

  patch = (endpoint, body) => {
    this.options.method = 'PATCH';

    const url = this.getUrl(endpoint);
    const requestData = { url, ...this.getOptions(), data: JSON.stringify(body) };

    return axios({ ...requestData })
      .then(response => Promise.resolve(response.data))
      .catch(error => this.catchError(error));
  };

  delete = (endpoint) => {
    this.options.method = 'DELETE';

    const url = this.getUrl(endpoint);
    const requestData = { url, ...this.getOptions(), data: {} };

    return axios({ ...requestData })
      .then(response => Promise.resolve(response.data))
      .catch(error => this.catchError(error));
  };

  get = (endpoint, body) => {
    this.options.method = 'GET';
    const data = { ...body };

    const url = this.getUrl(endpoint);
    const requestData = {
      url, ...this.getOptions(), data, params: data,
    };

    return axios({ ...requestData })
      .then(response => Promise.resolve(response.data))
      .catch(error => this.catchError(error));
  };

  // @TODO исправлять будем в задаче про ошибки
  getError = ({
    errors, exception, error, ...rest
  } = {}) => {
    this.error = errors || error || exception;
    if (this.error) {
      const response = this.error instanceof Array
        ? this.error.map(item => (item.title))
        : this.error;

      return Promise.reject(response);
    }

    return { error: errors, ...rest };
  };
}
