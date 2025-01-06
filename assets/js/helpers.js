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


// one function to generate outputs
// The generateOutputs function generates and returns either a name or sort output based on the provided type.
// It takes a type parameter which can be either "name" or "sort" and returns the corresponding output.
/*
// option keys
    id
    isDeleteAble
    optionName
    reName
    sortId
    newSortId
*/
const generateOutputs = (type) => {
    let output = [];
    let nameOutput = [];
    let sortOutput = [];
    // need to get the current product type
    let currentProductType = globalStore.productTypes.find(productType => productType.id === globalStore.currentProductType);
    console.log(currentProductType);
    // need to generate two outputs
    // one for names
    // one for sort
    // outputs should only include options that are using newSortId
    // if none are then use sortId as default
    currentProductType.options.forEach(p => {
        if (parseInt(p.newSortId) > 0) {
            // move to output
            output.push(p);
        }
    })
    // now sort the outputs
    if (output.length > 0) { // Check if there are elements in the array
        // sort First
        output.sort((a, b) => a.newSortId - b.newSortId)
        // create outputs
        output.forEach(p => {
            sortOutput.push(p.sortId)
            let nameFormat = `${p.optionName}:${globalStore.settings.useIndexInName ? `${p.newSortId}. ${p.rename ? p.rename : p.optionName}` : `${p.rename ? p.rename : p.optionName}`};`
            nameOutput.push(nameFormat)
        })
    } else {
        // default 
        currentProductType.options.forEach(p => {
            sortOutput.push(p.sortId)
            let nameFormat = `${p.optionName}:${globalStore.settings.useIndexInName ? `${p._id}. ${p.rename ? p.rename : p.optionName}` : `${p.rename ? p.rename : p.optionName}`};`
            nameOutput.push(nameFormat)
        })
    }


    console.log("Names: ", nameOutput, "\n\n Names: ", sortOutput);

    // now return based on type
    if (type === "name") {
        return nameOutput.join('');
    } else {
        return sortOutput.join(',');
    }

}


// now use "copy_input_hidden" to copy the output
function copyToClipboard(text) {
    // Create a hidden input element
    const input = document.createElement('input');
    // Set the input value to the text
    input.value = text;
    // Append the input to the body
    document.body.appendChild(input);
    // Select the input
    input.select();
    // Copy the selected text
    document.execCommand('copy');
    // Remove the input
    document.body.removeChild(input);
}