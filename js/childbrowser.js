/* MIT licensed */
// (c) 2010 Jesse MacFadyen, Nitobi

/*global PhoneGap */

function ChildBrowser() {
  // Does nothing
  alert('ChildBrowser');
}

// Callback when the location of the page changes
// called from native
ChildBrowser._onLocationChange = function(newLoc)
{
  alert('_onLocationChange');
  window.plugins.childBrowser.onLocationChange(newLoc);
};

// Callback when the user chooses the 'Done' button
// called from native
ChildBrowser._onClose = function()
{
  alert('_onClose');
  window.plugins.childBrowser.onClose();
};

// Callback when the user chooses the 'open in Safari' button
// called from native
ChildBrowser._onOpenExternal = function()
{
  alert('_onOpenExternal')
  window.plugins.childBrowser.onOpenExternal();
};

// Pages loaded into the ChildBrowser can execute callback scripts, so be careful to
// check location, and make sure it is a location you trust.
// Warning ... don't exec arbitrary code, it's risky and could fuck up your app.
// called from native
ChildBrowser._onJSCallback = function(js,loc)
{
  alert('_onJSCallback');
  // Not Implemented
  //window.plugins.childBrowser.onJSCallback(js,loc);
};

/* The interface that you will use to access functionality */

// Show a webpage, will result in a callback to onLocationChange
ChildBrowser.prototype.showWebPage = function(loc,geolocationEnabled)
{
  alert('showWebPage');
  var success = function(msg)
  {
     alert("ChildBrowser.showWebPage success :: " + msg);

        var event = JSON.parse(msg);

        if (event.type == "locationChanged") {
            ChildBrowser._onLocationChange(event.location);
        }
  };

  var error = function(e)
  {
     alert("ChildBrowser.showWebPage error :: " + e);
  };

  var options =
  {
     url:loc,
     geolocationEnabled:(geolocationEnabled == true)

  };

  PhoneGap.exec(success,error,"ChildBrowserCommand","showWebPage", options);
  //setTimeout(this.close,5000);
};

// close the browser, will NOT result in close callback
ChildBrowser.prototype.close = function()
{
  alert('close');
  PhoneGap.exec(null,null,"ChildBrowserCommand","close");
};

// Not Implemented
ChildBrowser.prototype.jsExec = function(jsString)
{
  alert('jsExec');
  // Not Implemented!!
  //PhoneGap.exec("ChildBrowserCommand.jsExec",jsString);
};

// Note: this plugin does NOT install itself, call this method some time after deviceready to install it
// it will be returned, and also available globally from window.plugins.childBrowser
ChildBrowser.install = function()
{
  alert('install');
  if(!window.plugins) {
    window.plugins = {};
  }

  window.plugins.childBrowser = new ChildBrowser();
  return window.plugins.childBrowser;
};