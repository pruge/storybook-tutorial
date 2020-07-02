const path = require('path');

const makePath = (rest) => {
  return path.join(__dirname, rest);
};

module.exports = {
  stories: ['../src/**/*.stories.(ts|tsx|js|jsx|mdx)'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-knobs/register',
    '@storybook/addon-docs',
  ],
  webpackFinal: (config) => {
    // alias
    config.resolve.alias['@components'] = makePath('../src/components');

    // typescript docgen
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [['react-app', { flow: false, typescript: true }]],
          },
        },
        require.resolve('react-docgen-typescript-loader'),
      ],
    });

    // typescript pug
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        'babel-loader',
        {
          loader: 'webpack-preprocessor-pug-tsx',
          options: {
            includes: [],
          },
        },
      ],
    });
    config.resolve.extensions.push('.ts', '.tsx');

    return config;
  },
};
