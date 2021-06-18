define(['base/js/namespace', 'base/js/events', 'notebook/js/textcell', 'notebook/js/codecell'], function (Jupyter, events, textcell, codecell) {

    // style cells based on tag values
    //based on https://github.com/ipython-contrib/IPython-notebook-extensions/blob/master/usability/read-only.js
    "using strict";
    
    var mod_name = 'tagstyler';

    var CodeCell = codecell.CodeCell;
    var MarkdownCell = textcell.MarkdownCell;

    var params = {};

    var style_tags = ['alert-warning', 'alert-success', 'alert-danger', 'alert-info'];

    // update params with any specified in the server's config file
    var update_params = function () {
        var config = Jupyter.notebook.config;
        for (var key in params) {
            if (config.data.hasOwnProperty(key))
                params[key] = config.data[key];
        }
    };

    var set_tagstyle = function (cell) {
        console.log("Run set_tagstyle");
        var inner_cell = cell.element.find('div.inner_cell');
        var tags=[];
        for (tag of cell.metadata.tags) {
            if (style_tags.indexOf(tag) > -1){
                tags.push(tag);
            }

        }
        console.log('using tags', tags)
        for (tag of tags) {
            console.log('adding', tag)
            inner_cell.addClass('alert');
            inner_cell.addClass(tag);
        }
    }


    function oustyle_notebook_tagstyler() {

        console.log("Run oustyle_notebook_tagstyler");
        /* loop through notebook and set style of appropriately tagged cells */
        var cells = Jupyter.notebook.get_cells();
        for (var i in cells) {
            var cell = cells[i];
            if ((cell instanceof CodeCell) || (cell instanceof MarkdownCell)) {
                if ('tags' in cell.metadata) {
                    console.log('got one...',cell.metadata,cell.metadata.tags)
                    set_tagstyle(cell);
                }

            }
        };
    }


    var initialize = function () {
        /*
        var layout_cell_color = function () {
            var style = document.createElement("style");
            style.innerHTML = ".ou_student_outer {background-color: #ffffcc;}; .ou_student_prompt {background-color: #ffeecd;};";
            document.getElementsByTagName("head")[0].appendChild(style);

            style = document.createElement("style");
            style.innerHTML = ".ou_commentate_outer {background-color: #eda7c3;}; .ou_commentate_prompt {background-color: #f4cadb;};";
            document.getElementsByTagName("head")[0].appendChild(style);

            style = document.createElement("style");
            style.innerHTML = ".ou_activity_outer {background-color: #c8ecff;}; .ou_activity_prompt {background-color: #ecf6ff;};";
            document.getElementsByTagName("head")[0].appendChild(style);

        }

        layout_cell_color();
        */
        update_params();

        oustyle_notebook_tagstyler();
    }

    function load_jupyter_extension() {
        //return Jupyter.notebook.config.loaded.then(initialize);
        if (Jupyter.notebook !== undefined && Jupyter.notebook._fully_loaded) {
            // notebook already loaded. Update directly
            initialize();
        }
        events.on("notebook_loaded.Notebook", initialize);
    }

    return {
        'load_ipython_extension': load_jupyter_extension,
        'load_jupyter_extension': load_jupyter_extension
    };

})