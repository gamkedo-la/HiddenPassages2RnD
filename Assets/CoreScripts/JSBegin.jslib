var JSBegin =
{
    JSInitialize: function ()
    {
        console.log("JS file accessed by unity jslib");
    },
};
mergeInto(LibraryManager.library, JSBegin);