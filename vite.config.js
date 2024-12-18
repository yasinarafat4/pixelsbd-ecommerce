import react from '@vitejs/plugin-react';
import i18n from 'laravel-react-i18n/vite';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';

export default () =>
{
    return defineConfig( {
        plugins: [
            laravel( {
                input: 'resources/js/app.jsx',
                refresh: false,
            } ),
            react(),
            i18n(),
        ],
        base: '/',
        server: {
            watch: {
                ignored: [ '**/node_modules/**', '**/public/**', '**/storage/**' ], // Ignore unnecessary files
            },
            hmr: true,
        },
        build: {
            outDir: 'public/build',
            minify: 'terser',
            terserOptions: {
                compress: {
                    drop_console: true, // Remove console logs
                    drop_debugger: true,
                },
                format: {
                    comments: false, // Remove all comments
                },
            },
            cssMinify: true,
            emptyOutDir: true,  // Clear old files from the build directory
        },
    } );
}

