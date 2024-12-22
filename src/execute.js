"use strict";

/**
 * Handles a roll event by logging it and registering the result with Foundry VTT.
 * @param {number} roll - The roll result to handle.
 */
const handleRoll = (roll) => {
  console.log("Foundry VTT Listener: Handling roll.", roll);
  Roll.defaultImplementation.registerResult("pixels", "d20", roll);
};

/**
 * Initializes Foundry VTT settings and listeners for the Pixels extension.
 */
const handleFoundry = () => {
  console.log("Foundry VTT Listener: Implementing logic.");

  // Notify the extension that Foundry is ready
  window.postMessage({ type: "PIXELS_FOUNDRY_READY" }, "*");

  // Register settings for the Pixels extension
  game.settings.register("pixels", "enabled", {
    scope: "client",
    name: "PIXELS.SETTINGS.ENABLED.Name",
    hint: "PIXELS.SETTINGS.ENABLED.Hint",
    config: true,
    type: Boolean,
    default: false,
    onChange: (enabled) => {
      module.enabled = enabled;
    },
  });

  game.settings.register("pixels", "allowUnprompted", {
    scope: "client",
    name: "PIXELS.SETTINGS.UNPROMPTED.Name",
    hint: "PIXELS.SETTINGS.UNPROMPTED.Hint",
    config: true,
    type: Boolean,
    default: true,
  });

  game.settings.register("pixels", "devices", {
    scope: "client",
    config: false,
    type: Object,
    default: {},
  });

  // Register Pixels as a dice fulfillment method
  CONFIG.Dice.fulfillment.methods.pixels = {
    label: "Pixels - Electronic Dice",
    interactive: true,
  };

  // Listen for messages from the extension
  window.addEventListener("message", (event) => {
    console.log("Foundry VTT Listener: Message received.", event);

    const data = event.data;

    if (data.type === "PIXELS_HANDLE_ROLL") {
      console.log("Foundry VTT Listener: Handling roll.");
      handleRoll(data.data);
    }
  });
};

/**
 * Waits for the Foundry VTT `Hooks` object and the `ready` event to initialize the Pixels extension.
 */
(function () {
  console.log("Foundry VTT Listener: Content script loaded.");

  const waitForHooks = () => {
    if (window.Hooks && typeof window.Hooks.on === "function") {
      console.log("Foundry VTT Listener: Hooks detected.");

      // Listen for the "ready" event
      Hooks.on("ready", () => {
        console.log("Foundry VTT Listener: Foundry ready.");
        handleFoundry();
      });
    } else {
      // Retry after a short delay if Hooks is not yet available
      setTimeout(waitForHooks, 100);
    }
  };

  waitForHooks();
})();
