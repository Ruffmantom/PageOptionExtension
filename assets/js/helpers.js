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
