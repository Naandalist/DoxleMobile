export const offline: boolean = false;
const local: boolean = false;
export const baseAddress: string = local
  ? '127.0.0.1:8000/api'
  : '3.104.202.139:8000/api';
export const socketAddress: string = local
  ? '127.0.0.1:8000/ws'
  : '3.104.202.139:8000/ws';
export const docketsBaseAddress: string = local
  ? '127.0.0.1:5000'
  : '192.168.1.113:5000';
