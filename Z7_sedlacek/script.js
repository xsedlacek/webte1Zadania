var jsonPhotos;
var listOfImagePaths = "";
var slideShowRunning = false;
var searchLenght = 0;

$(document).ready(function(){
  $.ajax({
    url: "images/images.json",
    type: "GET",
    dataType: "json",
    success: function(data){
      jsonPhotos = data;
      document.cookie = jsonPhotos;
      loadPathsFromJson(data);
    },
    error: function(){
        alert("json not found");
    }
  });
  
  $(function() { 
    $("#images-preview").sortable({ 
    update: function(event, ui) { 
        getIdsOfImages(); 
    }          
    }); 
}); 
})

function loadPathsFromJson(json){
  let jsonCookie = getCookie("imagesOrder");
    
  $("#images-preview").empty();
  if (jsonCookie != null && jsonCookie.length != 0)
  {
    let pathsOrder = getCookie("imagesOrder").split(":");
    for(i =0; i < pathsOrder.length; i++)
    {
      let currentObject = jsonPhotos["photos"].find(o => o.src === pathsOrder[i]);
      if (currentObject == null)
        continue;
      if (currentObject["title"].toLowerCase().includes(searchBox.value.toLowerCase()) || currentObject["description"].toLowerCase().includes(searchBox.value.toLowerCase()))
      {
        loadImage(currentObject, "#images-preview");
      }
    }
  } else {
    for(i=0; i < json["photos"].length; i++)
    {
      let obj = json["photos"][i];
      listOfImagePaths += obj["src"] + ":";
      loadImage(obj,"#images-preview");
    }
    setCookie("imagesOrder",listOfImagePaths,true);
  }
  
}

function loadImage(obj, target) {
  let path = "images/" + obj["src"];
  let alt = obj["title"];
  let linkId="a-" + obj["src"];
  $(target).append('<a onclick="slideShowOption()" class="mx-auto" href="' + path + '" data-lightbox="roadtrip" id="' + linkId + '" data-title="' + obj["title"]  + ". <br>" + obj["description"] + '" data-alt="' + alt  + '"></a>');
  document.getElementById(linkId).innerHTML = '<img src="'+ path +'" id="' + obj["src"] +'" class="rounded mx-auto d-bloc img-thumbnail listitemClass" alt="' + alt + '" >';

  let list = document.getElementsByClassName("lb-close");
  for (index = 0; index < list.length; ++index) 
    list[index].setAttribute( "onClick", "closeLightbox()" );

  list = document.getElementById("lightbox").setAttribute( "onClick", "closeLightbox()" );
}

function search(){
  let searchBox = document.getElementById("searchBox");
  document.getElementById("images-preview").innerHTML = "";

  if (searchBox.value.length > searchLenght){
    searchLenght++;
  } else{
    searchLenght--;
    eraseCookie("imagesOrder");
    
    listOfImagePaths="";
    for(i=0; i < jsonPhotos["photos"].length; i++)
    {
      let obj = jsonPhotos["photos"][i];
      listOfImagePaths += obj["src"] + ":";
      loadImage(obj,"#images-preview");
    }
    setCookie("imagesOrder",listOfImagePaths,true);

    return;
  }

  let pathsOrder = getCookie("imagesOrder").split(":");

  for(i =0; i < pathsOrder.length; i++)
  {
    let currentObject = jsonPhotos["photos"].find(o => o.src === pathsOrder[i]);
    if (currentObject == null)
      continue;
    if (currentObject["title"].toLowerCase().includes(searchBox.value.toLowerCase()) || currentObject["description"].toLowerCase().includes(searchBox.value.toLowerCase()))
    {
      loadImage(currentObject, "#images-preview");
    }
  }
}

function setCookie(name,value,days) {
  var expires = "";
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

function eraseCookie(name) {   
  document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
  
function getIdsOfImages() { 
    var values = ""; 
    $('.listitemClass').each(function (index) { 
        values += $(this).attr("id") + ":"; 
    }); 
      
    $('#outputvalues').val(values); 
    eraseCookie("imagesOrder");
    setCookie("imagesOrder",values,true);
} 

function slideShowOption()
{
  document.getElementById("slideshow-button").style.display = "block";
}

function closeLightbox()
{
  document.getElementById("slideshow-button").style.display = "none";
  slideShowRunning = false;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function runSlideShow()
{
  if (slideShowRunning){
    slideShowRunning = false;
  } 
  else {
    slideShowRunning = true;
    keepWaiting();
  } 
}

async function keepWaiting()
{
  while (slideShowRunning == true){
    await sleep(2000);

    let list = document.getElementsByClassName("lb-next");
    list[0].click();
  } 
}