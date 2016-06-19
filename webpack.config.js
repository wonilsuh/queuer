console.log('//-----------------------------------------------------');
console.log('// Webpack begins...');

//-----------------------------------------------------
//	dependencies
const path = require('path');

//-----------------------------------------------------
//	set up webpack loaders
var loaders = [
	{
		"test":/\.js$/,
		"exclude":/(node_modules|bower_components)/,
		"loader":"babel",
		query: {
			presets: [
				"es2015",
				"stage-0"
			],
			plugins:[
				"transform-runtime"
			]
		}
	}
]

//-----------------------------------------------------
//	here are the fianl webpack config files
module.exports = {
	"entry":"./src/index.js",
	"output":{
		"filename":"index.js",
		"path":"./",
		"chunkFilename":"./[name]-[id].bundle.js",
		"publicPath":"./"
	},
	"module":{
		"loaders":loaders
	},
	postcss: function () {
        return [autoprefixer];
    }
}
