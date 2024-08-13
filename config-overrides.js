module.exports = function override(config, env) {
  console.log("override");
  let loaders = config.resolve;
  loaders.fallback = {
    crypto: require.resolve("crypto-browserify"),
    buffer: require.resolve("buffer/"),
    stream: require.resolve("stream-browserify"),
    util: require.resolve("util/"),
    "process/browser": require.resolve("process/browser"),
  };
  return config;
};
