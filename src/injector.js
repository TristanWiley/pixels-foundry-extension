"use strict";

// Inject the execute.js script into the current page
(function injectScript() {
  const script = document.createElement("script");
  script.src = chrome.runtime.getURL("execute.js");
  script.onload = function () {
    this.remove();
  };
  (document.head || document.documentElement).appendChild(script);
})();

// Listen for PIXELS_FOUNDRY_READY message from the injected script
window.addEventListener("message", function (event) {
  if (event.source !== window) return;
  if (event.data.type === "PIXELS_FOUNDRY_READY") {
    console.log("PIXELS_FOUNDRY_READY message received");
    chrome.runtime.sendMessage({ type: "PIXELS_FOUNDRY_READY" });

    // Register listener for when the tab is about to be closed
    window.addEventListener("beforeunload", function () {
      chrome.runtime.sendMessage({ type: "PIXELS_FOUNDRY_CLOSED" });
    });
  }
});

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received:", message);

  if (message.type === "PIXELS_HANDLE_ROLL") {
    // Forward the roll handling message to the page
    window.postMessage({ type: "PIXELS_HANDLE_ROLL", data: message.data }, "*");
  }
});
