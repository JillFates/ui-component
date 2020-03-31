module.exports = {
  name: 'tds-component-library',
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.html$',
      astTransformers: [
        'jest-preset-angular/build/InlineFilesTransformer',
        'jest-preset-angular/build/StripStylesTransformer'
      ],
    },
  },
  preset: 'jest-preset-angular',
  moduleFileExtensions: ['ts', 'html', 'js', 'json'],
  coverageDirectory: '../../coverage/libs/tds-component-library',
  transformIgnorePatterns: ['node_modules/(?!@ngrx)'],
  snapshotSerializers: [
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
  setupFilesAfterEnv: ['<rootDir>/setupJest.ts'],
  reporters: [
    'default',
    ['./node_modules/jest-html-reporter',
    {
      pageTitle: process.env.JEST_REPORTER_TITLE || 'UI Components test suite results',
      outputPath: process.env.JEST_REPORTER_OUTPUT_PATH || 'test-report/index.html',
      includeFailureMsg: false
    }]
  ]
};
