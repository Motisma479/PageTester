function formatNumberWithLeadingZero(number, maxNumber) {
    const maxDigits = maxNumber.toString().length;
    const leadingZeros = maxDigits - number.toString().length + 1;
    return number.toString().padStart(leadingZeros, '0');
}


let clickButtonPlay = false;
$(document).on("click", ".ImageButton", function(){
    if(clickButtonPlay)
    {
        // stop the user from clicking more than once;
        return;
    }
    clickButtonPlay = true;
    
    var button = $(this);

    var id = button.attr('id'); // Get the ID of the clicked button
    
    var preview = $("#" + id + ".PreviewImage");
    var newImage = $("#" + id +".NewImage");

    var imageArray = preview.attr('imageArray').split(",");
    var position = Number(preview.attr('position')) + Number(button.attr('btndir'));

    if(position > imageArray.length-1)
    {
        position = 0;
    }
    else if(position < 0)
    {
        position = imageArray.length-1;
    }

    preview.attr("position", position);
    $("#" + id + ".NumberImage").text(formatNumberWithLeadingZero(position+1,imageArray.length)+'/'+imageArray.length);

    var newImg = new Image();
    newImg.src = imageArray[position];
    newImg.onload = function() {
        
        // Transition by blend --------------------------------------------
        // newImage.attr("src", newImg.src);
        // newImage.animate({ opacity: 1 }, "slow", function()
        // {
        //     preview.attr("src", newImg.src);
        //     newImage.css("opacity", 0);
        //     clickButtonPlay = false;
        // });
        // newImage.attr("src", preview.attr('src'));
        //-----------------------------------------------------------------
            
        // Transition by translation --------------------------------------
        preview.attr("src", newImg.src);
        newImage.css("opacity", 1);
        newImage.animate({ left: (button.attr('btndir')*100)+'%' }, "slow", function()
        {
            newImage.attr("src", newImg.src);
            newImage.css("opacity", 0);
            newImage.css("left", 0);
            clickButtonPlay = false;
        });
        //-----------------------------------------------------------------
    }
    
});
