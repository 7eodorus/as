import { API_V2_MODEL } from '../Helpers/modelConfigurator';

export default class AuthorizedApiService {
  constructor(modelConfigurator) {
    this.apiV2model = modelConfigurator(API_V2_MODEL);
  }

  getUser = ({ token, userId, meta }) => {
    this.apiV2model.setAuthorizationToken(token);

    const metaUri = Array.isArray(meta) && meta.length ? `?meta=${meta.join(',')}` : '';

    return this.apiV2model
      .get(`users/${userId}/${metaUri}`);
  };

  editUser = ({
    token, userId, name, email, gender, birth,
  }) => {
    this.apiV2model.setAuthorizationToken(token);

    const data = {
      ...name !== undefined && { name },
      ...email !== undefined && { email },
      ...gender !== undefined && { gender },
      ...birth !== undefined && { birth },
    };

    return this.apiV2model
      .patch(`users/${userId}`, this.getWrappedData({ id: userId, type: 'users', data }));
  };

  getPhones = ({ token, userId }) => {
    this.apiV2model.setAuthorizationToken(token);

    return this.apiV2model
      .get(`users/${userId}/phones`);
  };

  addPhone = ({
    token, userId, phone, primary,
  }) => {
    this.apiV2model.setAuthorizationToken(token);

    const data = {
      phone,
      user_id: userId,
      ...primary !== undefined && { primary },
    };

    return this.apiV2model
      .post('phones/', this.getWrappedData({ type: 'phones', data }));
  };

  editPhone = ({
    token, phoneId, phone, primary,
  }) => {
    this.apiV2model.setAuthorizationToken(token);

    const data = {
      ...phone !== undefined && { phone },
      ...primary !== undefined && { primary },
    };

    return this.apiV2model
      .patch(`phones/${phoneId}`, this.getWrappedData({ id: phoneId, type: 'phones', data }));
  };

  deletePhone = ({ token, phoneId } = {}) => {
    this.apiV2model.setAuthorizationToken(token);

    return this.apiV2model
      .delete(`phones/${phoneId}`);
  };

  getUserAddresses = ({ token, userId, withIncludes }) => {
    this.apiV2model.setAuthorizationToken(token);

    return this.apiV2model
      .get(`users/${userId}/addresses${withIncludes && '?include=address,city' || ''}`);
  };

  addAddress = ({ token, data }) => {
    this.apiV2model.setAuthorizationToken(token);

    return this.apiV2model
      .post('addresses?include=address,city/', this.getWrappedData({ type: 'addresses', data }));
  };

  editAddress = ({
    token, addressId, address, regionId, locationId, primary,
  }) => {
    this.apiV2model.setAuthorizationToken(token);

    const data = {
      ...address !== undefined && { address },
      ...regionId !== undefined && { region_id: regionId },
      ...locationId !== undefined && { location_id: locationId },
      ...primary !== undefined && { primary },
    };

    return this.apiV2model
      .patch(`addresses/${addressId}`, this.getWrappedData({ id: addressId, type: 'addresses', data }));
  };

  deleteAddress = async ({ token, addressId }) => {
    this.apiV2model.setAuthorizationToken(token);

    return this.apiV2model
      .delete(`addresses/${addressId}`);
  };

  logout = ({ token }) => {
    this.apiV2model.setAuthorizationToken(token);

    return this.apiV2model
      .post('logout/', {});
  };

  getWrappedData = ({ id, type, data }) => ({
    data: {
      ...id !== undefined && { id },
      type,
      attributes: data,
    },
  });
}
