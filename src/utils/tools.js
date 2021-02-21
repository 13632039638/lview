function tplReplace (template, replaceObject) {
	return template().replace(/{{(.*?)}}/g, (node, key) => {
    return replaceObject[key.trim()];
	});
}

export {
    tplReplace,
};