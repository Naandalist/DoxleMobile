import React, {useEffect, useState, createContext, ReactChild} from 'react';
import {socketAddress} from '../../../../settings';

const SOCKET_URL = 'ws://' + socketAddress + '/open/';
const SOCKET_RECONNECTION_TIMEOUT = 1000;
const webSocket = new WebSocket(SOCKET_URL);

export const SocketContext = createContext(webSocket);

interface ISocketProvider {
  children: React.ReactNode;
}

export const SocketProvider = (props: ISocketProvider) => {
  const [ws, setWs] = useState<WebSocket>(webSocket);

  useEffect(() => {
    console.info('Socket Status: ' + webSocket.readyState);
    const onClose = () => {
      setTimeout(() => {
        setWs(new WebSocket(SOCKET_URL));
        console.log(
          '%cCLIENT=Reconnecting Socket',
          'background:yellow; color:black',
        );
      }, SOCKET_RECONNECTION_TIMEOUT);
    };

    ws.addEventListener('close', onClose);

    return () => {
      ws.removeEventListener('close', onClose);
    };
  }, [ws, setWs]);

  return (
    <SocketContext.Provider value={ws}>{props.children}</SocketContext.Provider>
  );
};
