function run_gui(dat, html, css, js)
{

  document.getElementById('status').innerHTML = '<i class="fa fa-sync"></i> Running <i>main.hax</i>'

  setTimeout(function(){document.getElementById('status').innerHTML = '<i class="fa fa-check"></i> Everything is okay.'}, 3000);

  if(editor.getValue().includes('use: haxpro.ui'))
  {
  //var data = initData_gui(html, css, js)
  data = '';
  } else {
    data = 'Using basic rendering window. <br>'
  }

  $('#output').css('background', 'white');

  $('#console').empty();
  $('#output').empty();
  $('#output').off();
  $('#output').append(data);
  runEditor_gui(dat);
}

// Gets data ready to compile
function initData_gui(h, c, j)
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

  readFile(require('electron').remote.app.getAppPath() + "/html/run.html");

  var init = data;
  init = init.replace(/\r/g, "").replace(/\n/g, "");

  var html = h;
  var css = c;
  var js = j;

  html = html.replace(/\r/g, "").replace(/\n/g, "");
  css = css.replace(/\r/g, "").replace(/\n/g, "");
  js = js.replace(/\r/g, "").replace(/\n/g, "");

  init = init.replace('<!-- [hax.html] -->', html).replace('/* [hax.css] */', css).replace('// [hax.js] //', js);

  return init;
}

// Compiles code, and turns it into a exe file.
function compile_gui(code)
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

  readFile(require('electron').remote.app.getAppPath() + "/html/compile.html");

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
              var source = 'C:\\Program Files (x86)\\HaxPro SDK\\compilers-win\\gui\\nw-win'
              var destination = sessionStorage["project"] + `/builds/win32_${Math.random().toString(36).slice(2)}/`
              var res = destination + "res/";
          
              fs.mkdirSync(destination);
              fs.mkdirSync(res);
              fs.mkdirSync(res + "hax/");
              fs.mkdirSync(res + "files/");
          
              fs_.copy(source, destination, function (err) {
                if (err){
                    bootbox.alert(err);
                }
          
              fs_.copy(dir+'commands.js', res + "hax/commands.js");
              
              fs_.copy(sessionStorage["project"]+'/files/', res + "files/", function (err) {
                  if (err){
                    bootbox.alert(err);
                    return;
                  }
          
                  //var html = initData_gui(ui.getHtml(), ui.getCss(), ui.getJs());
                  var html = '';
          
              html.replace(/\r/g, "").replace(/\n/g, "");
          
              if(editor.getValue().includes('use: hax.ui'))
              {
                data = data.replace('<hax></hax>', html);
              } else {
                data = data.replace('<hax></hax>', '');
              }
          
              data = data.replace('hax_app', sessionStorage["app"]);
          
              data = data.replace('[hax.code]', c);
          
              fs.writeFile(res + "hax/"+'ui.html', data, (err) => {
                if(err){
                  bootbox.alert("An error ocurred creating the file "+ err.message)
                }
              }); 
          
              var c = code;
          
              fs.writeFile(res + "hax/"+'main.hax', c, (err) => {
                if(err){
                  bootbox.alert("An error ocurred creating the file "+ err.message)
                }
              });
          
              bootbox.alert("Finished compiling file!");

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
              var source = dir + 'C:\\Program Files (x86)\\HaxPro SDK\\compilers-linux\\gui\\nw-linux'
              var destination = sessionStorage["project"] + `/builds/linux_${Math.random().toString(36).slice(2)}/`
              var res = destination + "res/";
          
              fs.mkdirSync(destination);
              fs.mkdirSync(res);
              fs.mkdirSync(res + "hax/");
              fs.mkdirSync(res + "files/");
          
              fs_.copy(source, destination, function (err) {
                if (err){
                  bootbox.alert(err);
                }
          
              fs_.copy(dir+'/js/commands.js', res + "hax/commands.js");
              
              fs_.copy(sessionStorage["project"]+'/files/', res + "files/", function (err) {
                  if (err){
                      bootbox.alert(err);
                      return;
                  }
          
                  var html = initData_gui(ui.getHtml(), ui.getCss(), ui.getJs());
          
              html.replace(/\r/g, "").replace(/\n/g, "");
          
              if(editor.getValue().includes('use: hax.ui'))
              {
                data = data.replace('<hax></hax>', html);
              } else {
                data = data.replace('<hax></hax>', '');
              }
          
              data = data.replace('hax_app', sessionStorage["app"]);
          
              data = data.replace('[hax.code]', c);
          
              fs.writeFile(res + "hax/"+'ui.html', data, (err) => {
                if(err){
                  bootbox.alert("An error ocurred creating the file "+ err.message)
                }
              }); 
          
              var c = code;
          
              fs.writeFile(res + "hax/"+'main.hax', c, (err) => {
                if(err){
                  bootbox.alert("An error ocurred creating the file "+ err.message)
                }
              });
          
              bootbox.alert("Finished compiling file!");

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
              var source = dir + 'C:\\Program Files (x86)\\HaxPro SDK\\compilers-mac\\gui\\nw-mac'
              var destination = sessionStorage["project"] + `/builds/mac_${Math.random().toString(36).slice(2)}/`
              var res = destination + "/simple_runtime_nw.app/Contents/Frameworks/nwjs Framework.framework/Versions/78.0.3904.97/Resources/res/";

              fs.mkdirSync(destination);
          
              fs_.copy(source, destination, function (err) {
                if (err){
                  bootbox.alert(err)
                }

                fs.mkdirSync(res);
                fs.mkdirSync(res + "hax/");
                fs.mkdirSync(res + "files/");
          
              fs_.copy(dir+'/js/commands.js', res + "hax/commands.js");
              
              fs_.copy(sessionStorage["project"]+'/files/', res + "files/", function (err) {
                  if (err){
                    bootbox.alert(err);
                    return;
                  }
          
                  var html = initData_gui(ui.getHtml(), ui.getCss(), ui.getJs());
          
              html.replace(/\r/g, "").replace(/\n/g, "");
          
              if(editor.getValue().includes('use: haxpro.ui'))
              {
                data = data.replace('<hax></hax>', html);
              } else {
                data = data.replace('<hax></hax>', '');
              }
          
              data = data.replace('hax_app', sessionStorage["app"]);
          
              data = data.replace('[hax.code]', c);
          
              fs.writeFile(res + "hax/"+'ui.html', data, (err) => {
                if(err){
                  bootbox.alert("An error ocurred creating the file "+ err.message)
                }
              }); 
          
              var c = code;
          
              fs.writeFile(res + "hax/"+'main.hax', c, (err) => {
                if(err){
                  bootbox.alert("An error ocurred creating the file "+ err.message)
                }
              });
          
              bootbox.alert("Finished compiling file!");

              document.getElementById('status').innerHTML = '<i class="fa fa-check"></i> Everything is okay.'
          
              });  
          
            });
            }
        }
    }
});


}