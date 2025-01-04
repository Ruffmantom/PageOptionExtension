$(document).ready(function () {
    $("#po_main_tool_tip").hide();
    
    $(".tooltip_cont").hover(function () {
        // add class to hvere element "active_tooltip"
        $(this).addClass("active_tooltip");
        
        var tooltip = $(this).attr("data-tooltip");
        $("#po_main_tool_tip").show();
        $("#po_main_tool_tip").text(tooltip);
    });
    // remove when mouse leave
    $(".tooltip_cont").mouseleave(function () {
        $(this).removeClass("active_tooltip");
        $("#po_main_tool_tip").hide();
        $("#po_main_tool_tip").text("");
    });
});