function toggleState(currentState) {
  return currentState === "on" ? "off" : "on";
}

function reset(currentState) {
  if (currentState === "on") {
    chrome.action.setIcon({ path: "on.png" });
    chrome.action.setTitle({ title: "Status: ON" });

    chrome.declarativeNetRequest.updateEnabledRulesets({
      "enableRulesetIds": ["ruleset_1"]
    })
  }
  else {
    chrome.action.setIcon({ path: "off.png" });
    chrome.action.setTitle({ title: "Status: OFF" });

    chrome.declarativeNetRequest.updateEnabledRulesets({
      "disableRulesetIds": ["ruleset_1"]
    })
  }
}

// Default to "on".
chrome.storage.local.get(['currentState'], function (result) {
  if (result.currentState === undefined) {
    chrome.storage.local.set({ currentState: "on" })
  }
})

chrome.storage.local.get(['currentState'], result => {
  reset(result.currentState);
})

chrome.action.onClicked.addListener(function (tab) {
  chrome.storage.local.get(['currentState'], result => {
    const currentState = toggleState(result.currentState);
    reset(currentState);
    chrome.storage.local.set({ currentState: currentState });
  })
});
