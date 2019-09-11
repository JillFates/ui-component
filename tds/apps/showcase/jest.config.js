module.exports = {
  name: 'showcase',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/showcase',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
