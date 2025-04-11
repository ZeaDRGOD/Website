(function() {
  document.addEventListener('contextmenu', function(e) {
      e.preventDefault();
  });

  document.addEventListener('keydown', function(e) {
      // Block all Ctrl+ combinations
      if (e.ctrlKey) {
          e.preventDefault();
          return false;
      }
      
      // Additional specific shortcut
      if (e.key === 'F12') {
          e.preventDefault();
          return false;
      }
  });
})();

(function() {
  function detectDevTool(allow) {
      if(isNaN(+allow)) allow = 100;
      var start = +new Date();
      debugger;
      var end = +new Date();
      if(isNaN(start) || isNaN(end) || end - start > allow) {
          document.body.innerHTML = "<h1>Access Denied</h1><p>DevTools is not allowed on this page.</p>";
      }
  }

  // Event listener setup
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
})();