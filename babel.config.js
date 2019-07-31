module.exports = api => {
  const isTest = api.env('test');
  if (isTest) {
    return {
      presets: [
        ['@babel/preset-env', {
          targets: {
            node: 'current'
          }
        }], '@babel/preset-react']
    };
  } else {
    return {
      presets: [
        '@babel/preset-env', 
        '@babel/preset-react'
      ]
    };
  }
};
