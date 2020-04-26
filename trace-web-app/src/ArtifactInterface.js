import artifacts from './dummy_data/Artifacts.json';

export async function getArtifact(artifactClass, id) {
	return artifacts[artifactClass][id];
}

export async function getAllArtifacts(artifactClass) {
	return Object.values(artifacts[artifactClass]);
}

export async function getNumberOfArtifacts(artifactClass) {
	return Object.keys(artifacts[artifactClass]).length;
}

export function getArtifactClass(artifactName) {
	for (let artifactClass of Object.keys(artifacts)) {
		if (artifactName in artifacts[artifactClass]) {
			return artifactClass;
		}
	}
}

export function getArtifactClassName(artifactClass) {
	switch(artifactClass) {
		case 'req': return "Requirement";
		case 'src': return "Source Code";
		case 'tc': return "Test Case";
		default: return "Unknown";
	}
}