function isAlphabeticOrSpace(str) {
	return /^[a-zA-Z0-9\sºª\-\\.áàãâÁÀÃÂéèêÉÈÊíìîÍÌÎóòõôÓÒÔÕúùûÚÙÛ]+$/.test(str);
}

function isAlphabeticOrSpaceOrUnderscore(str) {
	return /^[a-zA-Z0-9\sºª\-\\.áàãâÁÀÃÂéèêÉÈÊíìîÍÌÎóòõôÓÒÔÕúùûÚÙÛ_]+$/.test(str);
}

module.exports = {
	isAlphabeticOrSpace: isAlphabeticOrSpace,
	isAlphabeticOrSpaceOrUnderscore: isAlphabeticOrSpaceOrUnderscore
};