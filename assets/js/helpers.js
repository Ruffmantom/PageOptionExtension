function generateCustomId() {
    const generateSegment = () => {
        let segment = '';
        for (let i = 0; i < 10; i++) {
            segment += Math.floor(Math.random() * 10); // Generate a random digit (0-9)
        }
        return segment;
    };

    const id = `${generateSegment()}-${generateSegment()}-${generateSegment()}`;
    return id;
}

function generateRandomToken(length = 60) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // Uppercase letters and numbers
    const charactersLength = characters.length;
    let token = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charactersLength);
        token += characters[randomIndex];
    }

    return token;
}

// simple notification function
const notify = (message, type) => {
    // make sure notification is clear
    $("#po_notification_popper").empty("");
    // add active class to #po_notification_popper
    $("#po_notification_popper").addClass(`active ${type}`);
    // add notification to the popper
    $("#po_notification_popper").text(message);

    setTimeout(() => {
        $("#po_notification_popper").removeClass(`active ${type}`);
        // clear the timeout
        clearTimeout();
    }, 3000);
};


const generateNameOutput = () => {
    console.log('Generating name output');
    // get current product type
    const currentProductType = globalStore.productTypes.find(productType => productType.id === globalStore.currentProductType);
    // map the names to have be a string format `"name1:${rename? rename:name1}, ..."`
    const names = currentProductType.options.map(option => {
        return `${option.name}:${option.rename ? option.rename : option.name}`;
    });
    // join the names with a comma
    return names.join(";");
}
