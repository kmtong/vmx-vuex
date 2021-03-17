module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    "moduleFileExtensions": [
        "ts",
        "js",
        "json",
        // tell Jest to handle `*.vue` files
        "vue"
    ],
    "transform": {
        // process `*.vue` files with `vue-jest`
        ".*\\.(vue)$": "vue-jest",
        // process `*.js` files with `babel-jest`
        ".*\\.([tj]s)$": "babel-jest"
    }
};

