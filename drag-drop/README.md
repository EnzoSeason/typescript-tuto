# TypeScript Deep Dive

## Init

1. `npm init`: enable using third-party library
2. `npm install --save-dev lite-server`: init lite-server
    
    In `package.json`, insert following line.
    This line enables to start lite-server by the command `npm run start`
    ```json
    "scripts": {
        // other config
        "start": "lite-server" // insert this line
    },
    ```
3. `tsc --init`: init `tsconfig.json`

4. `npm install --save-dev webpack webpack-cli webpack-dev-server typescript ts-loader`: for webpack
    
    In `package.json`, insert following line. `npm run build`: create `bundle.js`
    ```json
    "scripts": {
        // other config
        "build": "webpack" // insert this line
    },
    ```

## Install

1. `npm install`: install dependencies (node module)
2. `npm run start`: start lite-server
3. `tsc -w`: compile typescript to javascript on the fly
4. `npm run build`: use webpack to create `bundle.js`