// variables
// buttons
const po_open_settings_btn = $("#po_open_settings_btn")
const open_product_type_menu_btn = $("#open_product_type_menu_btn")
const create_product_type_btn = $("#create_product_type_btn")
const add_new_option_button = $("#add_new_option_button")
const create_new_option_btn = $("#create_new_option_btn")
const clear_all_data_btn = $("#clear_all_data_btn")
const po_copy_order_output_btn = $("#po_copy_order_output_btn")
const po_copy_names_output_btn = $("#po_copy_names_output_btn")
const edit_product_type_save_btn = $("#edit_product_type_save_btn")
const po_reset_rename_column_btn = $("#po_reset_rename_column_btn")
const po_reset_order_column_btn = $("#po_reset_order_column_btn")

// close btns
const settings_modal_button_close = $("#settings_modal_button_close")
const product_type_menu_modal_close = $("#product_type_menu_modal_close")
const add_new_option_modal_close = $("#add_new_option_modal_close")
const edit_product_type_modal_close = $("#edit_product_type_modal_close")

// Elements
const intro_text = $("#intro_text");
const settings_release_version = $("#settings_release_version");
const product_type_display_title = $("#product_type_display_title");

// containers
const po_option_table = $("#po_option_table");
const po_option_table_head = $("#po_option_table_head");
const product_type_options_table = $("#product_type_options_table");
const po_tab_navigation_bar = $("#po_tab_navigation_bar");

// modals
const settings_modal = $("#settings_modal")
const product_type_menu_modal = $("#product_type_menu_modal")
const add_new_option_modal = $("#add_new_option_modal")
const edit_product_type_modal = $("#edit_product_type_modal")

// inputs
const product_type_name = $("#product_type_name")
const option_name_input = $("#option_name_input")
const product_type_edit_name_input = $("#product_type_edit_name_input")

// Checkboxes
const add_sort_id_setting_checkbox = $("#add_sort_id_setting_checkbox")
const enable_release_notes_checkbox = $("#enable_release_notes_checkbox")

// variables
let newProductTypeNameValue = "";
let newOptionNameValue = "";

// Release notes
const release_notes_modal = $('#release_notes_modal')
const release_notes_header = $('#release_notes_header')
const release_notes_modal_close = $('#release_notes_modal_close')
const release_notes_body = $('#release_notes_body')
let latestUpdate = null