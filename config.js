// These URL paths will be transformed to CN mirrors.
var mirrors = {
  "//developers.google.com"           : "//developers.google.cn",
  "//firebase.google.com"             : "//firebase.google.cn",
  "//developer.android.com"           : "//developer.android.google.cn",
  "//source.android.com"              : "//source.android.google.cn",
  "//www.tensorflow.org"              : "//tensorflow.google.cn",
  "//angular.io"                      : "//angular.cn",
  "//maps.google.com"                 : "//maps.google.cn",
  "//ditu.google.com"                 : "//ditu.google.cn",
  "google.com/maps"                   : "google.cn/maps",
  "//translate.google.com"            : "//translate.google.cn",
  "//careers.google.com"              : "//careers.google.cn",
  "//codelabs.developers.google.com"  : "//code-labs.cn",
  "//code-labs.io"                    : "//code-labs.cn",
  "//finance.google.com"              : "//caijing.google.cn",
  "//golang.org"                      : "//golang.google.cn"
}

// These URL paths are not available on CN mirrors, therefore won't be transformed.
var whitelist = [
  "//developers.google.com/groups",
  "//developers.google.com/events",
  "//firebase.google.com/support/contact/",
  "//careers.google.com/jobs",
  "//finance.google.com/finance/portfolio",
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

