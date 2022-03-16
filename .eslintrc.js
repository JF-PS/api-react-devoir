module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  root: true,
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: { project: ["./tsconfig.json"] },
  plugins: ["@typescript-eslint"],
  rules: {
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/no-explicit-any": ["off"],
    "@typescript-eslint/strict-boolean-expressions": 0,
  },
  ignorePatterns: ["src/**/*.test.ts", "src/frontend/generated/*"],
};
