import { API_V2_MODEL } from '../Helpers/modelConfigurator';

export default class PublicApiService {
  constructor(modelConfigurator) {
    this.apiV2model = modelConfigurator(API_V2_MODEL);
  }

  getSummaryInfo = ({ token }) => {
    this.apiV2model.setOAuthToken(token);

    return this.apiV2model
      .get('info.summary/');
  };

  register = ({ token, email }) => {
    this.apiV2model.setOAuthToken(token);

    return this.apiV2model
      .post('registration/', { email: email.trim() });
  };

  prepareResetPassword = ({ token, email }) => {
    this.apiV2model.setOAuthToken(token);

    return this.apiV2model
      .post('password/prepare-reset/', { email: email.trim() });
  };

  checkResetToken = ({ token, resetPasswordToken }) => {
    this.apiV2model.setOAuthToken(token);

    return this.apiV2model
      .get('password/reset-check', { token: resetPasswordToken });
  };

  subscribe = ({ token, email }) => {
    this.apiV2model.setOAuthToken(token);

    return this.apiV2model
      .post('subscription/', { email: email.trim() });
  };

  setFeedback = ({ token, type, attributes }) => {
    this.apiV2model.setOAuthToken(token);

    return this.apiV2model
      .post('feedback/', { data: { type, attributes } });
  };

  getLocationsCities = ({ token, cityName }) => {
    this.apiV2model.setOAuthToken(token);

    if (cityName.length < 2) {
      return Promise.reject('min city length 2 symbol');
    }

    return this.apiV2model
      .get(`locations.cities?q=${cityName}`);
  };

  getLocationsAddresses = ({ token, address, cityId }) => {
    this.apiV2model.setOAuthToken(token);

    if (address.length < 2) {
      return Promise.reject('min address length 2 symbol');
    }

    return this.apiV2model
      .get(cityId ? `locations.addresses?q=${address}&city_id=${cityId}` : `locations.ones?q=${address}`);
  };
}
