import path from 'path';
// import BrowserSyncPlugin from 'browser-sync-webpack-plugin';

export default {
  debug: true,
  devtool: 'inline-source-map',
  noInfo: false,
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
  ],
  module: {
    preLoaders: [
      { test: /\.json$/, loader: 'json-loader'},
    ],
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loaders: ['style','css']}
    ]
  },
  node: {
    console: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    node: 'empty'
  }
}
