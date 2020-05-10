// based on code from https://github.com/valyard/UnityWebGLOpenLink
var OpenWindowPlugin = {  
    openWindow: function(link)
    {
        var url = Pointer_stringify(link);
        document.onmouseup = function()
        {
            // window.open(url,"game_drop"); // game_drop is id for itch frame? can't control name...
            location = url; // trying this method, instead

            document.onmouseup = null;
        }
    }
};

mergeInto(LibraryManager.library, OpenWindowPlugin); 
