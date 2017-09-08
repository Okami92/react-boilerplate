const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [
	'react',
	'react-dom',
	'axios'
];

const devTool = process.env.NODE_ENV === 'development' ? 'eval' : '';
const sourceMap = process.env.NODE_ENV === 'development';


module.exports = {
	devtool: devTool,
	entry: {
		bundle: './src/js/index.js',
		vendor: VENDOR_LIBS,
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'js/[name].[hash].js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.(scss|css)$/,
				use: [
					{
						loader: 'style-loader',
						options: {
							sourceMap
						}
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							config: {
								path: 'postcss.config.js'
							},
							sourceMap
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap
						}
					}
				],
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/,
				use: [
					{
						loader: 'url-loader',
						options: { limit: 40000 },
					},
					'image-webpack-loader?bypassOnDebug'
				],
			},
			{
				test: /\.(eot|ttf|woff|woff2)$/,
				loader: 'url-loader'
			},
			{
				test: /\.(mp3|wav)$/,
				use: [
					{
						loader: 'file-loader',
						options: {}
					}
				]
			}
		],
	},
	plugins: [
		new webpack.optimize.ModuleConcatenationPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			names: 'vendor',
			minChunks (module) {
				return module.context &&
					module.context.indexOf('node_modules') >= 0;
			}
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV)
			},
		}),
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			excludeChunks: ['base'],
			minify: {
				collapseWhitespace: true,
				collapseInlineTagWhitespace: true,
				removeComments: true,
				removeRedundantAttributes: true
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				screw_ie8: true,
				conditionals: true,
				unused: true,
				comparisons: true,
				sequences: true,
				dead_code: true,
				evaluate: true,
				if_return: true,
				join_vars: true
			},
			output: {
				comments: false
			}
		}),
		new webpack.HashedModuleIdsPlugin()
	],
};
