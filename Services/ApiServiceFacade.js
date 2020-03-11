import { modelConfigurator } from './Helpers/modelConfigurator';

import {
  OAuthApiService,
  PublicApiService,
  AuthorizedApiService,
  UnauthorizedApiService,
} from './Proxies/index';

class ApiServiceFacade {
  constructor() {
    this.oAuthApiService = new OAuthApiService(modelConfigurator);
    this.publicApiService = new PublicApiService(modelConfigurator);
    this.authorizedApiService = new AuthorizedApiService(modelConfigurator);
    this.unauthorizedApiService = new UnauthorizedApiService(modelConfigurator);
  }

  /* ************************************ UNAUTHORIZED ROUTES *********************************** */
  getGuestMeta = () => this.unauthorizedApiService.getGuestMeta();

  resetPassword = ({
    token, password,
  }) => this.unauthorizedApiService.resetPassword({
    token, password,
  });

  login = ({ email, password }) => this.unauthorizedApiService.login({ email, password });
  /* ************************************ UNAUTHORIZED ROUTES *********************************** */


  /* ************************************* AUTHORIZED ROUTES ************************************ */
  getUser = ({ token, userId, meta }) => this.authorizedApiService.getUser({ token, userId, meta });

  editUser = ({
    token, userId, name, email, gender, birth,
  }) => this.authorizedApiService.editUser({
    token, userId, name, email, gender, birth,
  });

  getPhones = ({ token, userId }) => this.authorizedApiService.getPhones({ token, userId });

  addPhone = ({
    token, userId, phone, primary,
  }) => this.authorizedApiService.addPhone({
    token, userId, phone, primary,
  });

  editPhone = ({
    token, phoneId, phone, primary,
  }) => this.authorizedApiService.editPhone({
    token, phoneId, phone, primary,
  });

  deletePhone = ({ token, phoneId }) => this.authorizedApiService.deletePhone({ token, phoneId });

  getUserAddresses = ({
    token, userId, withIncludes,
  }) => this.authorizedApiService.getUserAddresses({
    token, userId, withIncludes,
  });

  addAddress = ({
    token, data,
  }) => this.authorizedApiService.addAddress({
    token, data,
  });

  // @TODO перепроверить после задачи Изяна
  editAddress = ({
    token, addressId, address, regionId, locationId, primary,
  }) => this.authorizedApiService.editAddress({
    token, addressId, address, regionId, locationId, primary,
  });

  deleteAddress = ({
    token, addressId,
  }) => this.authorizedApiService.deleteAddress({
    token, addressId,
  });

  logout = ({ token }) => this.authorizedApiService.logout({ token });
  /* *********************************** END AUTHORIZED ROUTES ********************************** */

  /* *************************************** OAUTH ROUTES *************************************** */
  getOAuthToken = () => this.oAuthApiService.getOAuthToken();
  /* ************************************* END OAUTH ROUTES ************************************* */

  /* ************************************** PUBLIC ROUTES *************************************** */
  getSummaryInfo = ({ token }) => this.publicApiService.getSummaryInfo({ token });

  register = ({ token, email }) => this.publicApiService.register({ token, email });

  prepareResetPassword = ({
    token, email,
  }) => this.publicApiService.prepareResetPassword({
    token, email,
  });

  checkResetToken = ({
    token, resetPasswordToken,
  }) => this.publicApiService.checkResetToken({
    token, resetPasswordToken,
  });

  subscribe = ({ token, email }) => this.publicApiService.subscribe({ token, email });

  setFeedback = ({
    token, type, attributes,
  }) => this.publicApiService.setFeedback({
    token, type, attributes,
  });

  getLocationsCities = ({
    token, cityName,
  }) => this.publicApiService.getLocationsCities({
    token, cityName,
  });

  getLocationsAddresses = ({
    token, address, cityId,
  }) => this.publicApiService.getLocationsAddresses({
    token, address, cityId,
  });
  /* ************************************ END PUBLIC ROUTES ************************************* */
}

const api = new ApiServiceFacade();
export default api;
