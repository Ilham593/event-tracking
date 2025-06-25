import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  // Load env file berdasarkan mode (development, production, dll)
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss()],
    define: {
      // Mendefinisikan variabel global yang bisa diakses di kode frontend
      'process.env': env,
    },
    // konfigurasi lain yang Anda perlukan
  };
});
