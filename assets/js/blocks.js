const createProductTypeTab = (data, currentProductTypeId) => {
    return `
        <div class="po_menu_tab_item  ${currentProductTypeId === data.id ? "active" : ''}">
            <div class="po_menu_tab_item_btn" title="${data.name}" data-tabid="${data.id}"></div>

            <div class="po_menu_tab_item_name_cont">
                <p class="txt_sml truncate po_menu_tab_item_name">${data.name}</p>
                <input type="text" value="${data.name}" placeholder="Please Enter a Name..."
                    class="po_menu_tab_item_rename_input">
            </div>

            <div class="po_menu_tab_item_action_group">
                <button class="po_edit_product_type_name_btn icon_button sml subtle tooltip_cont" data-tooltip="Edit Product Type Name" data-tabid="${data.id}">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960"
                        width="20px">
                        <path
                            d="M210-210h44.46l373.46-373.46-44.46-43.46L210-253.46V-210Zm-32.66 78q-18.55 0-31.94-13.19-13.4-13.19-13.4-31.78v-71.16q0-17.96 6.62-34.72 6.61-16.76 20.46-30.61l500.54-502.31q7.07-8.24 15.37-10.23 8.3-2 16.49-2 8.2 0 14.97 1.27 6.78 1.27 15.47 8.58l94.85 93.46q7.31 8.69 9.27 16 1.96 7.31 1.96 16.17 0 8.51-2.64 16.56-2.65 8.05-9.59 14.96L313.46-159.08q-13.85 13.85-30.56 20.46-16.71 6.62-34.63 6.62h-70.93Zm561.04-560.15-46.23-45.23 46.23 45.23ZM606.3-605.3l-22.84-21.62 44.46 43.46-21.62-21.84Z" />
                    </svg>
                </button>

                <button class="po_delete_product_type_btn icon_button sml danger tooltip_cont" data-tooltip="Delete Product Type" data-tabid="${data.id}">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960"
                        width="20px">
                        <path
                            d="M320.31-132q-38.53 0-64.42-25.89T230-222.31V-700h-22q-16.05 0-27.52-11.42Q169-722.84 169-738.8q0-15.97 11.48-27.58Q191.95-778 208-778h174v-12q0-15.99 11.5-27.69 11.49-11.69 27.88-11.69h119.24q16.39 0 27.88 11.49Q580-806.39 580-790v12h174q16.05 0 27.52 11.42Q793-755.16 793-739.2q0 15.97-11.48 27.58Q770.05-700 754-700h-22v477.26q0 39.26-25.89 65Q680.22-132 641.69-132H320.31ZM654-700H308v477.69q0 5.39 3.46 8.85t8.85 3.46h321.38q5.39 0 8.85-3.46t3.46-8.85V-700ZM417.96-283q15.96 0 27.58-11.47 11.61-11.48 11.61-27.53v-266q0-16.05-11.41-27.53Q434.32-627 418.35-627q-15.96 0-27.58 11.47-11.61 11.48-11.61 27.53v266q0 16.05 11.41 27.53Q401.99-283 417.96-283Zm125.69 0q15.96 0 27.58-11.47 11.61-11.48 11.61-27.53v-266q0-16.05-11.41-27.53Q560.01-627 544.04-627q-15.96 0-27.58 11.47-11.61 11.48-11.61 27.53v266q0 16.05 11.41 27.53Q527.68-283 543.65-283ZM308-700v490-490Z" />
                    </svg>
                </button>
            </div>
        </div>
    `
}


const createProductOptionHtml = (option) => {
    console.log('about to render option', option)
    return `
    <div data-optionid="${option.id}" class="po_option po_option_table_row">
        
        <div class="po_option_table_cell">
            <button data-tooltip="Delete Option" data-optionid="${option.id}" class="delete_option_btn icon_button danger tooltip_cont">
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960"
                    width="20px">
                    <path
                        d="M320.31-132q-38.53 0-64.42-25.89T230-222.31V-700h-22q-16.05 0-27.52-11.42Q169-722.84 169-738.8q0-15.97 11.48-27.58Q191.95-778 208-778h174v-12q0-15.99 11.5-27.69 11.49-11.69 27.88-11.69h119.24q16.39 0 27.88 11.49Q580-806.39 580-790v12h174q16.05 0 27.52 11.42Q793-755.16 793-739.2q0 15.97-11.48 27.58Q770.05-700 754-700h-22v477.26q0 39.26-25.89 65Q680.22-132 641.69-132H320.31ZM654-700H308v477.69q0 5.39 3.46 8.85t8.85 3.46h321.38q5.39 0 8.85-3.46t3.46-8.85V-700ZM417.96-283q15.96 0 27.58-11.47 11.61-11.48 11.61-27.53v-266q0-16.05-11.41-27.53Q434.32-627 418.35-627q-15.96 0-27.58 11.47-11.61 11.48-11.61 27.53v266q0 16.05 11.41 27.53Q401.99-283 417.96-283Zm125.69 0q15.96 0 27.58-11.47 11.61-11.48 11.61-27.53v-266q0-16.05-11.41-27.53Q560.01-627 544.04-627q-15.96 0-27.58 11.47-11.61 11.48-11.61 27.53v266q0 16.05 11.41 27.53Q527.68-283 543.65-283ZM308-700v490-490Z" />
                </svg>
            </button>
        </div>

        <div class="po_option_table_cell">
            <span class="po_option_index txt_sml txt_sml_50">${option.sortId}</span>
            <input data-type="po_name" class="po_table_option_input p_l_25" value="${option.optionName}" type="text" placeholder="Option Name">
        </div>
        
        <div class="po_option_table_cell">
            <input data-type="po_sortid" class="po_table_option_input" value="${option.newSortId ? option.newSortId : 0}" type="text" placeholder="0" min="0"
                max="50">
        </div>
        
        <div class="po_option_table_cell">
            <input data-type="po_rename" class="po_table_option_input" value="${option.reName}" type="text" placeholder="Option Name">
        </div>

    </div>



    `
}