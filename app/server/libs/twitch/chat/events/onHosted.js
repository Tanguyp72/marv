const pushActions = require("../../pushActions");

module.exports = function onHosted(channel, byChannel, auto, viewers) {
  console.log(">>> onHosted:", { channel, byChannel, auto, viewers });
  pushActions("onHosted", {
    channel: byChannel,
    viewerCount: viewers || "???",
  });
};
