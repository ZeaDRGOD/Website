// Array of ~100 random sassy messages
const shitTalk = [
    "Nice try, genius, but my code’s not your free lunch!",
    "What, you think you can just swipe this? Get a life!",
    "Oh, look, another wannabe thief. How original.",
    "Stealing’s not a skill, try harder, scrub.",
    "My site’s too good for your grubby hands, back off!",
    "You’re not slick enough to snag this, clown.",
    "Go cry somewhere else, this ain’t yours!",
    "Pathetic attempt, loser, keep dreaming!",
    "Hands off, you sticky-fingered fool!",
    "You’re too slow to steal this, ha!",
    "What’s next, gonna rob a bank with a spoon?",
    "This ain’t a buffet, stop grabbing!",
    "You’re a walking L, give it up!",
    "Ctrl+S? More like Ctrl+Sucks for you!",
    "Keep your paws off my masterpiece, creep!",
    "You’re out here embarrassing yourself, stop it!",
    "This code’s too hot for your cold hands!",
    "Go play in traffic, this ain’t for you!",
    "You’re not even good at stealing, wow!",
    "My site laughs at your weak attempts!",
    "Take your Ctrl+S and shove it, nerd!",
    "You’re a glitch in the matrix, get lost!",
    "This is my turf, you’re just a trespasser!",
    "Stealing from me? Bold and stupid!",
    "You’re a copycat with no claws!",
    "My pixels are too precious for you!",
    "Go back to your cave, troglodyte!",
    "You’re a thief with no game, sad!",
    "This site’s a fortress, you’re a pebble!",
    "Ctrl+C? More like Ctrl+Can’t!",
    "You’re a bottom-feeder, swim away!",
    "My code’s a king, you’re a peasant!",
    "You’re too broke to afford this steal!",
    "Get your grubby mitts off my work!",
    "You’re a leech with no suction!",
    "This ain’t your sandbox, kid!",
    "You’re a clown without a circus!",
    "My site’s too fly for your crash landing!",
    "You’re a pirate with no ship, drown!",
    "Ctrl+U? More like Useless+You!",
    "You’re a hack with no hacks!",
    "This is my domain, you’re just dust!",
    "You’re a thief with no loot, boo!",
    "My work’s gold, you’re just rust!",
    "You’re a wannabe with no juice!",
    "Go scrape someone else’s plate!",
    "You’re a shadow with no shine!",
    "This site’s a gem, you’re a rock!",
    "You’re a troll with no bridge!",
    "My code’s a beast, you’re a flea!",
    "You’re a zero trying to take my one!",
    "This ain’t your playground, bounce!",
    "You’re a rat with no cheese!",
    "My site’s a castle, you’re a moat!",
    "You’re a scrub with no sponge!",
    "Go beg elsewhere, this is mine!",
    "You’re a ghost with no haunt!",
    "This code’s a vibe, you’re a buzzkill!",
    "You’re a dud trying to spark!",
    "My work’s a flame, you’re just smoke!",
    "You’re a fake with no mask!",
    "This site’s a prize, you’re a penalty!",
    "You’re a glitch with no fix!",
    "My code’s a rocket, you’re grounded!",
    "You’re a drone with no buzz!",
    "This ain’t your harvest, farmer!",
    "You’re a flop with no flip!",
    "My site’s a star, you’re a black hole!",
    "You’re a pawn with no board!",
    "This code’s a feast, you’re fasting!",
    "You’re a joke with no punchline!",
    "My work’s a wave, you’re a ripple!",
    "You’re a brick with no wall!",
    "This site’s a storm, you’re a drizzle!",
    "You’re a spark with no fire!",
    "My code’s a lion, you’re a cub!",
    "You’re a shadow with no light!",
    "This ain’t your treasure, pirate!",
    "You’re a crumb with no cake!",
    "My site’s a jet, you’re a kite!",
    "You’re a echo with no sound!",
    "This code’s a titan, you’re a twig!",
    "You’re a blank with no fill!",
    "My work’s a symphony, you’re off-key!",
    "You’re a dud with no boom!",
    "This site’s a throne, you’re a stool!",
    "You’re a whisper with no shout!",
    "My code’s a hawk, you’re a sparrow!",
    "You’re a drip with no splash!",
    "This ain’t your vault, bandit!",
    "You’re a speck with no spot!",
    "My site’s a blaze, you’re a flicker!",
    "You’re a breeze with no gust!",
    "This code’s a champ, you’re a chump!",
    "You’re a void with no depth!",
    "My work’s a peak, you’re a pit!",
    "You’re a miss with no hit!"
];

// Self-executing function to encapsulate and obscure code
(function() {
  // Global keydown listener in capture phase
  document.addEventListener('keydown', function(e) {
    // Block Ctrl+S/Cmd+S, Ctrl+C/Cmd+C, Ctrl+U/Cmd+U
    if ((e.ctrlKey || e.metaKey) && ['s', 'c', 'u'].includes(e.key.toLowerCase())) {
      e.preventDefault();
      e.stopPropagation();
    }
    // Block F12, Ctrl+Shift+I (DevTools), Ctrl+Shift+C (Inspect Element)
    if (e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && ['i', 'c'].includes(e.key.toLowerCase()))) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);

  // Disable right-click context menu
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
  });

  // Disable text selection
  document.addEventListener('selectstart', function(e) {
    e.preventDefault();
  });

  // Detect DevTools (heuristic based on window size)
  let devToolsDetected = false;
  const sizeThreshold = 150;
  setInterval(() => {
    if (!devToolsDetected && 
        (window.outerWidth - window.innerWidth > sizeThreshold || 
         window.outerHeight - window.innerHeight > sizeThreshold)) {
      devToolsDetected = true;
      document.body.innerHTML = atob('PGRpdiBzdHlsZT0idGV4dC1hbGlnbjpjZW50ZXI7cGFkZGluZzo1MHB4Ij48aDE+Tm8gUGVla2luZyE8L2gxPjxwPlBsZWFzZSByZXNwZWN0IHRoZSBwcml2YWN5IG9mIHRoaXMgcGFnZS48L3A+PC9kaXY+');
    }
  }, 500);

  // Load content dynamically (example: "Protected Content")
  window.onload = function() {
    if (!devToolsDetected) {
      document.body.innerHTML = atob('PGgxPlByb3RlY3RlZCBDb250ZW50PC9oMT48cD5UaGlzIGNvbnRlbnQgaXMgc2FmZSBmcm9tIGNhc3VhbCBpbnNwZWN0aW9uLjwvcD4=');
    }
  };

  // Obfuscate with Base64-encoded eval (minimal example)
  eval(atob('Y29uc29sZS5sb2coJ1Byb3RlY3Rpb24gYWN0aXZlJyk7'));
})();

// Disable drag and drop of images
document.addEventListener('dragstart', function(e) {
    e.preventDefault();
});
