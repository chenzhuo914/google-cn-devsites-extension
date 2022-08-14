const fs = require('fs');
// These URL paths will be transformed to CN mirrors.
var mirrors = {
  "//developers.google.com"     : "developers.google.cn",
  "//firebase.google.com"       : "firebase.google.cn",
  "//developer.android.com"     : "developer.android.google.cn",
  "//source.android.com"        : "source.android.google.cn",
  "//www.tensorflow.org"        : "tensorflow.google.cn",
  "//tfhub.dev"                 : "hub.tensorflow.google.cn",
  "//angular.io"                : "angular.cn",
  "//translate.google.com"      : "translate.google.cn",
  "//careers.google.com"        : "careers.google.cn",
  "//go.dev"                    : "golang.google.cn",
  "//golang.org"                : "golang.google.cn",
  "//sum.golang.org"            : "sum.golang.google.cn",
  "//www.google.com/maps/vt"    : "gac-geo.googlecnapps.cn",
  "//maps.googleapis.com/maps/vt"    : "gac-geo.googlecnapps.cn",
  "//www.google.com/images/*"   : "www.google.cn",
  "//www.google.com/tools/*"    : "www.google.cn",
  "//www.google.com/js/*"       : "www.google.cn",
  "//www.google.com/xjs/*"      : "www.google.cn",
  "//mail.google.com/_/scs/*"   : "www.google.cn",
  "//www.google.com/recaptcha/*": "www.recaptcha.net",
  // "//www.gstatic.com"           : "www.gstatic.cn",
  // "//ssl.gstatic.com"           : "www.gstatic.cn",
  "//maps.gstatic.com"          : "maps.gstatic.cn",
  "//encrypted-tbn2.gstatic.com": "encrypted-tbn2.gstatic.cn",
  // "//fonts.gstatic.com"         : "fonts.gstatic.cn",
  // "//fonts.googleapis.com"      : "fonts.googleapis.cn"
};

// These URL paths are not available on CN mirrors, therefore won't be transformed.
var skiplist = [
  "//careers.google.com/jobs"
];

function redirectRules() {
  let res = [];
  let id = 1;
  let manifest = JSON.parse(fs.readFileSync('manifest.json', 'utf-8'));
  let permissionList = manifest["host_permissions"];
  for (const urlPattern of permissionList) {
    res.push({
      "id": id++,
      "action": {
        "type": "modifyHeaders",
        "responseHeaders": [
          { "header": "Access-Control-Allow-Origin", "operation": "set", "value": "*" }
        ]
      },
      "condition": {
        "urlFilter": urlPattern,
        "excludedResourceTypes": ["other"],
        "isUrlFilterCaseSensitive": false
      }
    });
  }
  for (const url of skiplist) {
    res.push({
      "id": id++,
      "action": {
        "type": "allow"
      },
      "condition": {
        "urlFilter": url,
        "excludedResourceTypes": ["other"],
        "isUrlFilterCaseSensitive": false
      }
    });
  }
  for (const key in mirrors) {
    res.push({
      "id": id++,
      "action": {
        "type": "redirect",
        "redirect": {
          "transform": {
            "host": mirrors[key]
          }
        }
      },
      "condition": {
        "urlFilter": key,
        "excludedResourceTypes": ["other"],
        "isUrlFilterCaseSensitive": false
      }
    });
  }
  return res;
}

// Export rules to 'rules.json' (node.js is required)
fs.writeFileSync('rules.json', JSON.stringify(redirectRules()), err => {
  if (err) {
    console.error(err);
  } else {
    console.log('rules.json created.');
  }
});
