// These URL paths will be transformed to CN mirrors.
var mirrors = {
  "//developers.google.com"           : "//developers.google.cn",
  "//firebase.google.com"             : "//firebase.google.cn",
  "//developer.android.com"           : "//developer.android.google.cn",
  "//source.android.com"              : "//source.android.google.cn",
  "//www.tensorflow.org"              : "//tensorflow.google.cn",
  "//angular.io"                      : "//angular.cn",
  "//translate.google.com"            : "//translate.google.cn",
  "//careers.google.com"              : "//careers.google.cn",
  "//golang.org"                      : "//golang.google.cn",
  "//sum.golang.org"                  : "//sum.golang.google.cn"
}

// These URL paths are not available on CN mirrors, therefore won't be transformed.
var whitelist = [
  "//careers.google.com/jobs"
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

