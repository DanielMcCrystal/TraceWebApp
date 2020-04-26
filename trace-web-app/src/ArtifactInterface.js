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