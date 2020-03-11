import BaseModel from "./BaseModel";

export default class ApiV2Model extends BaseModel {
  constructor(domain) {
    const options = {
      domain,
      mode: "cors",
      credentials: "same-origin",
      headers: {
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        pragma: 'no-cache',
        'cache-control': 'no-cache'
      }
    };

    super(options);
  }

  catchError = (error) => {
    const response = error.response;

    if (response.status === 422) {
      return this.getError(response.data);
    }
  }
}