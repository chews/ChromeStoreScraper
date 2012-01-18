var page = new WebPage();
page.viewportSize = { width: 1080, height: 800 }

page.onConsoleMessage = function(msg) {
    console.log(msg);
};
page.settings.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_2) AppleWebKit/535.7 (KHTML, like Gecko) Chrome/16.0.912.75 Safari/535.7';
page.settings.XSSAuditingEnabled = false;

var id = phantom.args[0];
var url = "https://plusone.google.com/_/+1/fastbutton?url=https%3A%2F%2Fchrome.google.com%2Fwebstore%2Fdetail%2F"+id+"&align=right&size=medium&count=true&annotation=bubble&hl=en"
page.open(url, function (status) {
    if (status !== "success") {
        console.log("Unable to access network");
        phantom.exit();
    } else {

    }
});

page.onLoadFinished = function (status) {
  page.evaluate(function() {
//    console.log("awesome");
//    console.log(document.body.innerHTML);
    console.log(document.getElementById("aggregateCount").innerText);
  });
  phantom.exit();
};
