// variables
// buttons
const po_open_settings_btn = $("#po_open_settings_btn")
const add_product_type_btn = $("#add_product_type_btn")
const create_product_type_btn = $("#create_product_type_btn")
const add_new_option_button = $("#add_new_option_button")
const create_new_option_btn = $("#create_new_option_btn")
const clear_all_data_btn = $("#clear_all_data_btn")
// close btns
const settings_modal_button_close = $("#settings_modal_button_close")
const add_product_type_modal_close = $("#add_product_type_modal_close")
const add_new_option_modal_close = $("#add_new_option_modal_close")

// Elements
// modals
const settings_modal = $("#settings_modal")
const add_product_type_modal = $("#add_product_type_modal")
const add_new_option_modal = $("#add_new_option_modal")

// inputs
const product_type_name = $("#product_type_name")
const option_name_input = $("#option_name_input")



// on load
$(() => {
    loadApp();
    let newId = generateCustomId();
    let newToken = generateRandomToken();

    // open settings modal
    po_open_settings_btn.click(() => {
        settings_modal.addClass("active")
    })
    // close settings modal
    settings_modal_button_close.click(() => {
        settings_modal.removeClass("active")
    })

    // open add product type modal
    add_product_type_btn.click(() => {
        add_product_type_modal.addClass("active")
    })
    // close add product type modal
    add_product_type_modal_close.click(() => {
        add_product_type_modal.removeClass("active")
    })

    // open add new option modal
    add_new_option_button.click(() => {
        add_new_option_modal.addClass("active")
    })
    // close add new option modal
    add_new_option_modal_close.click(() => {
        add_new_option_modal.removeClass("active")
    })




})