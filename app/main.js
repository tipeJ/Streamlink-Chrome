// Copyright 2013 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

function launchStream() {
  chrome.runtime.sendMessage({Message: "launchStream"}, function (response) {
    window.close();
  });
}

function launchSpecificStream(url) {
  chrome.runtime.sendMessage({Message: url}, function (response) {
    window.close();
  });
}

function openSettings() {
  chrome.runtime.sendMessage({Message: "prefs"}, function (response) {
    window.close();
  });
  
}

function addFavourite() {
  console.log("BEGINFAVOURITE");
  chrome.storage.local.get(null, function(items) {
    var allKeys = Object.keys(items);
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        var currentUrl = tabs[0].url;
        if (allKeys[currentUrl] == null) {
          chrome.storage.local.set({[currentUrl]: [tabs[0].title]}, function() {
            console.log("Added favourite");
          });
        }
    });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('send-message-button').addEventListener(
      'click', launchStream);
  document.getElementById('settings-button').addEventListener(
    'click', openSettings);
  document.getElementById('add-favourite-button').addEventListener(
    'click', addFavourite);
  chrome.storage.local.get(null, function(items) {
    var allKeys = Object.keys(items);
    var allValues = Object.values(items);
    for (var i = 0; i < allKeys.length; i++) {
      var para = document.createElement("p");

      var link = document.createElement("a");
      link.innerHTML = allValues[i];
      link.setAttribute('href', allKeys[i]);
      link.setAttribute('target', "_blank");
      para.appendChild(link);

      var removeButton = document.createElement("button");
      removeButton.innerHTML = "X";
      para.append(removeButton);

      var playButton = document.createElement("button");
      playButton.addEventListener('click', function(){
        launchSpecificStream(allKeys[i]);
      });
      playButton.innerHTML = ">";
      para.append(playButton);
      
      document.getElementById('favourites-container').appendChild(para);
    }
  });
});

