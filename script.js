function loadFooter(){
    console.log("adding footer");
    $("#content").append("<footer></footer>");
    $("footer").load("/footer.txt");
}

function loadUpdates(){
    console.log("adding updates");
    $("#update-ul").load("/updates.txt");
}

$(function(){
    loadFooter();
    loadUpdates();
});
