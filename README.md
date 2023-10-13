# Streamlink-Chrome

## What is this?

A Chrome extension for opening livestreams via streamlink, from your browser.

## Features

Currently used via extension's main.html, which can be used to launch an url. Automatically selects best available quality for stream. Adjusting quality will be added in the future.

## Installation
If you are on Linux, replace the "native-messaging-example-host.sh" with the absolute path of the script in your system in the JSON field "path" in host/com.google.chrome.tipej.streamlinkchrome.json.


Run the host installation script in host folder after extraction. (.bat file for windows, .sh file for linux)

Install Streamlink and Python 3.xx, and add both to the PATH environment variable.
Install the extension via chrome extensions manager (Required developer mode to be on)

## Screenshots
![Main Screen](/images/Main.png)

![Settings Screen](/images/Settings.png)

![Page Action](/images/Action.png)

![Player Button Injection](/images/twitch_inject.png)