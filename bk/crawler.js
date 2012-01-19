var page = new WebPage();
page.viewportSize = { width: 1080, height: 800 }
page.onConsoleMessage = function(msg) {
    console.log(msg);
};
page.settings.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_2) AppleWebKit/535.7 (KHTML, like Gecko) Chrome/16.0.912.75 Safari/535.7';


page.open(encodeURI("https://chrome.google.com/webstore/category/popular"), function (status) {
    if (status !== "success") {
        console.log("Unable to access network");
    } else {
      // var scrollPos = 0;
      // waitFor(function() {
      //     // Check in the page if a specific element is now visible
      //     return page.evaluate(function() {
      //       window.scrollBy(0,500);
      //       console.log("scrolling" + document.body.scrollHeight + " | "+document.getElementsByClassName("inline").length);
      //         return (document.getElementsByClassName("inline").length > 500);
      //     });
      // }, function() {
      //   for(i=0;i<document.getElementsByClassName("inline").length; i++)
      //   {
      //     if(document.getElementsByClassName("inline")[i].children[0].children[0].children[0].children[3].children[0].className.indexOf("extension") == 0)
      //     {
      //       ext_name = document.getElementsByClassName("inline")[i].children[0].children[0].children[0].children[4].children[0].innerText;
      //       ext_count = document.getElementsByClassName("inline")[i].children[0].children[0].children[0].children[4].children[1].innerText.replace("0+", "0").split(" users")[0];
      //       console.log(ext_name+", "+ext_count);
      //     }                    
      //   }
      //    phantom.exit();
      // });
      // var enoughLoaded = false;
      // var scrollPos = 0;
      // setInterval(function(){
      //   if (!enoughLoaded){
      //     console.log("Page info"+document.body.scrollHeight);
      //     if (document.getElementsByClassName("inline").length < 10000)
      //     {
      //       console.log("Nodes:"+document.getElementsByClassName("inline").length);
      //       window.scrollBy(1,1000);
      // 
      //     } else {

      //   }
      // },750);

    }
    //phantom.exit();
});
page.onLoadFinished = function (status) {
  var enoughLoaded = false;
  var scrollPos = 0;
  // setInterval(function(){
  //    if (!enoughLoaded){
  //    }
  //  },750);
  setInterval(function(){
     if (!enoughLoaded){
       enoughLoaded=page.evaluate(function() {
         window.scrollBy(0,3000);
         console.log(document.getElementsByClassName("inline").length);
         return (document.getElementsByClassName("inline").length > 3000);
       });
     } else {
       page.evaluate(function() {
          for(i=0;i<document.getElementsByClassName("inline").length; i++)
          {
             if (typeof(document.getElementsByClassName("inline")[i].children[0].children[0].children[0].children[4].children[0])!=="undefined")
             {
               if(document.getElementsByClassName("inline")[i].children[0].children[0].children[0].children[4].children[0].className.indexOf("extension") == 0)
               {
                 ext_name = document.getElementsByClassName("inline")[i].children[0].children[0].children[0].children[5].children[0].innerHTML;
                 ext_count = document.getElementsByClassName("inline")[i].children[0].children[0].children[0].children[5].children[1].innerHTML.replace("0+", "0").split(" users")[0];
                 console.log(ext_name+", "+ext_count);
               }                      
             }
             if (typeof(document.getElementsByClassName("inline")[i].children[0].children[0].children[0].children[3].children[0])!=="undefined")
             {
               if(document.getElementsByClassName("inline")[i].children[0].children[0].children[0].children[3].children[0].className.indexOf("extension") == 0)
               {
                 ext_name = document.getElementsByClassName("inline")[i].children[0].children[0].children[0].children[4].children[0].innerHTML;
                 ext_count = document.getElementsByClassName("inline")[i].children[0].children[0].children[0].children[4].children[1].innerHTML.replace("0+", "0").split(" users")[0];
                 console.log(ext_name+", "+ext_count);
               }                      
             }
         }
       });
       phantom.exit();

      //phantom.exit();
    }
   },200);
    // page.evaluate(function() {
    //   if (document.getElementsByClassName("inline").length < 500)
    //   {
    //     console.log("Nodes Finished:"+document.getElementsByClassName("inline").length);
    //     window.scrollBy(1,500);
    //   } else {
    //     for(i=0;i<document.getElementsByClassName("inline").length; i++)
    //     {
    //       if (typeof(document.getElementsByClassName("inline")[i].children[0].children[0].children[0].children[4].children[0])!=="undefined")
    //       {
    //         if(document.getElementsByClassName("inline")[i].children[0].children[0].children[0].children[4].children[0].className.indexOf("extension") == 0)
    //         {
    //           ext_name = document.getElementsByClassName("inline")[i].children[0].children[0].children[0].children[5].children[0].innerHTML;
    //           ext_count = document.getElementsByClassName("inline")[i].children[0].children[0].children[0].children[5].children[1].innerHTML.replace("0+", "0").split(" users")[0];
    //           console.log(ext_name+", "+ext_count);
    //         }                      
    //       }
    //     }
    //     phantom.exit();
    //   }
    // });
};
