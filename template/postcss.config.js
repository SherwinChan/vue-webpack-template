module.exports = {
  // sourceMap: true,
  plugins: [
    // require('autoprefixer'),    
    require('postcss-cssnext')({
      browsers: ['ie>=8', '> 0.1%']
    })
  ]
}