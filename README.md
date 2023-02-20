# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading and checkout

```
git clone https://github.com/fructus0/nodejs2022Q4-service.git
```

After clone, run next command to get to actual code
```
git checkout development
```

## Installing NPM modules

```
npm install
```

## Running application

***!!! Before running, you need to create a `.env` file and copy the contents of `.env.example` into it***

___

***Once this has been done, the following command will run the application and generate documentation:***

```
npm start
```

## Developing

To automate the restart of the application, when changing files - you should use the following command:

```
npm run start:dev
```

## Documentation

After starting the app on port (4000 as default port in `.env`) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```
