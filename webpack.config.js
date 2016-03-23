module.exports = { 
  entry: "./flux.js",
  output: {
    filename: "fluxbundle.js",
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel",
        query: {
       	     presets: ['react', 'es2015']
     	 }
      }
    ],
  },
}
