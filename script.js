function loadFooter(){
    console.log("adding footer");
    $("#content").append("<footer></footer>");
    $("footer").load("/txt/footer.txt");
}

function loadUpdates(){
    console.log("adding updates");
    $("#update-ul").load("/txt/updates.txt");
}

$(function(){
    loadFooter();
    loadUpdates();
});
