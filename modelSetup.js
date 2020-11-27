
// all possible options
// const DEFAULTS = {
//   inputs: [], // can also be a number
//   outputs: [], // can also be a number
//   dataUrl: null,
//   modelUrl: null,
//   layers: [], // custom layers 
//   task: null, // 'classification', 'regression', 'imageClassificaiton'
//   debug: false, // determines whether or not to show the training visualization
//   learningRate: 0.2,
//   hiddenUnits: 16,
// };

const options = {
	// inputs: ['board'],
 //  	outputs: ['score'],
  	task: 'regression', // or 'classification'
  	debug: true,
  	// learningRate: 0.2
  	// hiddenUnits: 27
 //  	layers: [
	//   {
	//     type: 'dense',
	//     units: 81,
	//     activation: 'relu',
	//   },
	//   {
	//     type: 'dense',
	//     units: 27,
	//     activation: 'sigmoid',
	//   },
	// ]
}
nn = ml5.neuralNetwork(options);

// loading data
nn.loadData('data.json');
console.log('data loaded');

// loading previous state of model
const modelInfo = {
  model: 'model/model.json',
  metadata: 'model/model_meta.json',
  weights: 'model/model.weights.bin',
};
nn.load(modelInfo, modelLoadedCallback);

function modelLoadedCallback() {
	console.log('model loaded');
}

