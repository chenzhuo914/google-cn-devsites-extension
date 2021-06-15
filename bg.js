function toggleState(currentState) {
  return currentState === "on" ? "off" : "on";
}

function reset(currentState) {
  if (currentState === "on") {
    chrome.action.setIcon({ path: "on.png" });
    chrome.action.setTitle({ title: "Status: ON" });

    chrome.declarativeNetRequest.updateEnabledRulesets({
      "enableRulesetIds": ["ruleset_1"]
    });
  } else {
    chrome.action.setIcon({ path: "off.png" });
    chrome.action.setTitle({ title: "Status: OFF" });

    chrome.declarativeNetRequest.updateEnabledRulesets({
      "disableRulesetIds": ["ruleset_1"]
    });
  }

  chrome.storage.local.set({ currentState: currentState });
}

// init state
chrome.runtime.onStartup.addListener(() => {
  chrome.storage.local.get("currentState", result => {
    if (result.currentState === undefined) {
      result.currentState = "on"; // default to "on"
    }
    reset(result.currentState); // reset state
  });
});

chrome.action.onClicked.addListener(tab => {
  chrome.storage.local.get("currentState", result => {
    const currentState = toggleState(result.currentState);
    reset(currentState);
  });
});
