(function() {
    document.addEventListener('keydown', function(e) {
        e.preventDefault();
        e.stopPropagation();
    }, true);
  
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });
  
    document.addEventListener('selectstart', function(e) {
        e.preventDefault();
    });
})();

(function() {
    function detectDevTool(allow) {
      if(isNaN(+allow)) allow = 100;
      var start = +new Date(); // Validation of built-in Object tamper prevention.
      debugger;
      var end = +new Date(); // Validates too.
      if(isNaN(start) || isNaN(end) || end - start > allow) {
        document.body.innerHTML = "<h1>Access Denied</h1><p>DevTools is not allowed on this page.</p>";
      }
    }
    if(window.attachEvent) {
      if (document.readyState === "complete" || document.readyState === "interactive") {
          detectDevTool();
        window.attachEvent('onresize', detectDevTool);
        window.attachEvent('onmousemove', detectDevTool);
        window.attachEvent('onfocus', detectDevTool);
        window.attachEvent('onblur', detectDevTool);
      } else {
          setTimeout(argument.callee, 0);
      }
    } else {
      window.addEventListener('load', detectDevTool);
      window.addEventListener('resize', detectDevTool);
      window.addEventListener('mousemove', detectDevTool);
      window.addEventListener('focus', detectDevTool);
      window.addEventListener('blur', detectDevTool);
    }
}());
