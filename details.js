//page.settings.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_2) AppleWebKit/535.7 (KHTML, like Gecko) Chrome/16.0.912.75 Safari/535.7';
//page.settings.XSSAuditingEnabled = false;

var log = ''
var page = new WebPage({
  onConsoleMessage: function (msg) {
//    console.log(msg);
    if (msg.indexOf("LOG") == 0) console.log(msg.replace("LOG",""));
  },

  settings: {
    loadPlugins: false,
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_2) AppleWebKit/535.7 (KHTML, like Gecko) Chrome/16.0.912.75 Safari/535.7'
  },

  viewportSize: { width: 1080, height: 800 }
});



var id = phantom.args[0];
var url = "https://chrome.google.com/webstore/detail/"+id;

page.open(url, function (status) {
    if (status !== "success") {
        console.log("Unable to access network");
    } else {

    }
});

var h = true;

function is_ready()
{
  var _ready = page.evaluate(function() {
    if (!document.getElementsByClassName("rsw-stars inline")[0]){
      return false;
    } else {
      return true;
    }
  });
  return _ready;
}
page.onLoadFinished = function (status) {
    setTimeout(function(){
      if (is_ready()){
        page.evaluate(function() {
          //console.log(document.body.innerHTML);
          var name = document.getElementsByClassName("detail-dialog-title")[0].innerText;
          var icon = document.getElementsByClassName("detail-dialog-icon")[1].src;
          var rating = document.getElementsByClassName("rsw-stars inline")[0].attributes[4].value;
          var category = document.getElementsByClassName("detail-dialog-link")[0].innerText;
          var usercount = document.getElementsByClassName("detail-dialog-users")[0].innerText.replace("0+", "0").split(" users")[0];
          var description = document.getElementsByClassName("overview-tab-right-bar-summary")[0].innerText;
          var version = document.getElementsByClassName("details-tab-right-version-info-label")[0].nextSibling.nodeValue.substring(1);
          var updated = document.getElementsByClassName("details-tab-right-version-info-label")[1].nextSibling.nodeValue.substring(1);
          var language = document.getElementsByClassName("details-tab-right-version-info-label")[2].nextSibling.nodeValue.substring(1);
          aw = 2;
          if(document.getElementsByClassName("details-tab-right-info-permissions-list")[0].innerHTML.indexOf("all websites") == -1)
           {
             aw = 2;
           } else {
             aw = 1;
          }
          var jsod = {
            "name":name,
            "icon":icon,
            "rating":rating,
            "category":category,
            "usercount":usercount,
            "description":description,
            "version":version,
            "updated":updated,
            "language":language,
            "aw":aw
          };
          console.log("LOG"+JSON.stringify(jsod));
          //console.log('LOG"'+name+'","'+usercount+'","'+icon+'","'+category+'","'+description+'","'+version+'","'+updated+'","'+rating+'","'+language+'","'+aw+'"');
        });
        phantom.exit();
      }
    },50);
};
