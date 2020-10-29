
// all possible options
const DEFAULTS = {
  inputs: [], // can also be a number
  outputs: [], // can also be a number
  dataUrl: null,
  modelUrl: null,
  layers: [], // custom layers 
  task: null, // 'classification', 'regression', 'imageClassificaiton'
  debug: false, // determines whether or not to show the training visualization
  learningRate: 0.2,
  hiddenUnits: 16,
};

const options = {
	inputs: ['board'],
  	outputs: ['score'],
  	task: 'regression' // or 'classification'
  	// layers: [
   //  {
   //    type: 'dense',
   //    units: 27,
   //    activation: 'relu'
   //  },
   //  {
   //    type: 'dense',
   //    units: 27,
   //    activation: 'sigmoid'
   //  },
   //  {
   //    type: 'dense',
   //    activation: 'sigmoid'
   //  }
  // ]
}
const nn = ml5.neuralNetwork(options)
if (nn.loadData('data.json')) {
	console.log('data loaded');
}