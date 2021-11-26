const appConfig = require('./src/app.config.js');
// const path = require('path');
// const svgFilePath = path.join(__dirname, './src/assets/svg');

console.log('--- app config ---');
console.log(appConfig);
const isServer = process.argv.includes('--server');

let platformChainWebpack = isServer
    ? config => {
          config.plugins.delete('html');
          config.plugins.delete('preload');
          config.plugins.delete('prefetch');
      }
    : config => {
          config.plugin('html').tap(options => {
              options[0].minify = false;
              return options;
          });
      };

let configureWebpack = isServer
    ? {
          target: 'node',
          entry: { app: './src/entry-server.js' },
          output: { filename: 'js/server-bundle.js', libraryExport: 'default', libraryTarget: 'commonjs2' },
          optimization: { splitChunks: false },
          // plugins: [
          //     new webpack.IgnorePlugin(/^electron$/)
          // ],
      }
    : {
          entry: { app: './src/entry-client.js' },
      };

module.exports = {
    filenameHashing: false,
    productionSourceMap: false,
    configureWebpack,
    chainWebpack: config => {
        config.plugin('define').tap(options => {
            options[0]['process.isClient'] = !isServer;
            options[0]['process.isServer'] = isServer;
            return options;
        });

        platformChainWebpack(config);

        if (!appConfig.usePWA || isServer) {
            config.plugins.delete('pwa');
            config.plugins.delete('workbox');
        }
    },

    publicPath: appConfig.routerHashMode ? '' : '/',
    outputDir: appConfig.build.outputDir,

    /*
    css: {
        loaderOptions: {
            scss: {
                prependData: appConfig.scssData,
            },
        },
    },
*/

    pwa: {
        name: appConfig.pwa.name,
        themeColor: appConfig.pwa.mainColor,
        msTileColor: appConfig.pwa.mainColor,
        assetsVersion: appConfig.pwa.assetsVersion,
        manifestOptions: {
            background_color: appConfig.pwa.mainColor,
        },
        workboxOptions: {
            skipWaiting: true,
        },
    },

    /*
    pluginOptions: {
        i18n: {
            locale: 'en',
            fallbackLocale: 'en',
            localeDir: 'locales',
            enableInSFC: false,
        },
    },
*/

    // chainWebpack: config => {
    //     // sets page title
    //     config.plugin('html').tap(_args => {
    //         _args[0].title = appConfig.title;
    //         _args[0].description = appConfig.description;
    //         _args[0].keywords = appConfig.keywords;
    //         _args[0].favicon = appConfig.favicon;
    //         _args[0].imageUrl = appConfig.imageUrl || '';
    //         return _args;
    //     });

    //     if (!appConfig.usePWA) {
    //         config.plugins.delete('pwa');
    //         config.plugins.delete('workbox');
    //     }
    // },

    devServer: {
        host: '0.0.0.0',
        disableHostCheck: true,
    },
};
