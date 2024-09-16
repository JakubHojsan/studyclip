// craco.config.js
module.exports = {
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
        ["@babel/plugin-proposal-private-property-in-object", { "loose": true }],
      ],
    },
  },
}