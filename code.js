// This code was written by Shafil.

// This compiles code, and runs it.
function run(dat, html, css, js)
{

  if(editor.getValue().includes('use: simple.ui'))
  {
  var data = initData(html, css, js)
  } else {
    data = 'Using basic rendering window. <br>'
  }

  $('#console').empty();
  $('#window').empty();
  $('#window').off();
  $('#window').append(data);
  runEditor(dat);
}

// Gets data ready to compile
function initData(h, c, j)
{
  var data;

  function readFile(file)
  {
    var f = new XMLHttpRequest();
    f.open("GET", file, false);
    f.onreadystatechange = function ()
    {
        if(f.readyState === 4)
        {
            if(f.status === 200 || f.status == 0)
            {
                var res= f.responseText;
                setData(res); 
            }
        }
      }

    f.send(null);
  }


  function setData(xhr)
  {
    data = xhr;
  }

  readFile(window.location.href.replace('/index.html', '/run.html'));

  var init = data;
  init = init.replace(/\r/g, "").replace(/\n/g, "");

  var html = h;
  var css = c;
  var js = j;

  html = html.replace(/\r/g, "").replace(/\n/g, "");
  css = css.replace(/\r/g, "").replace(/\n/g, "");
  js = js.replace(/\r/g, "").replace(/\n/g, "");

  init = init.replace('<!-- [simple.html] -->', html).replace('/* [simple.css] */', css).replace('// [simple.js] //', js);

  return init;
}

// Compiles code, and turns it into a exe file.
function compile(code, data)
{
  var zip = new JSZip();
zip.file("index.html", data);
zip.file("code.simple", code);
zip.generateAsync({type:"blob"})
.then(function(content) {
    saveAs(content, "test.zip");
});
}

// Get data to compile file.
function getData()
{
  var data;

  function readFile(file)
  {
    var f = new XMLHttpRequest();
    f.open("GET", file, false);
    f.onreadystatechange = function ()
    {
        if(f.readyState === 4)
        {
            if(f.status === 200 || f.status == 0)
            {
                var res= f.responseText;
                setData(res); 
            }
        }
      }

    f.send(null);
  }


  function setData(xhr)
  {
    data = xhr;
  }

  readFile("file:///C:/Users/Shafil/Desktop/Simple/compile.html")

  return data; 
}

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
  $("#window").append(`${data} <br>`)
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

// Load Simple API apps 
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

// Context Menu
$(document).bind("contextmenu",function(e){
  e.preventDefault();
  console.log(e.pageX + "," + e.pageY);
  $("#cntnr").css("left",e.pageX);
  $("#cntnr").css("top",e.pageY);
 // $("#cntnr").hide(100);        
  $("#cntnr").fadeIn(200,startFocusOut());      
});

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

function collapse() {
  $('#win-right').css('display', 'none');
  $('#win-left').removeClass('left');
  $('#editor').removeClass('left');
  document.getElementById('collapse').innerHTML = '<button class="btn btn-dark" onclick="un_collapse()"><i class="fa fa-angle-left"></i></button>';

}

function un_collapse() {
  $('#win-left').addClass('left');
  $('#editor').addClass('left');
  $('#win-right').css('display', 'block');
  document.getElementById('collapse').innerHTML = '<button class="btn btn-dark" onclick="collapse()"><i class="fa fa-angle-right"></i></button>';
}