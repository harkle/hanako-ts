module.exports = function (api) {
  api.cache(true);

  return {
    "presets": [
      ["@babel/env", { "targets": "> 0.25%", "useBuiltIns": "usage" }],
      "@babel/preset-react",
      ["@babel/preset-typescript", { "allExtensions": true, "isTSX": true }],

    ],
    "plugins": [
      "@babel/plugin-syntax-dynamic-import",
      "@babel/proposal-class-properties",
      "@babel/proposal-object-rest-spread"
    ]
  }
}
