
function space(spaceName, clientId) {
	return spaceName+'/'+clientId;
}

function selfSpace(spaceName, clientId) {
	return space(spaceName, clientId)+'/self';
}

module.exports = {
	name: space,
	selfName: selfSpace
};