$(document).ready(function () {
  $("#po_main_tool_tip").hide();

  // this is for any tool tips that are dynamically added
  $(document).on('mouseenter', '#product_type_options_table .tooltip_cont', function () {
    $(this).addClass("active_tooltip");

    var tooltip = $(this).attr("data-tooltip");
    $("#po_main_tool_tip").show().text(tooltip);
  });

  $(document).on('mouseleave', '#product_type_options_table .tooltip_cont', function () {
    $(this).removeClass("active_tooltip");

    $("#po_main_tool_tip").hide().text("");
  });

  // this is for the static tool tips
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