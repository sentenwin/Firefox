

window.addEventListener('DOMContentLoaded', function() {

  var photoid = window.location.hash.substring(1),
      photo = null,
      photoDB;
  
  var cardimg = document.getElementById("cardimg");
  localforage.getItem("photos").then(function (result){
    photoDB = result;
    photo = result[photoid];
    console.log(photoid);
    var url = URL.createObjectURL(photo.blob);
    cardimg.setAttribute("src", url);
    
  });
  
  
  document.querySelector('.del').addEventListener("click", removePic, false);
  
  function removePic(){
   
      var photos = navigator.getDeviceStorage("pictures");
      var photoid =  photo.blob.name;
    
      var trydelete = photos.delete(photo.blob.name);
      console.log(photo.blob.name);
      console.log(photoid);
    
      trydelete.onsuccess = function () {        
        delete photoDB[photoid];
        console.log("deleted");
        localforage.setItem("photos", photoDB);
        window.location.replace("index.html");
      };
     
     trydelete.onerror = function () {
       alert("Unable to delete");
     }    
    
  }     
  
 
  document.querySelector('.share').addEventListener("click", sharePic, false);
  
  function sharePic(){ 
    
      var blob = photo.blob;
      new MozActivity({

        name : "share",
        data : {

          type: "image/*",
          number: 1,
          blobs: [blob]
        }
      });
      
  } 
  
  
   document.querySelector('.upload').addEventListener("click", uploadPic, false);
  
   
   function uploadPic(){
     //alert("Sure?");
     var file = photo.blob;
     console.log(photo.blob);
     
     //create object for form data
     var fd = new FormData();
     
     //Add file to form data
     fd.append("image", file);
     
     
     var xhr = new XMLHttpRequest();
     xhr.open("POST", "https://api.imgur.com/3/image.json");

     xhr.onload = function () {       
       console.log("started");
       var data = JSON.parse(xhr.responseText).data;
       var imagurURL = data.link;
       window.open(imagurURL.split('.j')[0]);              
     }
     
     var clientId = 'Client-ID 1ca3a1cf63cc8bc';
     xhr.setRequestHeader('Authorization', clientId);
     xhr.send(fd);          
   }
  
});