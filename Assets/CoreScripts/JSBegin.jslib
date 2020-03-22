var JSBegin =
{
    JSInitialize: function ()
    {
        console.log("JS file accessed by unity jslib");
        OnScenesReady();
    },
};
mergeInto(LibraryManager.library, JSBegin);