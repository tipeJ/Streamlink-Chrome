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
      removeButton.addEventListener('click', function(){
        chrome.storage.local.remove(allKeys[i], function(){
          
        });
      });
      removeButton.className = "favourite-remove fas fa-times"
      para.append(removeButton);

      var playButton = document.createElement("button");
      playButton.addEventListener('click', function(){
        launchSpecificStream(allKeys[i]);
      });
      playButton.className = "favourite-play fas fa-play"
      para.append(playButton);
    }
  });
});

