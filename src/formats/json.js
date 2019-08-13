/**
 * convert a single dataset to compact JSON format.
 * @param dataset an array of samples in the format {input: {feature1: xxx, feature2: yyy, ...}, output: [1,2,3]}
 */
export function toJSON(dataset) {
	json = "[";
	for (var i=0; i<dataset.length; ++i) {
		json += (
			(i>0? "\n, ": "\n  ")+
			JSON.stringify(dataset[i]));
	}	
	json += "\n]\n";
	return json;
}

