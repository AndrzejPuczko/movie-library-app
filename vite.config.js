import dotenv from 'dotenv'
import { resolve } from 'path'
import { defineConfig } from 'vite'
dotenv.config()

export default defineConfig({
	root: 'src',
	base: '',
	build: {
		outDir: '../dist',
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'src/index.html'),
			},
		},
	},
	define: {
		'process.env': process.env,
	},
})
