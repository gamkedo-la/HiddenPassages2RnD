var JSBegin =
{
    JSInitialize: function ()
    {
        console.log("JS file accessed by unity jslib, trying to contact page JS");
        OnScenesReady();
    },
};
mergeInto(LibraryManager.library, JSBegin);