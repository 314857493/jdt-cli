module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  extends: ["plugin:vue/vue3-essential", "eslint:recommended"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "import/no-dynamic-require": "off",
    "no-underscore-dangle": 0,
    "no-param-reassign": ["error", { props: false }],
    //   "vue/script-setup-uses-vars": 0,
  },
};
