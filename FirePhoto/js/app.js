// DOMContentLoaded is fired once the document has been loaded and parsed,
// but without waiting for other external resources to load (css/images/etc)
// That makes the app more responsive and perceived as faster.
// https://developer.mozilla.org/Web/Reference/Events/DOMContentLoaded
window.addEventListener('DOMContentLoaded', function() {

  // We'll ask the browser to use strict code to help us catch errors earlier.
  // https://developer.mozilla.org/Web/JavaScript/Reference/Functions_and_function_scope/Strict_mode
  'use strict';



  // We want to wait until the localisations library has loaded all the strings.
  // So we'll tell it to let us know once it's ready.


  // ---

  
  var photoDB = {};
  
  localforage.getItem("photos").then(function (result){
    
    if (result){
  
    photoDB = result;
      
    //initialization code
    for (var name in photoDB){
        
        var photo = photoDB[name];
        var img = document.createElement('img');
        img.src = URL.createObjectURL(photo.blob);
        var list = document.querySelector('.list');

      
        img.setAttribute('data-key', photo.blob.name);
        img.addEventListener("click", function () {
          //send photo name as the hash fragment
          var key = this.dataset.key;
          window.location.replace("card.html#" + key);
          
       }, false);
      
       list.appendChild(img);
        
     }
    }
    else
    {
      
     localforage.setItem("photos", photoDB, function (){
        
     //saved to db!
        
      });
      
    }
    
    
    
  });

  
  document.getElementById("btn").addEventListener("click", take, false);    

  
  function take(){
     console.log('in');
    
     var photoact = new MozActivity({
         name:"pick",
               data:{
                    type: "image/jpeg"
                }
            });    
    
     //Handle succes event
     photoact.onsuccess = function(){
       
        var photo = this.result;
        var img = document.createElement('img');
        img.src = URL.createObjectURL(photo.blob);
        var list = document.querySelector('.list');

        console.log("Got", photo);
       
        img.setAttribute('data-key', photo.blob.name);
        img.addEventListener("click", function () {
          //send photo name as the hash fragment
          var key = this.dataset.key;
          window.location.replace("card.html#" + key);
          console.log("test");
          
        }, false);
      

        list.appendChild(img);
       
      photoDB[photo.blob.name] = photo;
        localforage.setItem('photos', photoDB, function(){      
        alert("Photo saved.");
      });
     
      
    };
    
    
   



  }
  
});

