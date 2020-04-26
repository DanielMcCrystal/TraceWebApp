import traceability from './dummy_data/TraceLinks.json'

export function getTraceLinkValue(sourceName, targetName) {
	return traceability.links[sourceName][targetName]
}

export function getTraceLinks(artifactName) {
	if (artifactName in traceability.links) {
		return traceability.links[artifactName]
	}

	const traceLinks = {};
	if (artifactName in traceability.links[Object.keys(traceability.links)[0]]) {
		
		Object.keys(traceability.links).forEach((sourceName) => {
			traceLinks[sourceName] = traceability.links[sourceName][artifactName];
		});
	}
	return traceLinks;
}

export function getLinkThreshold() {
	return 0.5;
}