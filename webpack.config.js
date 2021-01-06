const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	context: process.cwd(),
	mode: 'production',
	entry: {
		index: './src/index.ts'
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/i,
				loader: 'ts-loader',
				exclude: /node_modules/,
				options: {
					transpileOnly: true
				}
			},
			{
				test: /\.css$/i,
				use: [
					'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource'
			},
			{
				test: /\.(html|htm)$/i,
				use: 'html-loader'
			}
		]
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist'
	},
	plugins: [
		new ForkTsCheckerWebpackPlugin({ 
			eslint: { 
				files: './src/**/*.{ts,tsx,js,jsx}' 
			} 
		}),
		new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
		new HtmlWebpackPlugin({
			template: './src/index.html',
			favicon: './src/favicon.ico'
		})
	],
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		modules: ['./node_modules'],
		symlinks: false,
		fallback: {
			'buffer': require.resolve('buffer/'),
			'stream': require.resolve('stream-browserify')
		}
	},
	output: {
		filename: '[name].[contenthash].js',
		path: path.resolve(__dirname, 'dist')
	},
	optimization: {
		moduleIds: 'deterministic',
		runtimeChunk: 'single',
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all',
				}
			}
		}
	}
};