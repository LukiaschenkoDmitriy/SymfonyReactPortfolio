const Encore = require('@symfony/webpack-encore');
const autoprefixer = require('autoprefixer');
const path = require('path');

// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    // directory where compiled assets will be stored
    .setOutputPath('public/build/')
    // public path used by the web server to access the output path
    .setPublicPath('/build')
    // only needed for CDN's or subdirectory deploy
    //.setManifestKeyPrefix('build/')

    /*
     * ENTRY CONFIG
     *
     * Each entry will result in one JavaScript file (e.g. app.js)
     * and one CSS file (e.g. app.css) if your JavaScript imports CSS.
     */
    .addEntry('app', './assets/react/app/app.tsx')

    // When enabled, Webpack "splits" your files into smaller pieces for greater optimization.
    .splitEntryChunks()

    // will require an extra script tag for runtime.js
    // but, you probably want this, unless you're building a single-page app
    .enableSingleRuntimeChunk()

    /*
     * FEATURE CONFIG
     *
     * Enable & configure other features below. For a full
     * list of features, see:
     * https://symfony.com/doc/current/frontend.html#adding-more-features
     */
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    // enables hashed filenames (e.g. app.abc123.css)
    .enableVersioning(Encore.isProduction())

    // configure Babel
    // .configureBabel((config) => {
    //     config.plugins.push('@babel/a-babel-plugin');
    // })

    // enables and configure @babel/preset-env polyfills
    .configureBabelPresetEnv((config) => {
        config.useBuiltIns = 'usage';
        config.corejs = '3.23';
    })

    // enables Sass/SCSS support
    .enableSassLoader()

    // uncomment if you use TypeScript
    .enableTypeScriptLoader()

    // uncomment if you use React
    .enableReactPreset()

    // uncomment to get integrity="..." attributes on your script & link tags
    // requires WebpackEncoreBundle 1.4 or higher
    //.enableIntegrityHashes(Encore.isProduction())

    // uncomment if you're having problems with a jQuery plugin
    //.autoProvidejQuery()

    .addAliases({
        '@app': path.resolve(__dirname, 'assets/react/app'),
        '@components': path.resolve(__dirname, 'assets/react/components'),
        "@api": path.resolve(__dirname, "assets/react/api"),
        "@data": path.resolve(__dirname, "assets/react/data"),
        "@utils": path.resolve(__dirname, "assets/react/utils"),
        "@services": path.resolve(__dirname, "assets/react/services"),
        "@enum": path.resolve(__dirname, "assets/react/enum"),
        '@styles': path.resolve(__dirname, 'assets/react/styles'),
        '@dto': path.resolve(__dirname, 'assets/react/dto'),
        '@repository': path.resolve(__dirname, 'assets/react/repository'),
        '@images': path.resolve(__dirname, 'assets/react/images'),
        '@locales': path.resolve(__dirname, 'assets/react/locales')
    })
    .enablePostCssLoader((options) => {
        options.postcssOptions = {
            plugins: [
                autoprefixer({
                    // Configure Autoprefixer options here
                    // For example, to support the last 2 versions of all browsers:
                    grid: true, // Enable autoprefixing for CSS Grid
                    overrideBrowserslist: ['last 2 versions'],
                }),
            ],
        };
    })
;

module.exports = Encore.getWebpackConfig();
