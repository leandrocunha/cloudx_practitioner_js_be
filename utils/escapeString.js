const escapeString = str => {
    const escapedString = str.replace(/'/g, "\\'").replace(/"/g, '\\"');
    return escapedString;
}

module.exports = { escapeString };