// Copyright 2013 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

function launchStream() {
  chrome.runtime.sendMessage({Message: "launchStream"}, function (response) {
    window.close();
  });
}

function openSettings() {
  chrome.runtime.sendMessage({Message: "prefs"}, function (response) {
    window.close();
  });
  
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('send-message-button').addEventListener(
      'click', launchStream);
    document.getElementById('settings-button').addEventListener(
      'click', openSettings);
});
