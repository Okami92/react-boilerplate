const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");

const isDev = process.env.NODE_ENV === 'development';

let plugins = [
	new webpack.optimize.ModuleConcatenationPlugin(),
	new webpack.optimize.CommonsChunkPlugin({
		name: 'vendor',
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
	new webpack.HashedModuleIdsPlugin(),
	new webpack.NoEmitOnErrorsPlugin(),
];

const productionPlugins = [
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
		}
	}),
	new CompressionPlugin({
		asset: "[path].gz[query]",
		algorithm: "gzip",
		test: /\.js$|\.css$|\.html$/,
		threshold: 10240,
		minRatio: 0
	})
];

!isDev ? plugins = [...plugins, ...productionPlugins] : null;


module.exports = {
	devtool: isDev ? 'eval' : '',
	entry: {
		bundle: './src/js/index.js',
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
					{ loader: 'style-loader', options: { sourceMap: isDev } },
					{ loader: 'css-loader', options: { sourceMap: isDev } },
					{
						loader: 'postcss-loader',
						options: {
							config: {
								path: 'postcss.config.js'
							},
							sourceMap: isDev
						}
					},
					{ loader: 'sass-loader', options: { sourceMap: isDev } }
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
	plugins
};
