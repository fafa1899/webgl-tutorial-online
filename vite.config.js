import { defineConfig, loadEnv } from "vite";
import { resolve } from "path"; // 导入 path 模块

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    server: {
      host: "0.0.0.0", // 绑定所有网络接口
      port: 3001, // 自定义开发服务器端口
      open: true, // 自动打开浏览器
      https: {
        key: resolve(__dirname, env.SSL_KEY), // 替换为你的密钥文件路径
        cert: resolve(__dirname, env.SSL_CERT), // 替换为你的证书文件路径
      },
    },
    build: {
      outDir: "./dist", // 构建输出目录
    },
    preview: {
      host: "0.0.0.0", // 绑定所有网络接口
      port: 3001, // 预览服务器端口
      open: true, // 自动打开浏览器
    },
  };
});
