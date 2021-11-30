/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const dataGeneratorRegexp = /data-generator.*/;

module.exports = {
  resolver: {
    blacklistRE: dataGeneratorRegexp,
    blockList: dataGeneratorRegexp,
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};
