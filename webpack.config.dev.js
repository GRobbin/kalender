import path from 'path';
import webpack from 'webpack';
// import BrowserSyncPlugin from 'browser-sync-webpack-plugin';

export default {
  devtool: 'inline-source-map',
  entry: [
    path.resolve(__dirname, 'src/index')
  ],
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'src'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
  //   new BrowserSyncPlugin({
  //     // browse to http://localhost:3000/ during development,
  //     // ./public directory is being served
  //     host: 'localhost',
  //     port: 3001,
  //     proxy: 'http://localhost:3000/',
  //     files: [
  //       "./src/*.html",
  //     ],
  //     open: false // do not automatically open browser
  //   },
  //   {
  //     // prevent BrowserSync from reloading the page
  //     // and let Webpack Dev Server take care of this
  //     reload: false
  //   }
  // )
  new webpack.LoaderOptionsPlugin({
    debug: true
  })
  ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader']},
      {test: /\.css$/, loaders: ['style-loader','css-loader']},
      {test: /\.json$/, loader: 'json-loader'}
    ]
  },
  node: {
    console: false,
    global: true,
    process: true,
    Buffer: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    __filename: "mock",
    __dirname: "mock",
    setImmediate: true
  }
}
