# TDS Component Library

Contains the ui-components library and showcase application.

This project was generated with [NX DEV tools](https://github.com/nrwl/nx) version 8.2.0.

## Getting Started

## Docker 

To have Docker installed on your environment, follow the steps below to begin development on the library.

1. docker build --no-cache=true -t ui-components:latest .
1. docker run -i -t -p 5200:5200 -p 80:80 ui-components:latest 

## Publish a new Lib Version
In order to publish a new version, the libs/tds-component-library/package.json

1. update version
1. execute `npm run package`

A tgz file is created under /dist/libs/tds-component-library.

To be able to test library:

###### Development && Testing

```
  {
    dependencies: {
        "tds-component-library": "file: ../ui-components/dist/libs/tds-component-library/tds-component-library-0.0.1.tgz",
    }
  }
```

###### QA && Production

Point to the uploaded tgz file

```
  {
    dependencies: {
        "tds-component-library": "https://tm-nexus.transitionmanager.net/repository/npm/tds-component-library/-/tds-component-library-0.0.1.tgz",
    }
  }
```

