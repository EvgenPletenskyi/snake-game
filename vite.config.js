import { defineConfig } from 'vite';

export default defineConfig({
    esbuild: {
        target: 'esnext', // Підтримка ESNext, включаючи top-level await
    },
    server: {
        port: 3000, // Порт сервера
        open: true,  // Автоматично відкривати браузер при запуску
    },
    build: {
        target: 'esnext',
        outDir: 'dist', // Директорія для згенерованих файлів
        sourcemap: true, // Генерація sourcemaps
    },
    resolve: {
        alias: {
            '@': '/src', // Налаштування шляху до директорії src
        },
    },
});
