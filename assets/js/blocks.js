const createProductOptionHtml = (option) => {
    console.log('about to render option', option)
    return `
    <div data-optionid="${option.id}" class="po_option po_option_table_row">
        
        <div class="po_option_table_cell">
            <button data-tooltip="Delete Option"
                class="icon_button danger tool_tip tt_right">
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960"
                    width="20px">
                    <path
                        d="M320.31-132q-38.53 0-64.42-25.89T230-222.31V-700h-22q-16.05 0-27.52-11.42Q169-722.84 169-738.8q0-15.97 11.48-27.58Q191.95-778 208-778h174v-12q0-15.99 11.5-27.69 11.49-11.69 27.88-11.69h119.24q16.39 0 27.88 11.49Q580-806.39 580-790v12h174q16.05 0 27.52 11.42Q793-755.16 793-739.2q0 15.97-11.48 27.58Q770.05-700 754-700h-22v477.26q0 39.26-25.89 65Q680.22-132 641.69-132H320.31ZM654-700H308v477.69q0 5.39 3.46 8.85t8.85 3.46h321.38q5.39 0 8.85-3.46t3.46-8.85V-700ZM417.96-283q15.96 0 27.58-11.47 11.61-11.48 11.61-27.53v-266q0-16.05-11.41-27.53Q434.32-627 418.35-627q-15.96 0-27.58 11.47-11.61 11.48-11.61 27.53v266q0 16.05 11.41 27.53Q401.99-283 417.96-283Zm125.69 0q15.96 0 27.58-11.47 11.61-11.48 11.61-27.53v-266q0-16.05-11.41-27.53Q560.01-627 544.04-627q-15.96 0-27.58 11.47-11.61 11.48-11.61 27.53v266q0 16.05 11.41 27.53Q527.68-283 543.65-283ZM308-700v490-490Z" />
                </svg>
            </button>
        </div>

        <div class="po_option_table_cell">
            <span class="po_option_index txt_sml txt_sml_50">${option.index}</span><input class="po_table_option_input"
                value="${option.name}" type="text" placeholder="Option Name">
        </div>
        
        <div class="po_option_table_cell">
            <input class="po_table_option_input" value="${option.sortNumber}" type="text" placeholder="0" min="0"
                max="50">
        </div>
        
        <div class="po_option_table_cell">
            <input class="po_table_option_input" value="${option.rename}" type="text" placeholder="Option Name">
        </div>

    </div>



    `
}