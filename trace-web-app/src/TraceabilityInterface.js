import traceability from './dummy_data/TraceLinks.json'

export function getTraceLinkValue(source_name, target_name) {
	return traceability.links[source_name][target_name]
}

export function getTraceLinks(source_name) {
	return traceability.links[source_name]
}