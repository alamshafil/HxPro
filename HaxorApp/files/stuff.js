API().initAPI(
    API().parse(init)
);


function init(){

    var e = API().initData();
    
    let window = $('#window');

    let n = e.split("\n");

    for(var x in n){   
    n[x]= '>'+n[x]; 
    let array = n[x].replace(">", "");
    let cmd = array.split(' ')[0];
    let args = array.replace(cmd, '').split(' ');

        if(cmd == "test:")
        {
            let msg = args.join(' ');
            alert(msg);
        }

        if(cmd == "add:")
        {
            let msg = args.join(' ');
            window.append(msg);
        }

    }
}