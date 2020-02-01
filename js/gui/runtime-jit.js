function runEditor_gui(data)
{
var txt = data;
var n = txt.split("\n");

for(var x in n){   
n[x]= '>'+n[x]; 
var array = (n[x].replace(">", ""));
var args = array.split(" ");

if(args[0] == "use:") {
        if(args.join(' ').replace(args[0], '').includes('"'))
          
            var url = args.join(' ').replace(args[0], '').split('"')[1];
            loadAPI(url);
          } else if(args.join(' ').replace(args[0], '').includes('files')) {        
            var e = editor.getValue().replace(editor.getValue().split(' ')[0], '');
            var file = e.split(".")[1];
            var path;
            if(sessionStorage['project'] == undefined){
              console.log('No project is open.');
            } else {
              path = 'file:///' + (sessionStorage['project'] + '/files/' + file + '.js');
            }
            loadAPI(path);
          }

if(args[0] == "write:")
  {
  var msg = args.join(" ").replace(args[0], "");
  if(msg.includes('"'))
  {
    msg = msg.replace('"', "").replace('"', "");
    send(msg);
  } else if(msg.includes('.') || msg.includes(':')) {
    var cmd = args.join(' ').replace(args[0],'').trim().split(' ')
    try {
      eval(command(cmd));
    } catch(e) {
      send(`${command(cmd)}`)
      return;
    }
    
    send(eval(command(cmd)).toString().trim().replace('"', '').replace('"', ''));

  }else {
  
    try {
      eval(`window.${args[1]}`);
    }
    catch(error) {
    }
  
    try {
      eval(`window.${args[1]}`);
    }
    catch(error) {
      var err = error.toString().replace("window.", 'var ');
      send(err.toString());
    }
    
    try { 
      eval(eval(eval(`window.${args[1]}`)))
    }
    catch(e) {
      send(eval(`window.${args[1]}`));
      return;
    }

    send(eval(eval(eval(`window.${args[1]}`))));
  }
  }
  
  if(args[0] == "math:")
  {
  
  var msg;
  
  if(args.join(' ').includes('"'))
  {
    msg = args.join(" ").replace(args[0], "").replace('"', '').replace('"', '');
  } else {
  
    try {
      eval(`window.${args[1]}`);
    }
    catch(error) {
      var err = error.toString().replace("window.", 'var ');
      send(err.toString());
    }
  
    try {
      eval(`window.${args[1]}`);
    }
    catch(error) {
      var err = error.toString().replace("window.", 'var ');
      send(err.toString());
    }
    
    try { 
      eval(eval(eval(`window.${args[1]}`)))
    }
    catch(e) {
      msg = (eval(`window.${args[1]}`));
      return;
    }

    msg = (eval(eval(eval(`window.${args[1]}`))));

  }
  
  try {
    math.evaluate(msg);
  }
  catch(error) {
  }
  
  var data = math.evaluate(msg);
  send(data);
  return data;
  }

if(args[0] == "let")
{
  if(args.join(" ").replace(args[0], "").includes('"')){
    var name = args[1];
    var data = args.join(" ").replace(args[0], "").replace(args[1], "").replace("=", "").replace("\\", '').replace("\\", '');
    eval(`window.${name} = ${data};`);
  } else if(args.join(" ").replace(args[0], "").includes('.') || args.join(" ").replace(args[0], "").includes(':')) {
    var name = args[1];
    var data = args.join(" ").replace(args[0], "").replace('=', '').replace(args[1], '').replace(' ', '').replace(' ', '').replace(' ', '');
    data = data.split(' ');
    eval(`window.${name}`);
    eval(`${name} = "eval(command(['${data}']))"`);
  }
}

if(args[0] == "if:")
{
var array = args.join(" ").replace("if:", '').split(":");
var statement = array[0].replace("then", '');
var if_then = `${array[1]}: ${array[2]}`.replace("else", '');
var if_else;

if(args.join(" ").includes("else:"))
{
  if_else = `${array[3]}: ${array[4]}`;
  
  if(eval(statement) == true)
  {
    command(if_then.trim().split(' '));

  } else if(eval(statement) == false) {
    command(if_else.trim().split(' '));
  }

} else {

  if(eval(statement) == true)
  {
    command(if_then.trim().split(' '));
  }
}
}


  
if(args[0].split(".").includes('ui') && args[0].split(".").includes('buttons') && args[0].split('.').includes('clicked:'))
      {
        var id = args[0].split('.')[2];
        var cmd = args.join(" ").replace(args[0], '').trim().split(' ');

        $(`.${id}`).unbind('click');
        $(`.${id}`).click(function()
        {
          command(cmd);
        });
      }

        
if(args[0].split(".").includes('ui') && args[0].split(".").includes('inputs') && args[0].split('.').includes('value'))
      {
        var id = args[0].split('.')[2];
        var cmd = args.join(" ").replace(args[0], '').trim().split(' ');

        return `string($('.${id}').val())`;
      }

      if(args[0] == "alert:")
        {  
          var e = args.join(" ").replace(args[0], "");
          if(e.includes('"') && ! e.includes(':'))
          {
          var msg = args.join(' ').replace(args[0],'').split('"')[1];
          bootbox.alert(msg);
          } else if(e.includes('.') || e.includes(':')) {
            var cmd = args.join(' ').replace(args[0],'').trim().split(' ')
            try {
              eval(command(cmd));
            } catch(e) {
              bootbox.alert(`${command(cmd)}`)
              return;
            }
            
            bootbox.alert(eval(command(cmd)).toString().trim().replace('"', '').replace('"', ''));

          } else {
            try {
              eval(`window.${args[1]}`);
            }
            catch(error) {
            }
            
            try { 
              eval(eval(eval(`window.${args[1]}`)))
            }
            catch(e) {
              bootbox.alert(eval(`window.${args[1]}`));
              return;
            }

            bootbox.alert(eval(eval(eval(`window.${args[1]}`))));
          }
        }
  
        if(args[0] == "toast:")
        {
          var e = args.join(" ").replace(args[0], "");
          if(e.includes('"') && !e.includes(':'))
          {
          var msg = args.join(' ').replace(args[0], '').split('"')[1];
          window.toastr.info(msg);
          }else if(e.includes('.') || e.includes(':')) {
            var cmd = args.join(' ').replace(args[0],'').trim().split(' ')
            try {
              eval(command(cmd));
            } catch(e) {
              window.toastr.info(`${command(cmd)}`)
              return;
            }
            
            window.toastr.info(eval(command(cmd)).toString().trim().replace('"', '').replace('"', ''));

          } else {
            try {
              eval(`window.${args[1]}`);
            }
            catch(error) {
              var err = error.toString().replace("window.", 'var ');
              send(err.toString());
            }
            
            try {
              eval(`window.${args[1]}`);
            }
            catch(error) {
            }
            
            try { 
              eval(eval(eval(`window.${args[1]}`)))
            }
            catch(e) {
              window.toastr.info(eval(`window.${args[1]}`));
              return;
            }

            window.toastr.info(eval(eval(eval(`window.${args[1]}`))));
          }
        }
    }
  }