
function browser(){

    $('.content').append('<div id="browser"><div class="left" id="browser-inner"> <iframe style="width: 100%; height: 100%; postion: absolute;" src="https://alamshafil.github.io/HaxPro/"></div></div>');
    $('#left-tab').append('<li id="tab_browser" role="presentation"><a style="color:white" href="#browser" id="tabby-toggle_code" role="tab" aria-controls="browser" tabindex="0"><i class="fas fa-globe"></i> App Store <span><i onclick="$(`#tab_browser`).remove(); $(`#code_tab`).click()" class="fas fa-close"></i></span> </a></li>');
}

function UI(){  

    $('.content').append('<div id="ui"><div class="left" id="inner_ui"></div></div>');
    $('#left-tab').append('<li id="tab_ui" role="presentation"><a style="color:white" href="#ui" id="tabby-toggle_ui" role="tab" aria-controls="ui" tabindex="0"><i class="fas fa-globe"></i> UI Editor <span><i onclick="$(`#tab_ui`).remove(); $(`#code_tab`).click()" class="fas fa-close"></i></span> </a></li>');

    
    window.ui = grapesjs.init({
        container : '#inner_ui',
        plugins: ['gjs-preset-webpage'],
        pluginsOpts: {
          'gjs-preset-webpage': {
            // options
          }
        }
    });
}