import { APP_V2_MODEL } from '../Helpers/modelConfigurator';

export default class OAuthApiService {
  constructor(modelConfigurator) {
    this.appV2model = modelConfigurator(APP_V2_MODEL);
  }

  getOAuthToken = () => {
    const
      grant_type = process.env.REACT_APP_GRANT_TYPE,
      client_id = process.env.REACT_APP_CLIENT_ID,
      client_secret = process.env.REACT_APP_CLIENT_SECRET
    ;

    return this.appV2model
      .post('oauth/token/', { grant_type, client_id, client_secret })
    ;
  };
}
