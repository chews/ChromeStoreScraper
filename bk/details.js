var page = new WebPage();
page.viewportSize = { width: 1080, height: 800 }

page.onConsoleMessage = function(msg) {
  // console.log(msg.indexOf("LOG"));
  //console.log(msg);
  if (msg.indexOf("LOG") == 0) console.log(msg.replace("LOG",""));
};
page.settings.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_2) AppleWebKit/535.7 (KHTML, like Gecko) Chrome/16.0.912.75 Safari/535.7';
page.settings.XSSAuditingEnabled = false;

var id = phantom.args[0];
var url = "https://chrome.google.com/webstore/detail/"+id;

page.open(url, function (status) {
    if (status !== "success") {
        console.log("Unable to access network");
    } else {

    }
});

var h = true;
page.onLoadFinished = function (status) {
  if (h)
  {
    h = false;
    setTimeout(function(){  page.evaluate(function() {
        //console.log(document.body.innerHTML);
        var rating = document.getElementsByClassName("rsw-stars inline")[0].attributes[4].value;
        var category = document.getElementsByClassName("detail-dialog-link")[0].innerText;
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
        console.log('LOG"'+rating+'","'+category+'","'+description+'","'+version+'","'+updated+'","'+rating+'","'+language+'","'+aw+'"');
      });phantom.exit();},1500);
  }
};
