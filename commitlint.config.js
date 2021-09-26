{
  husky: {
    hooks: {
      'pre-commit': "lint-staged"
    }
  },
  "lint-staged": {
    "src/**/*.js": "prettier --write --ignore-unknown"
  }
}