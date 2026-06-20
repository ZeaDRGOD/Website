(function() {
  function detectDevTools(threshold = 100) {
      const start = performance.now();
      debugger;
      const end = performance.now();

      if (end - start > threshold) {
        const images = [
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbpm3WgWaYbX1AMHerInQS76PVdhvWY8WItA&s",
              "https://media3.giphy.com/media/v1.Y2lkPTZjMDliOTUydnV0MDkyc25ocGdqY21memFtbGU4NndmMTVqZ2FvdzN6NDBpZjAxdSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ijOCqiaTjwI6FXiFoD/source.gif",
              "https://media.tenor.com/6XPgI7-8pj4AAAAd/king-nasir-indian.gif", 
              "https://i.makeagif.com/media/4-14-2026/0wSUsS.gif",
              "https://media4.giphy.com/media/v1.Y2lkPTZjMDliOTUydnV0MDkyc25ocGdqY21memFtbGU4NndmMTVqZ2FvdzN6NDBpZjAxdSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/4LIobMdg3mhosygfgy/giphy.gif",
              "https://media3.giphy.com/media/v1.Y2lkPTZjMDliOTUycW1zZWd0MTNkcmVmbXZvb25ta25qejBmMWdhc3l5aWtlMjExZXR0biZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/IeQZkk1isTSYqxecqS/giphy.gif",
              "https://media.tenor.com/_AZJmhAry0gAAAAC/rat-dancing-meme.gif",
              "https://media.tenor.com/93TBRdPk8ZAAAAAM/power-up-power-ranger.gif",
              "https://media.tenor.com/rgJleMzUa8MAAAAM/bailes.gif"
          ];
          const randomImage = images[Math.floor(Math.random() * images.length)];
          document.documentElement.innerHTML = `
              <!DOCTYPE html>
              <html lang="en">
              <head>
                  <meta charset="UTF-8">
                  <title>404 Not Found</title>
                  <style>
                      body { font-family: sans-serif; text-align: center; padding: 150px; background: #f4f4f4; color: #333; }
                      h1 { font-size: 50px; }
                      p { font-size: 20px; }
                      img { display: block; margin-left: auto; margin-right: auto; max-width: 100%; height: auto; }
                  </style>
              </head>
              <body>
                <div>
                  <h1>404</h1>
                  <p>Page Not Found</p>
                  <br>
                </div>
                <img src="${randomImage}" alt="LOL">
              </body>
              </html>
          `;
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
