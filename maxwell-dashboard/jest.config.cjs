// jest.config.cjs
module.exports = {
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'jsx'],
transform: {
  '^.+\\.jsx?$': 'babel-jest',
  '^.+\\.svg$': '<rootDir>/tests/__mocks__/svgTransform.cjs'
},
moduleNameMapper: {
  '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
}
}
