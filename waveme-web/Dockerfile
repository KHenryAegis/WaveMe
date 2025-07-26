# 使用官方 Node.js 镜像作为基础镜像
FROM node:16

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 pnpm-lock.yaml 文件
COPY package*.json pnpm-lock.yaml ./

# 安装 pnpm
RUN npm install -g pnpm

# 使用 pnpm 安装依赖
RUN pnpm install

# 复制项目的其他文件
COPY . .

# 开放应用的端口（默认 Nuxt.js 端口为 3000）
EXPOSE 3000

# 使用 pnpm 启动 Nuxt.js 应用
CMD ["pnpm", "run", "dev"]
