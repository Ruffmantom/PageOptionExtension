// on load
$(() => {
    // load the app
    loadApp();

    let newToken = generateRandomToken();

    // open settings modal
    $(po_open_settings_btn).click(() => {
        $(settings_modal).addClass("active")
    })
    // close settings modal
    $(settings_modal_button_close).click(() => {
        $(settings_modal).removeClass("active")
    })

    // open add product type modal
    $(open_product_type_menu_btn).click(() => {
        $(product_type_menu_modal).addClass("active")
    })
    // close add product type modal
    $(product_type_menu_modal_close).click(() => {
        $(product_type_menu_modal).removeClass("active")
    })

    // open add new option modal
    $(add_new_option_button).click(() => {
        $(add_new_option_modal).addClass("active")
    })
    // close add new option modal
    $(add_new_option_modal_close).click(() => {
        $(add_new_option_modal).removeClass("active")
    })

    // highlight text inputs on focus
    $(document).on('click', '#product_type_options_table input[type="text"]', function () {
        this.select();
    });

    // need to add listener for the tab navigation
    $(document).on('click', '.po_menu_tab_item_btn', function () {
        let tabId = $(this).data('tabid');
        globalStore.currentProductType = tabId;
        saveToLocalStorage();
        renderDom();
        // close the menu
        $(product_type_menu_modal).removeClass("active")
    })

    // add new product type
    $(product_type_name).on('keyup', (e) => {
        newProductTypeNameValue = e.target.value;
    })

    $(create_product_type_btn).click((e) => {
        e.preventDefault();

        if (newProductTypeNameValue.length > 0) {
            let newId = generateCustomId();
            globalStore.productTypes.push({
                id: newId,
                name: newProductTypeNameValue,
                options: []
            })
            globalStore.currentProductType = newId;
            saveToLocalStorage();
            $(product_type_menu_modal).removeClass("active")
            // incase user has cleared data before creating a new product type
            clearNoDataContent()
            // render the dom
            renderDom();

            // clear the input
            newProductTypeNameValue = "";
            $(product_type_name).val("");
        }
    })

    // get the New Option name
    $(option_name_input).on('keyup', (e) => {
        newOptionNameValue = e.target.value;
    })

    // create the New Option
    $(create_new_option_btn).click((e) => {
        e.preventDefault();
        if (newOptionNameValue.length > 0) {
            let currentProductType = globalStore.productTypes.find(pt => pt.id === globalStore.currentProductType);
            let newId = generateCustomId();
            let newIndex = currentProductType.options.length + 1;
            currentProductType.options.push({
                id: newId,
                isDeleteAble: true,
                optionName: newOptionNameValue,
                reName: "",
                sortId: newIndex,
                newSortId: null
            })
            saveToLocalStorage();
            $(add_new_option_modal).removeClass("active")
            renderDom();
            // clear the input
            newOptionNameValue = "";
            $(option_name_input).val("");
        }
    })

    // delete the option
    // Left off ************************************
    // need to re number all the options that are after the one that is getting removed.
    $(document).on('click', '.delete_option_btn', function () {
        let optionId = $(this).data('optionid');
        // console.log('deleting option', optionId);
        // make option fade out
        $(`div[data-optionid="${optionId}"]`).fadeOut(150);
        // remove from the store
        let currentProductType = globalStore.productTypes.find(pt => pt.id === globalStore.currentProductType);
        currentProductType.options = currentProductType.options.filter(option => option.id !== optionId);
        saveToLocalStorage();
        renderDom();
    })

    /*
    // option keys
        id
        isDeleteAble
        optionName
        reName
        sortId
        newSortId
    */
    // need to capture if user types in a rename or sort number
    $(document).on('keyup', '.po_table_option_input', function () {
        let optionId = $(this).closest('.po_option').data('optionid');
        let inputType = $(this).data('type');
        let inputValue = $(this).val();
        // console.log('optionId: ', optionId, '\n\ninputType: ', inputType, '\n\ninputValue: ', inputValue);
        let currentProductType = globalStore.productTypes.find(pt => pt.id === globalStore.currentProductType);
        let currentOption = currentProductType.options.find(option => option.id === optionId);
        // console.log('currentOption: ', currentOption);

        if (inputType === 'po_rename') {
            currentOption.reName = inputValue;
        } else if (inputType === 'po_sortid') {
            currentOption.newSortId = inputValue;
        } else if (inputType === 'po_name') {
            currentOption.optionName = inputValue;
        }
        saveToLocalStorage();
    })


    // copy the names output
    $(po_copy_names_output_btn).click((e) => {
        e.preventDefault();
        let copyOutput = generateOutputs('name');
        // console.log(copyOutput);
        copyToClipboard(copyOutput);
        notify("Copied Names to clipboard!", "success");
    })

    // need to capture if the user 

    // copy the order output
    $(po_copy_order_output_btn).click((e) => {
        e.preventDefault();
        let copyOutput = generateOutputs('sort');
        // console.log(copyOutput);
        copyToClipboard(copyOutput);
        notify("Copied the order to the clipboard!", "success");
    })

    // when the add option button opens the modal, focus on the input
    $(add_new_option_button).click(() => {
        $(option_name_input).focus();
    })

    // clear option name input on close
    $(add_new_option_modal_close).click(() => {
        $(option_name_input).val("");
    })

    // delete the dynamically added product type from container #po_tab_navigation_bar
    // if product type is set as the current product type, set the current to the one before it if there is nothing before then check after. if there is nothing then clear the current product type id in state.

    // po_delete_product_type_btn
    $(document).on('click', '.po_delete_product_type_btn', function (e) {
        e.preventDefault();
        let productTypeId = $(this).data('tabid');
        // console.log('deleting product type', productTypeId);
        // remove from the store
        let productTypeToDelete = globalStore.productTypes.find(pt => pt.id === productTypeId);
        globalStore.productTypes = globalStore.productTypes.filter(pt => pt.id !== productTypeId);
        // find product type about to be deleted
        // console.log('productTypeToDelete', productTypeToDelete);
        // if the current product type is the one being deleted
        if (globalStore.currentProductType === productTypeId) {
            let currentProductTypeIndex = globalStore.productTypes.findIndex(pt => pt.id === productTypeId);
            if (currentProductTypeIndex > 0) {
                globalStore.currentProductType = globalStore.productTypes[currentProductTypeIndex - 1].id;
            } else if (currentProductTypeIndex === 0 && globalStore.productTypes.length > 0) {
                globalStore.currentProductType = globalStore.productTypes[currentProductTypeIndex + 1].id;
            } else {
                globalStore.currentProductType = null;
            }
        }
        // add notification
        notify(`Product Type: ${productTypeToDelete.name} has been deleted!`, "danger");
        saveToLocalStorage();
        renderDom();
    })

    // edit the product type name
    // po_edit_product_type_name_btn
    // ID of save button 
    $(document).on('click', '.po_edit_product_type_name_btn', function (e) {
        e.preventDefault();
        let productTypeId = $(this).data('tabid');
        // add the id to the save button with data attribute editpt
        $(edit_product_type_save_btn).attr('data-editpt', productTypeId);
        // open the modal
        $(edit_product_type_modal).addClass("active");
        // get the product type
        let productTypeToEdit = globalStore.productTypes.find(pt => pt.id === productTypeId);
        // console.log('editing product type', productTypeToEdit);
        // set the value of the input to the product type name
        $(product_type_edit_name_input).val(productTypeToEdit.name);
    })

    // save the product type name
    $(edit_product_type_save_btn).click((e) => {
        e.preventDefault();
        let newProductTypeName = $(product_type_edit_name_input).val();
        // get id of product type from button click with data attribute editpt
        let productTypeId = $(edit_product_type_save_btn).data('editpt');
        // console.log('saving product type name', newProductTypeName, productTypeId);
        // find product type to update
        let currentProductType = globalStore.productTypes.find(pt => pt.id === productTypeId);

        if (newProductTypeName.length > 0) {
            currentProductType.name = newProductTypeName;
            saveToLocalStorage();
            renderDom();
            $(edit_product_type_modal).removeClass("active");
        }else{
            notify('Please enter a name.')
            return
        }
    })

    // close the edit product type modal
    $(edit_product_type_modal_close).click(() => {
        $(edit_product_type_modal).removeClass("active");
    })


    // add reset action for renames
    const resetOptionInputs = (type) => {
        let currentProductType = globalStore.productTypes.find(pt => pt.id === globalStore.currentProductType);
        let message = ""
        currentProductType.options.forEach(option => {
            if (type === "rename") {
                option.reName = ""
                message = "All Renames have been cleared!"
            } else {
                option.newSortId = ""
                message = "All Sort ID's have been cleared!"
            }
        });

        saveToLocalStorage();
        renderDom();
        notify(message, "success")
    }


    $(po_reset_rename_column_btn).on('click', function (e) {
        e.preventDefault()
        resetOptionInputs("rename")
    })

    $(po_reset_order_column_btn).on('click', function (e) {
        e.preventDefault()
        resetOptionInputs("sortid")
    })


    // clear all data
    $(clear_all_data_btn).on('click', function (e) {
        e.preventDefault()
        $(settings_modal).removeClass("active")
        notify("All saved data has been reset and removed.", "success")
        clearAllData(false)
    })

})