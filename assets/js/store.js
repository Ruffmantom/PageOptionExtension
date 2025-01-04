const intro_text = $("#intro_text");
const po_option_table = $("#po_option_table");

let globalStore = {
    productTypes: [],
    settings: {
        useIndexInName: false,
    }
}

const exampleData = {
    productTypes: [
        {
            id: 1,
            name: 'Vinyl Banner Type',
            options: [
                {
                    id: 1,
                    name: 'Roll Materials',
                    index: 1,
                    rename: "",
                    sortNumber: 0,
                },
                {
                    id: 2,
                    name: 'Color',
                    index: 2,
                    rename: "Ink",
                    sortNumber: 0,
                },
                {
                    id: 3,
                    name: 'Format',
                    index: 3,
                    rename: "Size",
                    sortNumber: 0,
                },
                {
                    id: 4,
                    name: 'Grommets',
                    index: 4,
                    rename: "",
                    sortNumber: 0,
                },
            ]
        },
        {
            id: 2,
            name: 'Printed Vinyl',
            options: [
                {
                    id: 1,
                    name: 'Roll Materials',
                    index: 1,
                    rename: "",
                    sortNumber: 0,
                },
                {
                    id: 2,
                    name: 'Format',
                    index: 2,
                    rename: "Size",
                    sortNumber: 0,
                },
                {
                    id: 3,
                    name: 'Grommets',
                    index: 3,
                    rename: "",
                    sortNumber: 0,
                },
            ]
        }
    ],
    settings: {
        useIndexInName: false,
    },
    currentProductType: 1,
}


// render functions
const renderProductTypes = ()=>{
    // render the current product type
    let currentProductType = globalStore.productTypes.find((productType) => productType.id === globalStore.currentProductType);

    // clear the table
    currentProductType.options.forEach((productType) => {
        po_option_table.append(createProductOptionHtml(productType));
    })
}

const loadApp = () => {
    // eventually this will load in from local storage
    // if its not in local then it will be initialized
    globalStore = exampleData;
    
    if (globalStore.productTypes.length > 0) {
        // hide intro text
        intro_text.hide();
        // show the table
        po_option_table.show();
        renderProductTypes();
    } else {
        // hide the table
        po_option_table.hide();
        // show the intro text
        intro_text.show();
    }
}