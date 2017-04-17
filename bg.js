var redirect_listener = function(details) {
  var url = mirrorUrl(details.url);
  return {redirectUrl : url};
};

function toggleState(currentState) {
	return currentState === "on" ? "off" : "on";
}

function reset(currentState) {
  if (currentState === "on") {
    chrome.browserAction.setIcon({path: "on.png"});
    chrome.browserAction.setTitle({title: "Status: ON"});
    chrome.webRequest.onBeforeRequest.addListener(
    	redirect_listener,
    	{
        urls : ["<all_urls>"],
        types : ["main_frame", "sub_frame"]
      },
      [ "blocking" ]);
  }
  else {
    chrome.browserAction.setIcon({path: "off.png"});
    chrome.browserAction.setTitle({title: "Status: OFF"});
    chrome.webRequest.onBeforeRequest.removeListener(redirect_listener);
  }
}

// Default to "on".
if (localStorage.currentState == undefined) {
	localStorage.currentState = "on";
}
reset(localStorage.currentState);

chrome.browserAction.onClicked.addListener(function(tab) {
	var currentState = toggleState(localStorage.currentState);
	reset(currentState);
  localStorage.currentState = currentState;
});

