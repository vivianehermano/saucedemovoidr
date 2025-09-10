export const environments = {
  dev: {
    baseURL: 'https://www.saucedemo.com',
    timeout: 30000,
    retries: 1,
  },
  staging: {
    baseURL: 'https://staging.saucedemo.com',
    timeout: 45000,
    retries: 2,
  },
  prod: {
    baseURL: 'https://www.saucedemo.com',
    timeout: 60000,
    retries: 3,
  },
};

export function getEnvironment(env = 'dev') {
  return environments[env] || environments.dev;
}

export const currentEnv = getEnvironment(process.env.NODE_ENV || 'dev');
