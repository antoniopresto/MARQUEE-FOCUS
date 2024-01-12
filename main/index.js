"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Native
const path_1 = require("path");
const url_1 = require("url");
// import sound from 'sound-play';
// const soundPath = path.resolve(__dirname, '../assets/sunrise-114326.mp3');
// const navIconPath = path.resolve(__dirname, '../assets/naviconTemplate.png');
// Packages
const electron_1 = require("electron");
const electron_is_dev_1 = __importDefault(require("electron-is-dev"));
const electron_next_1 = __importDefault(require("electron-next"));
let W_WIDTH = 1000;
const W_HEIGHT = 100;
let win;
// let tray: Tray;
// Prepare the renderer once the app is ready
electron_1.app.on('ready', async () => {
    await (0, electron_next_1.default)('./renderer');
    win = new electron_1.BrowserWindow({
        width: W_WIDTH,
        height: W_HEIGHT,
        minWidth: W_WIDTH,
        minHeight: W_HEIGHT,
        alwaysOnTop: true,
        autoHideMenuBar: true,
        frame: false,
        titleBarStyle: 'hidden',
        titleBarOverlay: false,
        skipTaskbar: true,
        resizable: false,
        transparent: true,
        closable: false,
        // focusable: false,
        movable: true,
        hasShadow: false,
        maximizable: false,
        visualEffectState: 'inactive',
        minimizable: false,
        // hiddenInMissionControl: true,
        // modal: true,
        opacity: 1,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: false,
            preload: (0, path_1.join)(__dirname, 'preload.js'),
        },
    });
    const primaryDisplay = electron_1.screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.workAreaSize;
    W_WIDTH = width;
    win.setBounds({ width: W_WIDTH, height: W_HEIGHT });
    // const randoms = [
    //   {
    //     x: 0,
    //     y: 0,
    //   },
    //   {
    //     x: Math.floor((width - W_WIDTH) / 2),
    //     y: Math.floor((height - W_HEIGHT) / 2),
    //   },
    //   {
    //     x: Math.floor((width - W_WIDTH) / 4),
    //     y: Math.floor((height - W_HEIGHT) / 3),
    //   },
    //   {
    //     x: Math.floor((width - W_WIDTH) / 3),
    //     y: Math.floor((height - W_HEIGHT) / 4),
    //   },
    //   {
    //     x: Math.floor(width - W_WIDTH),
    //     y: Math.floor(height - W_HEIGHT),
    //   },
    // ];
    const positions = [
        {
            x: Math.floor(width / 2 - W_WIDTH / 2),
            y: 100,
        },
        {
            x: Math.floor(width / 2 - W_WIDTH / 2),
            y: Math.floor(height - W_HEIGHT) - 100,
        },
    ];
    let posIndex = 1;
    win.setBounds(positions[posIndex]);
    win.setAlwaysOnTop(true, 'screen-saver'); // - 2 -
    win.setVisibleOnAllWorkspaces(true);
    const url = electron_is_dev_1.default
        ? 'http://localhost:8000/'
        : (0, url_1.format)({
            pathname: (0, path_1.join)(__dirname, '../renderer/out/index.html'),
            protocol: 'file:',
            slashes: true,
        });
    await win.loadURL(url);
    electron_1.ipcMain.on('goToPosition', () => {
        posIndex = posIndex === 1 ? 0 : 1;
        win.setBounds(positions[posIndex]);
    });
    let show = true;
    electron_1.globalShortcut.register('CommandOrControl+0', () => {
        show = !show;
        if (show) {
            win.show();
        }
        else {
            win.hide();
        }
    });
    electron_1.globalShortcut.register('CommandOrControl+Shift+i', () => {
        console.log('command+i');
        win.focus();
        win.webContents.send('command+i');
    });
    electron_1.app.dock.hide();
});
electron_1.app.on('will-quit', () => {
    // Unregister all shortcuts.
    electron_1.globalShortcut.unregisterAll();
});
// Quit the app once all windows are closed
// app.on('window-all-closed', app.quit);
// // listen the channel `message` and resend the received message to the renderer process
// ipcMain.on('message', (event: IpcMainEvent, message: any) => {
//   console.log(message);
//   setTimeout(() => event.sender.send('message', 'hi from electron'), 500);
// });
//
// // listen the channel `message` and resend the received message to the renderer process
// ipcMain.on('showQuote', async (_event: IpcMainEvent, title = randomQuote()) => {
//   console.log('showQuote received');
//
//   win.setTitle(title);
//
//   const W_WIDTH = 380 * 2;
//   const W_HEIGHT = 300 * 2;
//
//   const alertWindow = new BrowserWindow({
//     title,
//     width: W_WIDTH,
//     height: W_HEIGHT,
//     alwaysOnTop: true,
//     webPreferences: {
//       nodeIntegration: false,
//       contextIsolation: false,
//       preload: join(__dirname, 'preload.js'),
//     },
//   });
//
//   const primaryDisplay = screen.getPrimaryDisplay();
//   const { width, height } = primaryDisplay.workAreaSize;
//
//   alertWindow.setBounds({
//     width: W_WIDTH,
//     height: W_HEIGHT,
//     x: Math.floor(width / 2 - W_WIDTH / 2),
//     y: Math.floor(height / 2 - W_HEIGHT / 2),
//   });
//
//   setTimeout(() => {
//     alertWindow.close();
//   }, 30000);
//
//   try {
//     await sound.play(soundPath, 1);
//   } catch (e) {
//     console.error(e);
//   }
// });
//
// ipcMain.on('setTitle', async (_event: IpcMainEvent, title = randomQuote()) => {
//   console.log('setTitle received');
//   win.setTitle(title);
// });
