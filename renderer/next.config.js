
module.exports = {
  images: {
    // loader: 'custom',
    // loaderFile: './loader.js',
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.target = 'electron-renderer';
      
    }
    config.resolve.fallback = {
      "mongodb-client-encryption": false ,
      "aws4": false,
      "snappy": false,
      'gcp-metadata': false,
      'kerberos' : false,
      '@aws-sdk/credential-providers' : false,
      '@mongodb-js/zstd' : false,
      
    };
    
    return config;
  },
};
