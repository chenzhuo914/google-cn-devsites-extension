// These URL paths will be transformed to CN mirrors.
var mirrors = {
  "//developers.google.com" : "//developers.google.cn",
  "//firebase.google.com"   : "//firebase.google.cn",
  "//developer.android.com" : "//developer.android.google.cn",
  "//angular.io"            : "//angular.cn",
  "google.com/maps"         : "google.cn/maps",
}

// These URL paths are not available on CN mirrors, therefore won't be transformed.
var whitelist = [
  "//developers.google.com/groups",
  "//developers.google.com/events",
  "//firebase.google.com/support/contact/",
]

function mirrorUrl(url) {
  // Check for whitelisting.
  for (var key in whitelist) {
    if (url.includes(whitelist[key])) {
      return url;
    }
  }
  
  // Check for mapping.
  for (var key in mirrors) {
  	if (url.includes(key)) {
  		url = url.replace(key, mirrors[key]);
  		break;
  	}
  }
  return url;
}
