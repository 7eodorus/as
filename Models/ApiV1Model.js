import BaseModel from "./BaseModel";

export default class ApiV1Model extends BaseModel {
  constructor(domain) {
    const options = {
      domain,
      headers: {
        Accept: "application/json;version=1.1",
        "Content-Type": "application/json",
        pragma: "no-cache",
        "cache-control": "no-cache",
        "x-requested-with" : "XMLHttpRequest",
      }
    };

    super(options);
  }

  catchError = (error) => {
    return Promise.reject({ error: error.message || error });
  };
}