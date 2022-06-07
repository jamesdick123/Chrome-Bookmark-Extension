const bookmarks = [];

chrome.tabs.onCreated.addListener(function(tab) { //refresh bookmarks on new tab opening
    var bookmarkTreeNodes = chrome.bookmarks.getTree(
    function(bookmarkTreeNodes){
        bookmarksArray(bookmarkTreeNodes)
    })
})

chrome.commands.onCommand.addListener(function(command){ 
    var bookmarkTreeNodes = chrome.bookmarks.getTree( //also check bookmarks on command execution
        function(bookmarkTreeNodes){
            bookmarksArray(bookmarkTreeNodes)
        })
    printArray(); //temp
    console.log('command:',command.charAt(8)); //tab number temp 
    tabSelected = parseInt(command.charAt(8));
    chrome.tabs.update({
        url: ("" + bookmarks[tabSelected+1]) //I have absolutely no idea why the first 2 are undefined so very weak workaround
    })    
});

function printArray(){
    for(var i = 0; i<bookmarks.length; i++){
        console.log(bookmarks[i]);
    }
}
    
function bookmarksArray(bookmarkTree){
    for(var i=0; i<bookmarkTree.length; i++){
        bookmarks.push("" + bookmarkTree[i].url); //url is insert to each spot as string 
        console.log("" + bookmarks[i])
        if(bookmarkTree[i].children){
            bookmarksArray(bookmarkTree[i].children)
        }
    }
}
