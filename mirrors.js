var mirrors = {
  "developers.google.com" : "developers.google.cn",
  "firebase.google.com" : "firebase.google.cn",
  "developer.android.com" : "developer.android.google.cn"
}

function mirrorUrl(url) {
  for (var key in mirrors) {
  	if (url.includes(key)) {
  		url = url.replace(key, mirrors[key]);
  		break;
  	}
  }
  return url;
}