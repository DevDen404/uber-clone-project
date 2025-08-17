import React, { createContext, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);

  useEffect(() => {
    // Connect to your backend socket server
    socketRef.current = io(import.meta.env.VITE_BASE_URL, {
      transports: ['websocket'],
      withCredentials: true,
    });

    socketRef.current.on('connect', () => {
      console.log('Socket connected:', socketRef.current.id);
    });

    socketRef.current.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  // Send message to an event
  const sendMessage = (event, msg) => {
    if (socketRef.current) {
      socketRef.current.emit(event, msg);
    }
  };

  // Listen for messages from an event
  const receiveMessage = (event, callback) => {
    if (socketRef.current) {
      socketRef.current.on(event, callback);
    }
  };

  return (
    <SocketContext.Provider value={{ sendMessage, receiveMessage }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;