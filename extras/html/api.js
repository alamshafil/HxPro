API().initAPI(
    API().parse(app)
);

function app() {

    var window = API().getWindow();

    var data = API().initData();
    var n = data.split("\n");

    for (var x in n) {
        n[x] = '>' + n[x];
        var array = (n[x].replace(">", ""));
        var args = array.split(" ");

        if (args[0] == "use:") {
            // put haxor code here
        } 

        if (args[0] == "print:") {
            var text = args.join(' ').replace(args[0], '');
            window.append(text);
        }
    }
}