const getDefaultGlobalStore = () => ({
    productTypes: [],
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
    $(po_option_table).empty();
    // render the current product type
    let currentProductType = globalStore.productTypes.find(pt => pt.id === globalStore.currentProductType);
    if (!currentProductType && globalStore.productTypes.length > 0) {
        // If the 'currentProductType' is invalid, set to the first product type
        globalStore.currentProductType = globalStore.productTypes[0].id;
        currentProductType = globalStore.productTypes[0];
    }
    // add all product types to the tab navigation
    globalStore.productTypes.forEach((productType) => {
        $(po_tab_navigation_bar).append(createProductTypeTab(productType, currentProductType.id));
    })
    // clear the table
    currentProductType.options.forEach((productType) => {
        $(po_option_table).append(createProductOptionHtml(productType));
    })
}

const loadApp = async () => {
    // eventually this will load in from local storage
    // if its not in local then it will be initialized
    // po_option_table.hide();
    // globalStore = exampleData;
    await loadFromLocalStorage();

    if (globalStore.productTypes.length > 0) {
        console.log('we have data')
        // hide intro text
        $(intro_text).hide();
        // show the table
        $(po_option_table).show();
        renderDom();
    } else {
        console.log('we have no data')
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
        console.log('loading from local storage')
        globalStore = JSON.parse(data);
    } else {
        console.log('no data in local storage')
        // If no data, then initialize globalStore with a fresh default 
        // and save it so we don't keep hitting this branch on refresh.
        globalStore = getDefaultGlobalStore();
        saveToLocalStorage();
    }
};