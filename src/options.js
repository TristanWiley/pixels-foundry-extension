"use strict";

import {
  repeatConnect,
  requestPixel,
} from "@systemic-games/pixels-web-connect";
import "./options.css";

(function () {
  const connectionButton = document.getElementById("connectBtn");
  const statusText = document.getElementById("statusText");

  /**
   * Updates the state of the connection button.
   * @param {boolean} isConnected - Indicates if the pixel is connected.
   */
  function updateButtonState(isConnected) {
    connectionButton.disabled = isConnected;
    connectionButton.textContent = isConnected ? "Connected" : "Connect";
  }

  /**
   * Handles the status change of the pixel.
   * @param {Object} pixel - The pixel object.
   */
  function handlePixelStatusChange(pixel) {
    pixel.addEventListener("statusChanged", (event) => {
      if (event.status === "ready") {
        updateButtonState(true);
        statusText.textContent = "Listening for rolls...";

        // Start listening for roll events
        pixel.addEventListener("roll", (event) => {
          console.log("Roll event received", event);
          statusText.textContent = `Roll: ${event}`;
          chrome.runtime.sendMessage({
            type: "HANDLE_ROLL",
            data: event,
          });
        });
      } else if (event.status === "disconnected") {
        updateButtonState(false);
        statusText.textContent = "Disconnected";

        // Send notification to the browser
        chrome.notifications.create(
          "pixels-disconnected",
          {
            type: "basic",
            title: "Pixels dice disconnected",
            message: "Please reconnect on the options page!",
          },
          function () {}
        );
      }
    });
  }

  /**
   * Connects to the pixel and sets up event listeners.
   */
  async function connectPixel() {
    try {
      const pixel = await requestPixel();
      console.log(pixel);
      handlePixelStatusChange(pixel);
      updateButtonState(false);
      connectionButton.textContent = "Connecting...";
      await repeatConnect(pixel);
    } catch (error) {
      console.error("Failed to connect to pixel:", error);
      statusText.textContent = "Connection failed. Please try again.";
    }
  }

  /**
   * Initializes the options page by setting up event listeners.
   */
  function initialize() {
    connectionButton.addEventListener("click", connectPixel);
  }

  // Initialize the options page
  initialize();
})();
