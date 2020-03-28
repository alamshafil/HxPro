function run_gui(code, block, editor)
{
  var data;
  var c;

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

  
  if(checkSDK() == false){
    bootbox.dialog({
      title: 'Missing HaxPro SDK',
      message: "You are missing the HaxPro SDK, this is needed to build apps. You can install it by pressing <b>Install</b>.",
      buttons: {
          ok: {
          label: "Install",
              className: 'btn-info',
              callback: function(){
                bootbox.alert("ok you have big problem idk")
              }
            },
            report: {
              label: "Close",
                  className: 'btn-info',
                  callback: function(){
                    return;
                  }
                }
      }
    })
  } else if(checkSDK() == true){

    if(editor == 'code'){
      c = code;
    } else if(editor == 'block'){
      c = block;
    }

  var fs_ = require("fs-extra");
  var fs = require("fs");

  document.getElementById('status').innerHTML = '<i class="fa fa-sync"></i> Building ~/code/main.hax to ~/builds/temp...'

  var dir = require('electron').remote.app.getAppPath() + '/';
  var source = 'C:/Program Files (x86)/HaxPro SDK/compilers-win/gui/nw-win'
  var rnd = `/builds/temp/win32_${Math.random().toString(36).slice(2)}`
  var destination = sessionStorage["project"] + `${rnd}/`
  var res = destination + "res/";

  fs.mkdirSync(destination);
  fs.mkdirSync(res);
  fs.mkdirSync(res + "/hax/");
  fs.mkdirSync(res + "/hax/files");

  fs_.copy(source, destination, function (err) {
    if (err){
        bootbox.alert(err);
    }

  fs_.copy(dir+'/js/gui/runtime.js', res + "hax/runtime.js");
  
  fs_.copy(sessionStorage["project"]+'/files/', res + "hax/files", function (err) {
      if (err){
        bootbox.alert(err);
        return;
      }

      var html = initData_gui(ui.getHtml(), ui.getCss(), ui.getJs());
      //var html = '';

  html.replace(/\r/g, "").replace(/\n/g, "");

  if(c.includes('use: haxpro.ui'))
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

  fs.writeFile(res + "hax/"+'main.hax', c, (err) => {
    if(err){
      bootbox.alert("An error ocurred creating the file "+ err.message)
    }
  });


    document.getElementById('status').innerHTML = '<i class="fa fa-check"></i> Everything is okay.';

    openTab(event, 'output');
    debug(true);

    const { spawn } = require('child_process');
    const child = spawn(destination + '/haxpro_runtime.exe');
    let pidusage = require('pidusage');

    var timeouts = [];

    timeouts.push(setInterval(function(){ pidusage(child.pid, function (err, stats) {
      document.getElementsByClassName('debug-mem')[0].innerHTML = `
      CPU: ${Math.round(stats.cpu)}% <br>
      Memory: ${Math.round(stats.memory / 1e+6)}MB <br>
      Elapsed Time: ${Math.round(stats.elapsed / 1000)} seconds <br>
      PID: ${stats.pid} <br>
      `;   
      })}, 1000));


    child.on('exit', function (code, signal) {
        for (var i = 0; i < timeouts.length; i++) {
          clearTimeout(timeouts[i]);
      }
      timeouts = [];
      let fs_ = require('fs-extra');
      fs_.emptyDir(sessionStorage["project"] + "/builds/temp/")
      console.log('Child process exited with ' + `code ${code} and signal ${signal}`);
      debug(false);
    });
  

        });   
     });
  }
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
function compile_gui(code, block, editor)
{
  var data;
  var c;

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

  if(checkSDK() == false){
    bootbox.dialog({
      title: 'Missing HaxPro SDK',
      message: "You are missing the HaxPro SDK, this is needed to build apps. You can install it by pressing <b>Install</b>.",
      buttons: {
          ok: {
          label: "Install",
              className: 'btn-info',
              callback: function(){
                bootbox.alert("ok you have big problem idk")
              }
            },
            report: {
              label: "CLose",
                  className: 'btn-info',
                  callback: function(){
                    return;
                  }
                }
      }
    })
  } else if(checkSDK() == true){

    if(editor == 'code'){
      c = code;
    } else if(editor == 'block'){
      c = block;
    }


  bootbox.dialog({
    title: 'Compile App',
    message: "<p>Choose a platform to compile your app.</p>",
    size: 'large',
    buttons: {
        win: {
            label: "<i class='fab fa-windows'></i> Windows",
            className: 'btn-info',

            callback: function(){
              bootbox.dialog({
                title: 'Compile App',
                message: "Pick the type of app you want to compile.",
                size: 'large',
                buttons: {
                    ok: {
                    label: "<i class='fas fa-download'></i> Installer",
                        className: 'btn-info',
                        callback: function(){
                          var fs_ = require("fs-extra");
                          var fs = require("fs");
            
                          document.getElementById('status').innerHTML = '<i class="fa fa-sync"></i> Compiling to Windows...'
                       
                          var dir = require('electron').remote.app.getAppPath() + '/';
                          var source = 'C:/Program Files (x86)/HaxPro SDK/compilers-win/gui/nw-win'
                          var rnd = `/builds/win32_${Math.random().toString(36).slice(2)}`
                          var destination = sessionStorage["project"] + `${rnd}/temp/`
                          var outer_dist = sessionStorage["project"] + `${rnd}/`
                          var nsis = 'C:/Program Files (x86)/HaxPro SDK/compilers-win/gui/nsis/'
                          var res = outer_dist + "/temp/res/";
                      
                          fs.mkdirSync(outer_dist);
                          fs.mkdirSync(outer_dist + '/temp/');
                          fs.mkdirSync(res + '');
                          fs.mkdirSync(res + "/hax/");
                          fs.mkdirSync(res + "/hax/files/");
                      
                          fs_.copy(source, destination, function (err) {
                            if (err){
                                bootbox.alert(err);
                            }
                      
                          fs_.copy(dir+'/js/gui/runtime.js', res + "hax/runtime.js");
                          
                          fs_.copy(sessionStorage["project"]+'/files/', res + "/hax/files/", function (err) {
                              if (err){
                                bootbox.alert(err);
                                return;
                              }
                      
                              var html = initData_gui(ui.getHtml(), ui.getCss(), ui.getJs());
                              //var html = '';
                      
                          html.replace(/\r/g, "").replace(/\n/g, "");
                      
                          if(c.includes('use: haxpro.ui'))
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
                      
                          fs.writeFile(res + "hax/"+'main.hax', c, (err) => {
                            if(err){
                              bootbox.alert("An error ocurred creating the file "+ err.message)
                            }
                          });
            
                          fs_.copy(dir+'/extras/nsis/app.nsi', outer_dist + '/app.nsi', function (err) {
                            if (err){
                                bootbox.alert(err);
                            }
                          });
            
                          bootbox.alert("Please wait until HaxPro is done compiling. Check the status bar for infomation.")
            
                          const nodeCmd = require('node-cmd');
                          nodeCmd.get(`cd ${nsis} && makensis.exe /DNAME=${sessionStorage['name']} "/XOutFile ${outer_dist+'\\haxpro_app.exe'}" ${outer_dist+'/app.nsi'}`, (err, data, stderr) => done());
                    
                          function done(){
                            document.getElementById('status').innerHTML = '<i class="fa fa-check"></i> Everything is okay.';
                            let fs_extra = require("fs-extra");
                            fs_extra.emptyDir(destination);
                            fs_extra.remove( outer_dist + '/app.nsi');
            
                            const {shell} = require('electron');
                            bootbox.alert("Finished compiling file!")
                            shell.showItemInFolder(outer_dist);
                          }
                      
                          });  
                      
                        });
                      
                        }
                        },
                      
                      report: {
                        label: "<i class='far fa-window-maximize'></i> Standalone",
                            className: 'btn-info',
                            callback: function(){
                              var fs_ = require("fs-extra");
                              var fs = require("fs");
                
                              document.getElementById('status').innerHTML = '<i class="fa fa-sync"></i> Compiling to Windows...'
                           
                              var dir = require('electron').remote.app.getAppPath() + '/';
                              var source = 'C:/Program Files (x86)/HaxPro SDK/compilers-win/gui/nw-win'
                              var rnd = `/builds/win32_${Math.random().toString(36).slice(2)}`
                              var destination = sessionStorage["project"] + `${rnd}/`
                              var res = destination + "res/";
                          
                              fs.mkdirSync(destination);
                              fs.mkdirSync(res);
                              fs.mkdirSync(res + "/hax/");
                              fs.mkdirSync(res + "/hax/files/");
                          
                              fs_.copy(source, destination, function (err) {
                                if (err){
                                    bootbox.alert(err);
                                }
                          
                              fs_.copy(dir+'/js/gui/runtime.js', res + "hax/runtime.js");
                              
                              fs_.copy(sessionStorage["project"]+'/files/', res + "/hax/files/", function (err) {
                                  if (err){
                                    bootbox.alert(err);
                                    return;
                                  }
                          
                                  var html = initData_gui(ui.getHtml(), ui.getCss(), ui.getJs());
                                  //var html = '';
                          
                              html.replace(/\r/g, "").replace(/\n/g, "");
                          
                              if(c.includes('use: haxpro.ui'))
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
                          
                          
                              fs.writeFile(res + "hax/"+'main.hax', c, (err) => {
                                if(err){
                                  bootbox.alert("An error ocurred creating the file "+ err.message)
                                }
                              });
              
                        
                                document.getElementById('status').innerHTML = '<i class="fa fa-check"></i> Everything is okay.';
                
                                const {shell} = require('electron');
                                bootbox.alert("Finished compiling file!")
                                shell.showItemInFolder(destination);
                              
                          
                              });  
                          
                            });
                        
                            }
                      }
                    }
                
              })

            }
        },
        noclose: {
            label: "<i class='fab fa-linux'></i> Linux",
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
              fs.mkdirSync(res + "hax/files/");
          
              fs_.copy(source, destination, function (err) {
                if (err){
                  bootbox.alert(err);
                }
          
              fs_.copy(dir+'/js/commands.js', res + "hax/commands.js");
              
              fs_.copy(sessionStorage["project"]+'/files/', res + "hax/files/", function (err) {
                  if (err){
                      bootbox.alert(err);
                      return;
                  }
          
                  var html = initData_gui(ui.getHtml(), ui.getCss(), ui.getJs());
          
              html.replace(/\r/g, "").replace(/\n/g, "");
          
              if(c.includes('use: haxpro.ui'))
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
            label: "<i class='fab fa-apple'></i> macOS",
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
                fs.mkdirSync(res + "hax/files/");
          
              fs_.copy(dir+'/js/commands.js', res + "hax/commands.js");
              
              fs_.copy(sessionStorage["project"]+'/files/', res + "hax/files/", function (err) {
                  if (err){
                    bootbox.alert(err);
                    return;
                  }
          
                  var html = initData_gui(ui.getHtml(), ui.getCss(), ui.getJs());
          
              html.replace(/\r/g, "").replace(/\n/g, "");
          
              if(c.includes('use: haxpro.ui'))
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
  } else {
    bootbox.dialog({
      title: 'Internal Error',
      message: "Failed to compile app for unknown reason. Please report this to my GitHub page.",
      buttons: {
          ok: {
          label: "OK",
              className: 'btn-info',
              callback: function(){
              return;
              }
            },
            report: {
              label: "Report",
                  className: 'btn-info',
                  callback: function(){
                  bootbox.alert("ok you have big problem")
                  }
                }
      }
    })
  }

}