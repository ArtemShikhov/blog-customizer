const path = require('path'); //для того чтобы превратить отнсительный путь в абсолютный мы будем использовать пакет path
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
	mode: 'development',
	devtool: 'eval-source-map',
	devServer: {
		historyApiFallback: true,
		static: path.resolve(__dirname, './dist'), // путь, куда "смотрит" режим разработчика
		// compress: true, // это ускорит загрузку в режиме разработки
		port: 3000, // Changed from 8000 to 3000 to avoid port conflicts
		open: true, // сайт будет открываться сам при запуске npm run dev
		hot: true,
	},
	plugins: [new ReactRefreshWebpackPlugin()],
};