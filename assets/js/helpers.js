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
    // console.log(currentProductType);
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
            let nameFormat = `${p.optionName}:${globalStore.settings.useIndexInName ? `${p.newSortId}. ${p.reName ? p.reName : p.optionName}` : `${p.reName ? p.reName : p.optionName}`};`
            nameOutput.push(nameFormat)
        })
    } else {
        // default 
        currentProductType.options.forEach(p => {
            sortOutput.push(p.sortId)
            let nameFormat = `${p.optionName}:${globalStore.settings.useIndexInName ? `${p.sortId}. ${p.reName ? p.reName : p.optionName}` : `${p.reName ? p.reName : p.optionName}`};`
            nameOutput.push(nameFormat)
        })
    }
    // now return based on type
    if (type === "name") {
        return nameOutput.join('');
    } else {
        return sortOutput.join(',');
    }

}


// now use "copy_input_hidden" to copy the output
function copyToClipboard(output) {
    navigator.clipboard.writeText(output).then(() => {
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}


// most recent Update
const findMostRecentRelease = (array) => {
    // Get the current date with time set to 00:00:00 for comparison
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    // Convert the date strings to Date objects and filter out future dates
    const validDates = array
        .map((element) => {
            return {
                ...element,
                dateObj: new Date(element.dateIssued)
            };
        })
        .filter((element) => element.dateObj <= currentDate);

    // Sort the dates in descending order
    validDates.sort((a, b) => b.dateObj - a.dateObj);
    console.log('Valid Releases: ', validDates)

    // Return the most recent date object, or null if none are valid
    return validDates.length > 0 ? validDates[0] : null;
}


const returnGreeting = () => {
    let currentTime = new Date()
    const hour = currentTime.getHours();
    // console.log("Current Hour: ", hours)
    if (hour <= 11) {
        return "Good Morning!"
    } else if (hour <= 17) {
        return "Good Afternoon!"
    } else {
        return "Good Evening!"
    }
}