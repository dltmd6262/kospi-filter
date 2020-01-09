# KOSPI Golden Cross Finder

## KOSPI golden cross finder written with React, Electron and Rust (for WebAssembly)

Finds stocks with moving averages that are within certain percentages of each other. It also has the option to make sure the 5 day average is the highest, making it easier to spot golden cross.

## Running locally

To run this project, first build the wasm crate using `wasm-pack`:

```
cd ./src/wasm
wasm-pack build
```

Next you must run two dev-servers, one for React and one for Electron. So in one terminal run `npm start` and in another terminal run `npm run electron`.

## Building

To build the electron app, make sure the wasm crate is built and run:

```
npm run build
npm run electron-build
```
