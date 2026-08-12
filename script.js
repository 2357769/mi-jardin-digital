function loadFooter(){
    console.log("adding footer");
    $("#content").append("<footer></footer>");
    $("footer").load("/footer.txt");
}

$(function(){
    loadFooter();
});
