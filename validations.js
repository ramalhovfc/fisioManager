function isAlphabeticOrSpace(str) {
	return /^[a-zA-Z()]+$/.test(str);
}

module.exports = {
	isAlphabeticOrSpace: isAlphabeticOrSpace
};