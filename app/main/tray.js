const getTrayIconByPlatform = require("./window/trayIcon");
const { staticPath, fingerprint } = require("../utils");
const { getServerURL } = require("../server/utils");
const mainWindow = require("./window/mainWindow");
const chatWindow = require("./window/chatWindow");
const { _ } = require("../server/libs/i18next");
const { Tray, Menu } = require("electron");
const capitalize = require("capitalize");
const stores = require("../stores");
const quit = require("./quit");
const path = require("path");
const open = require("open");

const icon = getTrayIconByPlatform();

let tray = null;

function openInBrowser() {
  open(getServerURL());
}

function createMenu() {
  return Menu.buildFromTemplate([
    { label: fingerprint, enabled: false },
    { type: "separator" },
    {
      label: _("sentences.open-in-browser"),
      click: () => openInBrowser(),
    },
    {
      label: _("sentences.open-in-window"),
      click: () => mainWindow(),
    },
    {
      label: _("sentences.open-twitch-chat-window"),
      click: () => {
        chatWindow({ channel: stores.twitch.get("chatWindow.channel", "") });
      },
    },
    { type: "separator" },
    { label: capitalize(_("words.quit")), click: () => quit() },
  ]);
}

function createTray() {
  tray = new Tray(path.join(staticPath, icon));

  tray.setToolTip(fingerprint);
  tray.on("click", mainWindow);
  tray.setContextMenu(createMenu());
  tray.setIgnoreDoubleClickEvents(true);

  return tray;
}

module.exports = () => tray || createTray();
