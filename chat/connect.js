const connectedUsers = {};
const typingUsers = {};

function handleConnection(socket){
    socket.on('setNickname', (nickname) => {
        // Set the nickname for the connected user
        connectedUsers[socket.id] = {
          nickname: nickname,
        };
        socket.broadcast.emit('userConnected', {
            userId: socket.id,
            nickname: nickname,
        });
        socket.emit('onlineUsers', Object.values(connectedUsers));
        console.log("after setting nickname", connectedUsers)
    });

    socket.on('sendMessage', (message) => {
        const user = connectedUsers[socket.id];
    
        if (user) {
            socket.broadcast.emit('messageReceived', {
              userId: socket.id,
              nickname: user.nickname,
              message: message,
            });
            socket.emit('messageReceived', {
                userId: socket.id,
                nickname: 'You',
                message: message,
            });
            // Clear typing status after sending the message
            clearTypingStatus(socket);
        }
    });
    // socket.on('sendMessage', (data) =>{
    //     const { recipientId, message } = data;
    //      const sender = connectedUsers[socket.id];
    //     const recipient = connectedUsers[recipientId]
        // if (sender && recipient) {
        //   socket.to(recipientId).emit('privateMessageReceived', {
        //       senderId: socket.id,
        //       senderNickname: sender.nickname,
        //       recipientId: recipientId,
        //       message: message,
        //     });
        //     socket.emit('privateMessageReceived', {
        //         userId: socket.id,
        //         nickname: 'You',
        //         message: message,
        //     });
        //     // Clear typing status after sending the message
        //     clearTypingStatus(socket);
        // }
    // });
    
    socket.on('startTyping', () => {
        const user = connectedUsers[socket.id];
    
        if (user) {
            // Set user as typing
            typingUsers[socket.id] = user.nickname;
    
            // Broadcast typing status to other connected users
            socket.broadcast.emit('userTyping', user.nickname);
        }
    });
    
    socket.on('stopTyping', () => {
        clearTypingStatus(socket);
    });
    
    socket.on('disconnect', () => {
        const user = connectedUsers[socket.id];
    
        if (user) {
            socket.broadcast.emit('userDisconnected', {
                userId: socket.id,
                nickname: user.nickname,
            });
            delete connectedUsers[socket.id];
            clearTypingStatus(socket);
        }
        socket.emit('onlineUsers', Object.values(connectedUsers));
    });
    
    function clearTypingStatus(socket) {
        delete typingUsers[socket.id];
        socket.broadcast.emit('userTyping', null);
    }  

}
export default handleConnection;