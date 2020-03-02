// This code was written by Shafil.

// Gets API ready
function API()
{
  function initData()
  {
    return editor.getValue();
  }

  function parse(e)
  {
    return e.toString().match(/function[^{]+\{([\s\S]*)\}$/)[1];
  }

  function initAPI(e)
  {
    var _eval = e;
    eval(_eval);
    $("#run-btn").click(function() {
      eval(_eval);
    });
  }

  function getWindow()
  {
    return document.getElementById('window');
  }

  return {
    initData: initData,
    parse: parse,
    initAPI: initAPI,
    getWindow: getWindow
  };
}

// Sends data from the run function.
function send(data)
{
  $("#output").append(`${data} <br>`)
}

// Gets rid of HTML tags.
function clean(string)
{
  string = string.replace(/<[^>]*>?/gm, '');
  return string;
}

// Tabs Code
function openPage(pageName, elmnt, color) {
  // Hide all elements with class="tabcontent" by default */
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Remove the background color of all tablinks/buttons
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }

  // Show the specific tab content
  document.getElementById(pageName).style.display = "block";

  // Add the specific color to the button used to open the tab content
  elmnt.style.backgroundColor = color;
}

// Load HaxPro API apps 
function loadAPI(url) {

  var e = document.createElement("script");
  e.src = url;

  if(document.head.innerHTML.toString().includes(e.outerHTML)){
    return;
  } else {

  var script = document.createElement("script");  // create a script DOM node
  script.src = url;  // set its src to the provided URL

  document.head.appendChild(script);  // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
  return;
  }
}

function startFocusOut(){
  $(document).on("click",function(){
  $("#cntnr").hide();        
  $(document).off("click");
  });
}

// Loading screen
window.onload = (function() {
  // Animate loader off screen
  $(".se-pre-con").fadeOut("slow");;
});

function string(e){
  return `"${e}"`
}


function getPath(path) {
  var array = path.split('\\');
  array.pop();
  return( array.join('\\') );
}

function collapse() {
  $('#win-right').css('display', 'none');
  $('#win-left').removeClass('left');
  $('#editor').removeClass('left');
  document.getElementById('collapse').innerHTML = '<button style="color: white;" class="btn btn-darker shadow-none" onclick="un_collapse()"><i class="fa fa-angle-left"></i></button>';

}

function un_collapse() {
  $('#win-left').addClass('left');
  $('#editor').addClass('left');
  $('#win-right').css('display', 'block');
  document.getElementById('collapse').innerHTML = '<button style="color: white;" class="btn btn-darker shadow-none" onclick="collapse()"><i class="fa fa-angle-right"></i></button>';
}

function requestFullScreen() {

  if ((document.fullScreenElement && document.fullScreenElement !== null) ||    
   (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if (document.documentElement.requestFullScreen) {  
      document.documentElement.requestFullScreen();  
    } else if (document.documentElement.mozRequestFullScreen) {  
      document.documentElement.mozRequestFullScreen();  
    } else if (document.documentElement.webkitRequestFullScreen) {  
      document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);  
    }  
  } else {  
    if (document.cancelFullScreen) {  
      document.cancelFullScreen();  
    } else if (document.mozCancelFullScreen) {  
      document.mozCancelFullScreen();  
    } else if (document.webkitCancelFullScreen) {  
      document.webkitCancelFullScreen();  
    }  
  }  
}
