// based on code from https://github.com/valyard/UnityWebGLOpenLink
var OpenWindowPlugin = {  
    openWindow: function(link)
    {
        var url = Pointer_stringify(link);
        document.onmouseup = function()
        {
            window.open(url,"_blank");
            // location = url; // another way to try

            document.onmouseup = null;
        }
    }
};

mergeInto(LibraryManager.library, OpenWindowPlugin); 
