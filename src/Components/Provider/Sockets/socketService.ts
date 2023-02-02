import {socketAddress} from '../../../../settings';

const socket = new WebSocket('ws://' + socketAddress + '/open/');
const open = () => {
  try {
    socket.onopen = () => {};
  } catch (error) {
    console.error('CLIENT - CANNOT OPEN SOCKET CONNECTION', error);
  }
};

const sendMessage = (type: String, message: any) => {
  try {
    socket.send(
      JSON.stringify({
        type: type,
        message: message,
      }),
    );
    socket.onmessage = (e: any) => {
      const data = JSON.parse(e.data);
      if (data.message) {
      }
      //Error
      else {
      }
    };
  } catch (error) {
    console.error('CLIENT - CANNOT SEND SOCKET MESSAGE', error);
  }
};

const socketHandleError = () => {
  try {
    socket.onerror = (e: any) => {
      console.error('Socket Error:' + e);
    };
  } catch (error) {
    console.error('CLIENT - CANNOT SEND SOCKET MESSAGE', error);
  }
};

const SocketService = {
  socket,
  open,
  sendMessage,
  socketHandleError,
};

export default SocketService;
