import {API_V1_MODEL, APP_V1_MODEL} from '../Helpers/modelConfigurator';

export default class UnauthorizedApiService {
  constructor(modelConfigurator) {
    this.apiV1model = modelConfigurator(API_V1_MODEL);
    this.appV1model = modelConfigurator(APP_V1_MODEL);
  }

  getGuestMeta = () => this.apiV1model.get('session/office/');

  resetPassword = ({
    token, password,
  }) => this.appV1model.post('gateway/api/session/', {
    route: 'password/reset', parameters: { token, password },
  });

  login = ({
    email, password,
  }) => this.appV1model.post('users/login/', { User: { email: email.trim(), password } });
}
