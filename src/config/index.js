const config = {
  production: {
    APP_PORT: '4001',
    APP_SECRET: 'someappsecrethere',
  },
  development: {
    APP_PORT: '4001',
    APP_SECRET: 'someappsecrethere',
  },
  default: {
    APP_PORT: '4001',
    APP_SECRET: 'someappsecrethere',
  },
};

exports.get = function get(env) {
  return config[env] || config.default;
};
