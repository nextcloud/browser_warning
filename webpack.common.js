const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: {
		main: path.join(__dirname, 'src/main.js')
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'js')
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: ['.js'],
		symlinks: false
	}
};
