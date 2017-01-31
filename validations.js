function isAlphabeticOrSpace(str) {
	return /^[a-zA-Z0-9\sºª\-\\.áàãâÁÀÃÂéèêÉÈÊíìîÍÌÎóòõôÓÒÔÕúùûÚÙÛ]+$/.test(str);
}

module.exports = {
	isAlphabeticOrSpace: isAlphabeticOrSpace
};