// This code was written by Shafil.

// This compiles code, and runs it.
function run(dat, html, css, js)
{

  document.getElementById('status').innerHTML = '<i class="fa fa-sync"></i> Running <i>main.simple</i>'

  setTimeout(function(){document.getElementById('status').innerHTML = '<i class="fa fa-check"></i> Everything is okay.'}, 3000);

  if(editor.getValue().includes('use: simple.ui'))
  {
  var data = initData(html, css, js)
  } else {
    data = 'Using basic rendering window. <br>'
  }

  $('#window').css('background', 'white');

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

  readFile(require('electron').remote.app.getAppPath() + "/run.html");

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
function compile(code)
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

  readFile(require('electron').remote.app.getAppPath() + "/compile.html");

  bootbox.dialog({
    title: 'Compile App',
    message: "<p>Choose a platform to compile your app.</p>",
    size: 'large',
    buttons: {
        win: {
            label: "Windows",
            className: 'btn-info',
            callback: function(){
              var fs_ = require("fs-extra");
              var fs = require("fs");

              document.getElementById('status').innerHTML = '<i class="fa fa-sync"></i> Compiling to Windows...'
           
              var dir = require('electron').remote.app.getAppPath() + '/';
              var source = dir + '/data/nw-win'
              var destination = sessionStorage["project"] + `/builds/win32_${Math.random().toString(36).slice(2)}/`
              var res = destination + "res/";
          
              fs.mkdirSync(destination);
              fs.mkdirSync(res);
              fs.mkdirSync(res + "simple/");
              fs.mkdirSync(res + "files/");
          
              fs_.copy(source, destination, function (err) {
                if (err){
                    console.log('An error occured while copying the folder.')
                    console.error(err);
                }
          
              fs_.copy(dir+'commands.js', res + "simple/commands.js");
              
              fs_.copy(sessionStorage["project"]+'/files/', res + "files/", function (err) {
                  if (err){
                      console.log('An error occured while copying the folder.')
                      return console.error(err)
                  }
          
                  var html = initData(ui.getHtml(), ui.getCss(), ui.getJs());
          
              html.replace(/\r/g, "").replace(/\n/g, "");
          
              if(editor.getValue().includes('use: simple.ui'))
              {
                data = data.replace('<simple></simple>', html);
              } else {
                data = data.replace('<simple></simple>', '');
              }
          
              data = data.replace('simple_app', sessionStorage["app"]);
          
              data = data.replace('<simple.code>', c);
          
              fs.writeFile(res + "simple/"+'ui.html', data, (err) => {
                if(err){
                    console.log("An error ocurred creating the file "+ err.message)
                }
              }); 
          
              var c = code;
          
              fs.writeFile(res + "simple/"+'main.simple', c, (err) => {
                if(err){
                    console.log("An error ocurred creating the file "+ err.message)
                }
              });
          
              bootbox.alert("done!");

              document.getElementById('status').innerHTML = '<i class="fa fa-check"></i> Everything is okay.'
          
              });  
          
            });
          
            }
        },
        noclose: {
            label: "Linux",
            className: 'btn-info',
            callback: function(){
              var fs_ = require("fs-extra");
              var fs = require("fs");

              document.getElementById('status').innerHTML = '<i class="fa fa-sync"></i> Compiling to Linux...'
           
              var dir = require('electron').remote.app.getAppPath() + '/';
              var source = dir + '/data/nw-linux'
              var destination = sessionStorage["project"] + `/builds/linux_${Math.random().toString(36).slice(2)}/`
              var res = destination + "res/";
          
              fs.mkdirSync(destination);
              fs.mkdirSync(res);
              fs.mkdirSync(res + "simple/");
              fs.mkdirSync(res + "files/");
          
              fs_.copy(source, destination, function (err) {
                if (err){
                    console.log('An error occured while copying the folder.')
                    console.error(err);
                }
          
              fs_.copy(dir+'commands.js', res + "simple/commands.js");
              
              fs_.copy(sessionStorage["project"]+'/files/', res + "files/", function (err) {
                  if (err){
                      console.log('An error occured while copying the folder.')
                      return console.error(err)
                  }
          
                  var html = initData(ui.getHtml(), ui.getCss(), ui.getJs());
          
              html.replace(/\r/g, "").replace(/\n/g, "");
          
              if(editor.getValue().includes('use: simple.ui'))
              {
                data = data.replace('<simple></simple>', html);
              } else {
                data = data.replace('<simple></simple>', '');
              }
          
              data = data.replace('simple_app', sessionStorage["app"]);
          
              data = data.replace('<simple.code>', c);
          
              fs.writeFile(res + "simple/"+'ui.html', data, (err) => {
                if(err){
                    console.log("An error ocurred creating the file "+ err.message)
                }
              }); 
          
              var c = code;
          
              fs.writeFile(res + "simple/"+'main.simple', c, (err) => {
                if(err){
                    console.log("An error ocurred creating the file "+ err.message)
                }
              });
          
              bootbox.alert("done!");

              document.getElementById('status').innerHTML = '<i class="fa fa-check"></i> Everything is okay.'
          
              });  
          
            });
            }
        },
        ok: {
            label: "macOS",
            className: 'btn-info',
            callback: function(){
              var fs_ = require("fs-extra");
              var fs = require("fs");

              document.getElementById('status').innerHTML = '<i class="fa fa-sync"></i> Compiling to macOS...'
           
              var dir = require('electron').remote.app.getAppPath() + '/';
              var source = dir + '/data/nw-mac/'
              var destination = sessionStorage["project"] + `/builds/mac_${Math.random().toString(36).slice(2)}/`
              var res = destination + "/simple_runtime_nw.app/Contents/Frameworks/nwjs Framework.framework/Versions/78.0.3904.97/Resources/res/";

              fs.mkdirSync(destination);
          
              fs_.copy(source, destination, function (err) {
                if (err){
                    console.log('An error occured while copying the folder.')
                    console.error(err);
                }

                fs.mkdirSync(res);
                fs.mkdirSync(res + "simple/");
                fs.mkdirSync(res + "files/");
          
              fs_.copy(dir+'commands.js', res + "simple/commands.js");
              
              fs_.copy(sessionStorage["project"]+'/files/', res + "files/", function (err) {
                  if (err){
                      console.log('An error occured while copying the folder.')
                      return console.error(err)
                  }
          
                  var html = initData(ui.getHtml(), ui.getCss(), ui.getJs());
          
              html.replace(/\r/g, "").replace(/\n/g, "");
          
              if(editor.getValue().includes('use: simple.ui'))
              {
                data = data.replace('<simple></simple>', html);
              } else {
                data = data.replace('<simple></simple>', '');
              }
          
              data = data.replace('simple_app', sessionStorage["app"]);
          
              data = data.replace('<simple.code>', c);
          
              fs.writeFile(res + "simple/"+'ui.html', data, (err) => {
                if(err){
                    console.log("An error ocurred creating the file "+ err.message)
                }
              }); 
          
              var c = code;
          
              fs.writeFile(res + "simple/"+'main.simple', c, (err) => {
                if(err){
                    console.log("An error ocurred creating the file "+ err.message)
                }
              });
          
              bootbox.alert("done!");

              document.getElementById('status').innerHTML = '<i class="fa fa-check"></i> Everything is okay.'
          
              });  
          
            });
            }
        }
    }
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

function browser(){

    $('#win-left').append('<div id="browser"><div class="left" id="browser-inner"> <iframe style="width: 50%; height: 100%; postion: absolute;" src="https://alamshafil.github.io/simple/"></div></div>');
    $('#left-tab').append('<li role="presentation"><a style="color:white" href="#browser" id="tabby-toggle_code" role="tab" aria-controls="browser" tabindex="0"><i class="fas fa-globe"></i> App Store</a></li>');
}