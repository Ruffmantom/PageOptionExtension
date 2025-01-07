const getDefaultGlobalStore = () => ({
    productTypes: [
        {
            id: "4484796298-91188956833-3779912650",
            name: "Default Product Type",
            options: [
                {
                    id: "3055988949-3394104210-2780396807",
                    isDeleteAble: true,
                    optionName: "Paper",
                    reName: "",
                    sortId: 1,
                    newSortId: null
                },
                {
                    id: "1144022491-8285567828-7690050362",
                    isDeleteAble: true,
                    optionName: "Format",
                    reName: "",
                    sortId: 2,
                    newSortId: 0
                },
                {
                    id: "3009128949-3394104210-2799646807",
                    isDeleteAble: true,
                    optionName: "Pages",
                    reName: "",
                    sortId: 3,
                    newSortId: 0,
                },
                {
                    id: "1144022491-8127942284-7690050362",
                    isDeleteAble: true,
                    optionName: "Colors",
                    reName: "",
                    sortId: 4,
                    newSortId: 0,
                },
                {
                    id: "1337822491-8280642284-7690050362",
                    isDeleteAble: true,
                    optionName: "Book Binding",
                    reName: "",
                    sortId: 5,
                    newSortId: 0,
                },
                {
                    id: "3009128949-3394104210-2762976807",
                    isDeleteAble: true,
                    optionName: "Refinement",
                    reName: "",
                    sortId: 6,
                    newSortId: 0,
                },
                {
                    id: "1144022491-825972284-7690050362",
                    isDeleteAble: true,
                    optionName: "Finishing",
                    reName: "",
                    sortId: 7,
                    newSortId: 0,
                },
            ]
        },
    ],
    settings: {
        useIndexInName: false,
    },
    currentProductType: 0,
});

let globalStore = getDefaultGlobalStore(); // initial in-memory default

const LOCAL_STORAGE_KEY = 'eRXhSBUBMaQgkqKApzZXMPyGeFbcTyprTxKt3Mwz92GPx2mJ2XbNYd7igzDf';


// render functions
const renderDom = () => {
    $(po_tab_navigation_bar).empty();
    //empty the option table   
    $(product_type_options_table).empty();
    // render the current product type
    let currentProductType = globalStore.productTypes.find(pt => pt.id === globalStore.currentProductType);
    if (!currentProductType && globalStore.productTypes.length > 0) {
        // If the 'currentProductType' is invalid, set to the first product type
        globalStore.currentProductType = globalStore.productTypes[0].id;
        currentProductType = globalStore.productTypes[0];
    }
    // set display title
    $(product_type_display_title).text(currentProductType.name);
    // add all product types to the tab navigation
    globalStore.productTypes.forEach((productType) => {
        $(po_tab_navigation_bar).append(createProductTypeTab(productType, currentProductType.id));
    })
    // clear the table
    currentProductType.options.forEach((productType) => {
        $(product_type_options_table).append(createProductOptionHtml(productType));
    })
}

const loadApp = async () => {
    // eventually this will load in from local storage
    // if its not in local then it will be initialized
    // po_option_table.hide();
    // globalStore = exampleData;
    await loadFromLocalStorage();

    if (globalStore.productTypes.length > 0) {
        // console.log('we have data')
        // hide intro text
        $(intro_text).hide();
        // show the table
        $(po_option_table).show();
        renderDom();
    } else {
        // console.log('we have no data')
        // show the intro text
        $(intro_text).show();
        // hide the table
        $(po_option_table).hide();
    }
}

const saveToLocalStorage = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(globalStore));
}

const loadFromLocalStorage = () => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data) {
        // console.log('loading from local storage')
        globalStore = JSON.parse(data);
    } else {
        // console.log('no data in local storage')
        // If no data, then initialize globalStore with a fresh default 
        // and save it so we don't keep hitting this branch on refresh.
        globalStore = getDefaultGlobalStore();
        saveToLocalStorage();
    }
};