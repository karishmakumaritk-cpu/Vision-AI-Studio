import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  resolve: {
    alias: {
      react: fileURLToPath(new URL('./src/vendor/react.js', import.meta.url)),
      'react-dom/client': fileURLToPath(new URL('./src/vendor/react-dom-client.js', import.meta.url)),
      'react-router-dom': fileURLToPath(new URL('./src/vendor/react-router-dom.js', import.meta.url)),
      'react-hot-toast': fileURLToPath(new URL('./src/vendor/react-hot-toast.js', import.meta.url)),
      axios: fileURLToPath(new URL('./src/vendor/axios.js', import.meta.url)),
      'framer-motion': fileURLToPath(new URL('./src/vendor/framer-motion.js', import.meta.url)),
      'lucide-react': fileURLToPath(new URL('./src/vendor/lucide-react.js', import.meta.url))
    }
  }
});
