// This code was written by Shafil.

// Gets API ready
function API() {
  function initData() {
    return editor.getValue();
  }

  function parse(e) {
    return e.toString().match(/function[^{]+\{([\s\S]*)\}$/)[1];
  }

  function initAPI(e) {
    var _eval = e;
    eval(_eval);
    $("#run-btn").click(function () {
      eval(_eval);
    });
  }

  function getWindow() {
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
function send(data) {
  $("#output").append(`${data} <br>`)
}

// Gets rid of HTML tags.
function clean(string) {
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

  if (document.head.innerHTML.toString().includes(e.outerHTML)) {
    return;
  } else {

    var script = document.createElement("script");  // create a script DOM node
    script.src = url;  // set its src to the provided URL

    document.head.appendChild(script);  // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
    return;
  }
}

function startFocusOut() {
  $(document).on("click", function () {
    $("#cntnr").hide();
    $(document).off("click");
  });
}

// Loading screen
window.onload = (function () {
  // Animate loader off screen
  $(".se-pre-con").fadeOut("slow");;
});

function string(e) {
  return `"${e}"`
}


function getPath(path) {
  var array = path.split('\\');
  array.pop();
  return (array.join('\\'));
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

function sendFeedback(e) {
  var request = new XMLHttpRequest();
  request.open("POST", "https://discordapp.com/api/webhooks/688048825750913027/IA7B1BTRJdBWQUh4rD8ArBgUCnNkv2S80ayCwxrJ2QehrvO9aCUa6W-bcl9gwvnYZu6c");

  request.setRequestHeader('Content-type', 'application/json');

  var params = {
    username: "HaxPro Bot",
    avatar_url: "",
    content: "<@453319777918648333>",
    embeds: [{
      "title": "Feedback",
      "description": e
    }]
  }

  request.send(JSON.stringify(params));
}

function debug(bool) {
  if (bool) {
    $("#debug-window").css('display', 'block');
    $("#debug-hide").css('display', 'none');
  } else if (!bool) {
    $("#debug-window").css('display', 'none');
    $("#debug-hide").css('display', 'block');
  }
}

function gitDownload() {
  if(sessionStorage['name'] == undefined){
    bootbox.dialog({
      title: 'Error',
      message: "You must create a new project in order to download from the cloud.",
      buttons: {
          ok: {
          label: "Ok",
              className: 'btn-info',
              callback: function(){
                return;
              }
          }
      }
    })
  } else {
    bootbox.dialog({
      title: 'Warning',
      message: "You are about to overwrite the current project.",
      buttons: {
          ok: {
          label: "Ok",
              className: 'btn-info',
              callback: function(){
                bootbox.dialog({
                  title: 'GitHub',
                  message: '<div class="container"> <h1 class="display-3"><i class="fab fa-github"></i> Clone Repo</h1> <br> <div class="form-group "> <label class="" for="name_f">Username</label> <input type="text" class="form-control " id="name_f" aria-describedby="emailHelp" placeholder=""> </div> <div class="form-group "> <label class="" for="git_f">Repo name</label> <input type="text" class="form-control " id="git_f" placeholder=""> </div> ',
                  buttons: {
                    ok: {
                      label: "Send",
                      className: 'btn-info',
                      callback: function () {
                       var username = $("#name_f").val();
                       var repo = $('#git_f').val();
                       var cloneURL = (`https://github.com/${username}/${repo}.git`);

                       var fs = require('fs');
                       var fs_ = require('fs-extra');
                       var path = require('path');
                       var NodeGit = require("nodegit");

                       fs_.emptyDirSync(sessionStorage["project"] + '/code');
                       fs_.emptyDirSync(sessionStorage["project"] + '/builds');
                       fs_.emptyDirSync(sessionStorage["project"] + '/files');
                     
                       fs_.rmdirSync(sessionStorage["project"] + '/code');
                       fs_.rmdirSync(sessionStorage["project"] + '/builds');
                       fs_.rmdirSync(sessionStorage["project"] + '/files');
                     
                       fs_.removeSync(sessionStorage["project"] + '/app.haxproj');
            
              
                       var rnd = Math.random().toString(36).slice(2)
                       var localPath = path.join(sessionStorage["project"], `/git/`);
                       var cloneOptions = {};
                       cloneOptions.fetchOpts = {
                        callbacks: {
                          certificateCheck: function() { return 0; }
                        }
                      };
              
                      NodeGit.Clone(cloneURL, localPath, cloneOptions)

                      fs_.emptyDirSync(sessionStorage["project"] + '/code');
                      fs_.emptyDirSync(sessionStorage["project"] + '/builds');
                      fs_.emptyDirSync(sessionStorage["project"] + '/files');
                    
                      fs_.rmdirSync(sessionStorage["project"] + '/code');
                      fs_.rmdirSync(sessionStorage["project"] + '/builds');
                      fs_.rmdirSync(sessionStorage["project"] + '/files');
                    
                      fs_.removeSync(sessionStorage["project"] + '/app.haxproj');
                    
                      fs_.copy(localPath, sessionStorage["project"], { overwrite: true, errorOnExist: false })
                        .then(() => console.log('success!'))
                        .catch(err => console.error(err))

                        bootbox.alert('Done!');
                      }  
                    }
                  }
              })
            }
          },
      }
    })
  }
}