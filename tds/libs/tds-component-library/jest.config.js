module.exports = {
  name: 'tds-component-library',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/tds-component-library',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
