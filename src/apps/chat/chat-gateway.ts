import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io'
@WebSocketGateway(3002, {cors: {origin: '*'}})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect{
    @WebSocketServer() server: Server;

    private users: Map<string, string> = new Map();

    handleConnection(client: Socket){
        console.log('New user connected..', client.id);
        client.broadcast.emit('user-joined',{
            message: `New User Joined the chat: ${client.id}`
        })
    }

    handleDisconnect(client: Socket){
        const username = this.users.get(client.id) || client.id;
        this.users.delete(client.id);
        console.log('User disconnected..', client.id);
        this.server.emit('user-left',{
            message: `${client.id} left the chat: ${client.id}`
        })   
    }

    @SubscribeMessage('newMessage')
    handleNewMessage(client: Socket, message: any){
        const username = this.users.get(client.id) || "Anonymous";

        console.log(`Message from ${username}: ${message.text}`);
        client.emit('reply', `This is a reply to ${client.id}`);
        
        // Broadcast the message with the username
        this.server.emit("message", {
            sender: username,
            text: message.text,
        });
    }

    @SubscribeMessage("setUsername")
    handleSetUsername(client: Socket, username: string) {
      // Store the username associated with the client ID
      this.users.set(client.id, username);
  
      console.log(`User joined: ${username} (${client.id})`);
      this.server.emit("user-joined", {
        message: `${username} joined the chat: `,
      });
    }
}

//socket.on()


//io.emit