import {
  ApiV1Model,
  ApiV2Model,
  AppV1Model,
  AppV2Model,
} from '../../Models/index';

export const APP_V1_MODEL = 'APP_V1_MODEL';
export const APP_V2_MODEL = 'APP_V2_MODEL';
export const API_V1_MODEL = 'API_V1_MODEL';
export const API_V2_MODEL = 'API_V2_MODEL';

const getEnvironment = () => {
  const select = () => {
    const environments = ['LOCAL', 'DEMO', 'MASTER', 'PROD', 'QA', 'QA1', 'QA2', 'QA3', 'QA4', 'QA5', 'QA6', 'QA7', 'QA8', 'QA9'];
    const result = environments.filter((env) => {
      const key = `REACT_APP_CAKE_${env}`;

      return process.env[key] && process.env[key] === document.location.origin;
    });

    return result[0] || 'LOCAL';
  };

  return select();
};


export const modelConfigurator = (type) => {
  const environment = getEnvironment();

  switch (type) {
    case APP_V1_MODEL:
      return new AppV1Model(process.env[`REACT_APP_CAKE_${environment}`]);
    case APP_V2_MODEL:
      return new AppV2Model(process.env[`REACT_APP_V2_${environment}`]);
    case API_V1_MODEL:
      return new ApiV1Model(process.env[`REACT_APP_API1_${environment}`]);
    case API_V2_MODEL:
      return new ApiV2Model(process.env[`REACT_APP_API2_${environment}`]);
    default:
      throw Error('Undefined model type');
  }
};
