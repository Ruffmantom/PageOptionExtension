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
        enable_update_notifications: true,
    },
    currentProductType: 0,
    releaseNotes: [],
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

// create updates if not there
const initUpdates = () => {
    if (globalStore.releaseNotes === null || globalStore.releaseNotes === undefined) {
        // create variable
        globalStore.releaseNotes = []
    }
    // check if settings allow for popup
    if (globalStore.settings.enable_update_notifications === null || globalStore.settings.enable_update_notifications === undefined) {
        // create variable
        globalStore.settings.enable_update_notifications = true
    }
    // add any new updates to global
    // First, create a Set of existing IDs for faster lookup
    const existingIds = new Set(globalStore.releaseNotes.map(u => u.id));
    // Filter out new updates from releases where the id does not exist in existingIds
    const newUpdates = releases.filter(u => !existingIds.has(u.id));
    // Now, add these new updates to globalStore.releaseNotes
    globalStore.releaseNotes = [...globalStore.releaseNotes, ...newUpdates.map(u => ({ ...u }))];

    // save to local
    saveToLocalStorage()
}
// render modal
const renderUpdates = () => {
    $("#release_notes_body").text("")
    // check settings first
    if (globalStore.settings.enable_update_notifications) {
        // show latest update
        latestUpdate = findMostRecentRelease(globalStore.releaseNotes)
        // check if update has been userHasRead
        if (!latestUpdate.userHasRead) {
            let greeting = returnGreeting()
            $("#release_notes_header").text(greeting)
            $("#release_notes_body").append(latestUpdate.message)
            $("#release_notes_modal").addClass("active")
        }
    }
}

const loadSettings = () => {
    /*
        useIndexInName
        enable_update_notifications
    */

    // load dom with settings
    $(add_sort_id_setting_checkbox).prop('checked', globalStore.settings.useIndexInName);
    $(enable_release_notes_checkbox).prop('checked', globalStore.settings.enable_update_notifications);
}

const loadApp = async () => {
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
        $(po_option_table_head).hide();
        $(po_option_table).hide();
    }
    // load settings
    loadSettings()
    // init updates
    initUpdates()
    renderUpdates()
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

const clearAllData = (reload) => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    globalStore.productTypes = []
    $(intro_text).show();
    // hide the table
    $(po_option_table_head).hide();
    $(po_option_table).hide();
    $(po_tab_navigation_bar).empty()
    $(product_type_display_title).text("No Product Type Available.")
    if (reload) {
        window.location.reload(true);
    }
}

const clearNoDataContent = () => {
    $(intro_text).hide();
    // hide the table
    $(po_option_table_head).show();
    $(po_option_table).show();
}