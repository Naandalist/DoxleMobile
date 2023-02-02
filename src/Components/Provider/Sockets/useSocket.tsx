//! THIS IS A CUSTOM HOOK FOR SOCKETS . CAN BE USED ANYWHERE IN THE APP

import { useCallback, useContext, useEffect, useState } from 'react'
import { SocketContext } from './socketContext'

export const useSocket = () => {
  const socket = useContext(SocketContext)
  socket.onopen = () =>
    console.log('%cCLIENT = Socket Is Open', 'background:yellow; color:black')

  return socket
}
