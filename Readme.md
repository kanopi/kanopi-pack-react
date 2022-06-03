Kanopi Pack - React Support
======

The Kanopi Pack React module adds support to Webpack for React development and linting. React and associated libraries (i.e. React DOM) **are NOT** included in this package. The intent is for each front-end application to select the appropriate version (React 16.13+, 17+, 18+) for their use case.

# Linting Support

Kanopi Pack offers JSX/TSX linting support out of the box, though an ESLint configuration is required. ESLint configurations are scoped within a particular directory. If you place all of your React apps in the `./assets/src/react` folder, ensure there is an `.eslintrc.js` file there, or in a directory above it. 