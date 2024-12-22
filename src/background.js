"use strict";

// Listener for messages
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const senderTabId = sender.tab.id;

  switch (message.type) {
    case "PIXELS_FOUNDRY_READY":
      handleFoundryReady(senderTabId);
      break;

    case "PIXELS_FOUNDRY_CLOSED":
      handleFoundryClosed(senderTabId);
      break;

    case "HANDLE_ROLL":
      handleRoll(message.data);
      break;

    default:
      console.warn(`Unknown message type: ${message.type}`);
  }

  return true;
});

/**
 * Handles the "PIXELS_FOUNDRY_READY" message.
 * Adds the sender tab ID to the list of foundry tabs if not already present.
 *
 * @param {number} senderTabId - The ID of the sender tab.
 */
function handleFoundryReady(senderTabId) {
  chrome.storage.local.get({ foundryTabs: [] }, (result) => {
    const foundryTabs = result.foundryTabs;
    if (!foundryTabs.includes(senderTabId)) {
      foundryTabs.push(senderTabId);
      chrome.storage.local.set({ foundryTabs });
    }
  });
}

/**
 * Handles the "PIXELS_FOUNDRY_CLOSED" message.
 * Removes the sender tab ID from the list of foundry tabs.
 *
 * @param {number} senderTabId - The ID of the sender tab.
 */
function handleFoundryClosed(senderTabId) {
  chrome.storage.local.get({ foundryTabs: [] }, (result) => {
    const foundryTabs = result.foundryTabs.filter(
      (tabId) => tabId !== senderTabId
    );
    chrome.storage.local.set({ foundryTabs });
  });
}

/**
 * Handles the "HANDLE_ROLL" message.
 * Sends the roll result to all foundry tabs.
 *
 * @param {Object} rollResult - The result of the roll.
 */
function handleRoll(rollResult) {
  chrome.storage.local.get({ foundryTabs: [] }, (result) => {
    const foundryTabs = result.foundryTabs;
    foundryTabs.forEach((tabId) => {
      chrome.tabs.sendMessage(tabId, {
        type: "PIXELS_HANDLE_ROLL",
        data: rollResult,
      });
    });
  });
}
