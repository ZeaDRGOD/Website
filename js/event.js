// Basic protection: right-click + devtools shortcut blocking
(function() {
  document.addEventListener('contextmenu', function(e) {
      e.preventDefault();
  });

  document.addEventListener('keydown', function(e) {
      const allowedCtrlKeys = [
          'Delete',
          'Backspace',
          'ArrowLeft',
          'ArrowRight',
          'a',
          'c',
          'v',
          'x',
          'z',
          'y'
      ];

      // Block F12
      if (e.key === 'F12') {
          e.preventDefault();
          return false;
      }

      // Block Ctrl+ combos unless explicitly allowed
      if (e.ctrlKey && !allowedCtrlKeys.includes(e.key.toLowerCase())) {
          e.preventDefault();
          return false;
      }
  });
})();

// DevTools detection – close the page if detected
(function() {
  function detectDevTools(threshold = 100) {
      const start = performance.now();
      debugger;
      const end = performance.now();

      if (end - start > threshold) {
          alert("DevTools detected! Closing page...");
          window.open('', '_self');
          window.close();
      }
  }

  function monitor() {
      detectDevTools();
      setInterval(detectDevTools, 1000);
  }

  if (document.readyState === "complete" || document.readyState === "interactive") {
      monitor();
  } else {
      window.addEventListener('DOMContentLoaded', monitor);
  }
})();
