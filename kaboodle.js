(function(window, undefined){
  /* Options */

  var creatives = [
    {"title": "Join the Cerebral Beach Hackathon!!!", "creative": "cerebral.png", "href": "https://hack.cerebralbeach.com/"},
    {"title": "Get started with Kindo AI!!!", "creative": "kindo.jpeg", "href": "https://kindo.ai/"},
    {"title": "The #1 uncensored, open source AI model for cybersecurity.", "creative": "whiteRabbit.png", "href": "https://www.whiterabbitneo.com/sign-in?callbackUrl=/"},
    {"title": "Multimodal AI that understands videos like humans", "image": "twelveLabs.png", "href": "https://www.twelvelabs.io/"},
    {"title": "Vast.ai is the market leader in low-cost cloud GPU rental.", "image": "vastAI.png", "href": "https://vast.ai/?utm_source=googleads&utm_id=circleclick.com&gad_source=1&gclid=CjwKCAjwvKi4BhABEiwAH2gcw0vtDzlrLtjqMN7jaCvdZo5Gz5zSDE2ZsxXIHyvfsggYNlpL791w2xoCV0gQAvD_BwE"},
    {"title": "Search the world's information, including webpages, images, videos and more.", "image": "google.jpg", "href": "https://www.google.com/"},
    {"title": "Representing the Pioneers and Disruptors Associated with Market-Changing Innovation in Technology and Life Sciences", "image": "wilson.png", "href": "https://www.wsgr.com/en//"},
    {"title": "We drive brand value with technology, transformative storytelling, immersive events, communication management and marketing logistics.", "image": "john.png", "href": "https://john-weston.com/"},
    {"title": "The best way to reach humans instead of spam folders. Deliver transactional and marketing emails at scale.", "image": "resend.png", "href": "https://resend.com/"},
  ];

  /* most recently parsed script */
  var scripts = document.getElementsByTagName("script");
  var index = scripts.length - 1;
  var kaboodleTag = scripts[index];
  var src = kaboodleTag.src;
  var kaboodleRoot = src.substring(0, src.lastIndexOf("/"));
  var kaboodleStyle = document.createElement("link");
  kaboodleStyle.href = kaboodleRoot + "/kaboodle.css";
  kaboodleStyle.rel = "stylesheet";
  kaboodleStyle.type = "text/css";
  document.head.appendChild(kaboodleStyle);

  var numRows = kaboodleTag.dataset.numRows || 2;

  var kaboodleModule = document.createElement("div");
  kaboodleModule.className = "kaboodle-module";
  kaboodleTag.parentNode.insertBefore(kaboodleModule, kaboodleTag.nextSibling);
  /* most recently added kaboodle tag, i.e. this one */
  var kaboodles = document.getElementsByClassName("kaboodle-module");
  var index = kaboodles.length - 1;
  var kaboodleModuleNode = kaboodles[index];

  var kaboodleHeader = document.createElement("a");
  kaboodleHeader.className = "kaboodle-header";
  kaboodleHeader.href = 'https://github.com/ptsteadman/kaboodle';
  kaboodleHeader.innerHTML = "Sponsored Links";
  kaboodleModuleNode.appendChild(kaboodleHeader);
  
  var kaboodleItems = document.createElement("div");
  kaboodleItems.className = "kaboodle-items";
  kaboodleModuleNode.appendChild(kaboodleItems);
  
  randomize(creatives);

  window.addEventListener("resize", loadItems, false);

  function loadItems (){
    while (kaboodleItems.firstChild) {
      kaboodleItems.removeChild(kaboodleItems.firstChild);
    }

    var numItems;
    var width = kaboodleModuleNode.offsetWidth;
    var numCols = Math.floor(width / 240.0);
    for(var i = 0; i < numCols * numRows; i++){
      var creative = creatives[i % creatives.length];
      var kaboodleItemLink = document.createElement("a");
      kaboodleItemLink.href = creative["href"];
      kaboodleItemLink.onclick = function(){
        if(ga){
          ga('send', 'event', 
          'kaboodleAd', 'click', creative["href"], {'hitCallback':
             function () {
             document.location = creative["href"];
             }
          });
        }
      };
      kaboodleItems.appendChild(kaboodleItemLink);
      
      var kaboodleItemWrapper = document.createElement("div");
      kaboodleItemWrapper.className = "kaboodle-item"; 
      kaboodleItemLink.appendChild(kaboodleItemWrapper);
      
      var kaboodleItemImg = document.createElement("img");
      
      // Check if the creative has "creative" or "image" as the key for the image file
      if (creative["creative"]) {
        kaboodleItemImg.src = creative["creative"]; // Use "creative" key for image
      } else if (creative["image"]) {
        kaboodleItemImg.src = creative["image"]; // Use "image" key for image
      }
      
      kaboodleItemWrapper.appendChild(kaboodleItemImg);
      
      var kaboodleItemCaption = document.createElement("p");
      kaboodleItemCaption.innerHTML = creative["title"];
      kaboodleItemWrapper.appendChild(kaboodleItemCaption);
    }
  }

  loadItems();

  function randomize(creatives){
    for(var i = creatives.length - 1; i > 0; i--){
      var swapIndex = getRandomInt(0, i + 1);
      var tmp = creatives[swapIndex];
      creatives[swapIndex] = creatives[i];
      creatives[i] = tmp;
    }
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

})(window);
