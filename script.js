let x =""
let x2 =""
document.getElementById('travelForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const destination = document.getElementById('destination').value;
    
    const preferences = document.getElementById('preferences').value;
    
    const paragraph ="Give me the top 10 attractions in "+ destination+ " with these preferences "+ preferences+" and im not giving you more information so you have to give me an output. YOU CAN NOT ASK FOR MORE INFORMATION AND DO NOT PUT EXTRA STUFF AROUND THE LIST. Format dictionaries like the following (all in the format of a java list but not in actual code. That means only 1 pair of closed square brackets[]for the list and 10 pairs of {} for the dictionary): 'name': name, 'description': description, 'address': address, 'rating': rating, 'time': time, 'website': website"
    // Example of a basic itinerary (replace this with your AI integration logic)
    const itinerary = `
        <p>Trip to <strong>${destination}</strong></p>
        <p><strong>Start Date:</strong> ${startDate} at ${startTime}</p>
        <p><strong>End Date:</strong> ${endDate} at ${endTime}</p>
        <p>Please wait....
    `;
  
    document.getElementById('itineraryContent').innerHTML = itinerary;
  
    
    console.log(paragraph);
  const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCpBXvGtjLaBaX--Smflw-lPNoz1nlIH1Q",
    "method": "POST",
    "headers": {
      "Content-Type": "application/json"
    },
    "processData": false,
    "data": "{\"contents\":[{\"parts\":[{\"text\":\""+paragraph+"\"}]}]}"
  };


  
  $.ajax(settings).done(function (response) {
    x = response.candidates[0].content.parts[0].text;
    console.log(x);
    x=x.substring(1,x.length-1)
    console.log(x.split("{"))
    x=x.split("{")
    for(let i=1;i<11;i++){
      let dictionary = {};
     
      dictionary["name"] = x[i].substring(x[i].indexOf("name")+8,x[i].indexOf("'",x[i].indexOf("name")+8+5));
      dictionary["description"] = x[i].substring(x[i].indexOf("description")+15,x[i].indexOf("'",x[i].indexOf("description")+15+5));
      dictionary["address"] = x[i].substring(x[i].indexOf("address")+11,x[i].indexOf("'",x[i].indexOf("address")+11+5));
      console.log(x[i].substring(x[i].indexOf(",",x[i].indexOf("rating")+9)-1,x[i].indexOf(",",x[i].indexOf("rating")+9)))
      if(dictionary["rating"] = x[i].substring(x[i].indexOf(",",x[i].indexOf("rating")+9)-1,x[i].indexOf(",",x[i].indexOf("rating")+9))=="'"){
      dictionary["rating"] = x[i].substring(x[i].indexOf("rating")+9,x[i].indexOf(",",x[i].indexOf("rating")+9)-1);
      }
      else{
        dictionary["rating"] = x[i].substring(x[i].indexOf("rating")+9,x[i].indexOf(",",x[i].indexOf("rating")+9));
      }
      dictionary["time"] = x[i].substring(x[i].indexOf("time")+8,x[i].indexOf("'",x[i].indexOf("time")+8+5));
      dictionary["website"] = x[i].substring(x[i].indexOf("website")+11,x[i].indexOf("'",x[i].indexOf("website")+11+1));
  
      x[i]=dictionary;
  
      console.log(dictionary)
  
    }
    x.shift();
    let itineraryHTML = "";
    x.forEach(item => {
        itineraryHTML += `
            <div class="itinerary-item">
                <div class="title-container">
                    <input type="checkbox" id="attraction-${item.name}" name="attraction-${item.name}">
                    <h3>${item.name}</h3>
                </div>
                <p><strong>Description:</strong> ${item.description}</p>
                <p><strong>Address:</strong> ${item.address}</p>
                <p><strong>Rating:</strong> ${item.rating}</p>
                <p><strong>Open/Close Time:</strong> ${item.time}</p>
                <p><strong>Website:</strong> <a href="${item.website}" target="_blank">${item.website}</a></p>
            </div>
            <hr>
        `;
    });
   
  
  
    button= '<button  type="submit" class="btn">Make schedule</button>'
    
    
  
    // Display the generated itinerary in the HTML
    document.getElementById('itineraryContent').innerHTML = itineraryHTML;
    document.getElementById('schedule').innerHTML= button;

  });
    
  
  });
  
  document.getElementById('schedule').addEventListener('submit', function(e) {
    e.preventDefault();
   
    x2= "I want to go to"
    x.forEach(item => {
      if(document.getElementById("attraction-"+item.name).checked){
        x2+= ","+item.name



      }
    });
    const startDate = document.getElementById('startDate').value;
    const startTime = document.getElementById('startTime').value;
    const endDate = document.getElementById('endDate').value;
    const endTime = document.getElementById('endTime').value;

    x2 += " make me a schedule for me. Im going from "+startDate+" at "+ startTime + " to " + endDate + " at " + endTime+". YOU WILL NOT RECIEVE MORE INFO AND YOU MUST RESPOND WITH A SCHEDULE";
    const settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCpBXvGtjLaBaX--Smflw-lPNoz1nlIH1Q",
      "method": "POST",
      "headers": {
        "Content-Type": "application/json"
      },
      "processData": false,
      "data": "{\"contents\":[{\"parts\":[{\"text\":\""+x2+"\"}]}]}"
    };
  
  
    
    $.ajax(settings).done(function (response) {
      res = response.candidates[0].content.parts[0].text;
      console.log(res);


      
    });
  });
      