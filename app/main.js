// Copyright 2013 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Launches current tab url in streamlink
function launchStream() {
  chrome.runtime.sendMessage({Message: "launchStream"}, function (response) {
    window.close();
  });
}

// Launch specific URL from favourites
const launchSpecificStream = function (event) {
  const button = event.target;
  var key = button.getAttribute("key");
  console.log("KEY: " + key);
  chrome.runtime.sendMessage({Message: key}, function (response) {
    window.close();
  });
}

function openSettings() {
  chrome.runtime.sendMessage({Message: "prefs"}, function (response) {
    window.close();
  });
  
}

// Adds url to favourites
function addFavourite() {
  chrome.storage.local.get(null, function(items) {
    var allKeys = Object.keys(items);
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        var currentUrl = tabs[0].url;
        if (allKeys[currentUrl] == null) {
          var obj = {};
          obj[currentUrl] = tabs[0].title;
          chrome.storage.local.set(obj);
        }
    });
  });
}

// Removes url from favourites
const removeFavourite = function (event) {
  const button = event.target;
  var key = button.getAttribute("key");
  chrome.storage.local.remove([key]);
}

// Add the content for the main extension screen.
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('launch-button').addEventListener(
      'click', launchStream);
  document.getElementById('settings-button').addEventListener(
    'click', openSettings);
  document.getElementById('add-favourite-button').addEventListener(
    'click', addFavourite);
  chrome.storage.local.onChanged.addListener(function(changes, namescape) {
    location.reload();
  });
  chrome.storage.local.get(null, function(items) {
    var allKeys = Object.keys(items);
    var allValues = Object.values(items);
    for (var i = 0; i < allKeys.length; i++) {
      var para = document.getElementById('maingrid');

      var link = document.createElement("a");
      link.innerHTML = allValues[i];
      link.setAttribute('href', allKeys[i]);
      link.setAttribute('target', "_blank");
      link.className = "favourite-link";
      para.appendChild(link);

      var removeButton = document.createElement("button");
      removeButton.id = "remove_" + i;
      removeButton.className = "favourite-remove fas fa-times"
      removeButton.setAttribute("key", allKeys[i]);

      removeButton.addEventListener('click', removeFavourite);
      para.append(removeButton);

      var playButton = document.createElement("button");
      playButton.setAttribute("key", allKeys[i]);
      playButton.addEventListener('click', launchSpecificStream);
      playButton.className = "favourite-play fas fa-play"
      para.append(playButton);
    }
  });
});

