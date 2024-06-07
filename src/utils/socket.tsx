import { notification } from 'antd';
import { io } from 'socket.io-client';
const socket = io('http://localhost:3000'); // 假设你的 NestJS 服务器运行在 3000 端口  
socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('postUpdate', (msg) => {
  console.log(msg); // 输出从服务器发送的消息  
  setTimeout(() => {
    notification.success({
      message: `${msg.title} 💕`,
      description: <span>2222</span>,
      duration: 100000
    })
  },0)
});


export default socket;