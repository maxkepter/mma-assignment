const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Thêm react-native-maps vào danh sách gói cần được Babel transform
// để xử lý private class fields trước khi Hermes xử lý
const { transformer, resolver } = config;

config.transformer = {
  ...transformer,
  unstable_allowRequireContext: true,
};

// Cấu hình để Metro transform node_modules của react-native-maps
config.resolver = {
  ...resolver,
  unstable_enablePackageExports: true,
};

module.exports = config;
