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
    $(add_product_type_btn).click(() => {
        $(add_product_type_modal).addClass("active")
    })
    // close add product type modal
    $(add_product_type_modal_close).click(() => {
        $(add_product_type_modal).removeClass("active")
    })

    // open add new option modal
    $(add_new_option_button).click(() => {
        $(add_new_option_modal).addClass("active")
    })
    // close add new option modal
    $(add_new_option_modal_close).click(() => {
        $(add_new_option_modal).removeClass("active")
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
            $(add_product_type_modal).removeClass("active")
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
                index: newIndex,
                name: newOptionNameValue,
                sortNumber: 0,
                rename: ""
            })
            saveToLocalStorage();
            $(add_new_option_modal).removeClass("active")
            renderDom();
            // clear the input
            newOptionNameValue = "";
            $(option_name_input).val("");
        }
    })



})