// Copyright 2013 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var port = null;

function launchStream() {
  chrome.runtime.sendMessage({Message: "launchStream"}, function (response) {
  });
  window.close();
}

function openSettings() {
  message = {
    "url": "prefs",
    "quality": ''
  };
  port.postMessage(message);
  window.close();
}

function onNativeMessage(message) {
  // appendMessage("Received message: <b>" + JSON.stringify(message) + "</b>");
}

function onDisconnected() {
  // appendMessage("Failed to connect: " + chrome.runtime.lastError.message);
  port = null;
}

function connect() {
  var hostName = "com.google.chrome.example.echo";
  port = chrome.runtime.connectNative(hostName);
  port.onMessage.addListener(onNativeMessage);
  port.onDisconnect.addListener(onDisconnected);
}

document.addEventListener('DOMContentLoaded', function () {
  connect();
  document.getElementById('send-message-button').addEventListener(
      'click', launchStream);
      document.getElementById('settings-button').addEventListener(
        'click', openSettings);
});
