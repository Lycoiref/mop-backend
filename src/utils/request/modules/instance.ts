import axios from 'axios';

// 创建axios单例对象
const instance = axios.create({
  baseURL: 'http://localhost:3000', // 设置基础URL
  timeout: 5000, // 设置请求超时时间
});

export default instance;
