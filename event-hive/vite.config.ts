import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import path from 'path'
const envFile = path.resolve(__dirname,'.././.env')
dotenv.config({path:envFile})

// const { BASE_URL } = process.env;
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
// define process env
  define: {
    'process.env': process.env
  }
});