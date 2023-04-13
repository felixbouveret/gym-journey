module.exports = {
  expo: {
    name: 'Gym Journey',
    slug: 'gym-journey',
    version: '1.0.1',
    orientation: 'portrait',
    icon: './src/assets/images/icon.png',
    scheme: 'myapp',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './src/assets/images/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff'
    },
    updates: {
      fallbackToCacheTimeout: 0,
      url: 'https://u.expo.dev/38f69a33-3988-4ee4-9ef2-5ea1f6775e60'
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.felixbvt.gymjourney'
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './src/assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff'
      }
    },
    web: {
      favicon: './assets/images/favicon.png'
    },
    extra: {
      eas: {
        projectId: '38f69a33-3988-4ee4-9ef2-5ea1f6775e60'
      }
    },
    runtimeVersion: {
      policy: 'sdkVersion'
    },
    plugins: ['sentry-expo'],
    hooks: {
      postPublish: [
        {
          file: 'sentry-expo/upload-sourcemaps',
          config: {
            organization: process.env.SENTRY_ORG,
            project: process.env.SENTRY_PROJECT,
            authToken: process.env.SENTRY_AUTH_TOKEN
          }
        }
      ]
    }
  }
};
