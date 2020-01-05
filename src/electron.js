const electron = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 1000,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    }
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  mainWindow.webContents.openDevTools();
};

app.on("ready", createWindow);

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
