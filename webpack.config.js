const path = require('path');
const nodeExternals = require('webpack-node-externals');
const pkg = require('./package.json');

module.exports = (env, argv) => {
    const isProd = env ? !!env.prod : false;

    return {
        target: 'node',
        externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
        context: path.resolve(__dirname, 'src'),
        optimization: {
            usedExports: true
        },
        resolve: {
            extensions: ['.json', '.js', '.jsx', '.css', '.scss']
        },
        devtool: isProd ? '' : 'eval-cheap-module-source-map',
        entry: ['./index.js'],
        output: {
            filename: '[name].js',
            chunkFilename: '[name].js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/',
            library: pkg.name,
            libraryTarget: 'commonjs',
            globalObject: 'this'
        },
        mode: isProd ? 'production' : 'development',
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    use: ['babel-loader', 'shebang-loader'],
                    exclude: /node_modules/,
                }
            ]
        }
    };
};
