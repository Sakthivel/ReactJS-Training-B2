import React, { Component, Fragment } from 'react';
import Chatkit from '@pusher/chatkit';
import ChatWindow from './ChatBox';
import UsersList from './UsersList';
import SendMessageForm from './SendMessageForm';
import Grid from '@material-ui/core/Grid';

const styles = {
    chatWindow : {
        background: '#fff',
        height: '515px',
        overflowY: 'auto',
        border: '1px solid #007bb2',
        padding: '12px'
    }
  };

class Chat extends Component {
    constructor (props) {
        super();

        this.state = {
            currentUser: {},
            currentRoom: {},
            messages: [],
            usersWhoAreTyping: []
        }

        this.sendMessage = this.sendMessage.bind(this);
    }

    sendMessage(text) {
        this.state.currentUser.sendMessage({
            text,
            roomId: this.state.currentRoom.id
        })
    }

    componentDidMount () {
        const chatManager = new Chatkit.ChatManager({
            instanceLocator: 'v1:us1:f3b4d9d2-eb2b-412a-9fba-b5885cebb3b8',
            userId: this.props.username,
            tokenProvider: new Chatkit.TokenProvider({
                url: 'http://localhost:3001/authenticate'
            })
        })

        chatManager.connect()
        .then(currentUser => {
          this.setState({ currentUser })
          return currentUser.subscribeToRoom({
            roomId: 15456697,
            messageLimit: 100,
            hooks: {
              onNewMessage: message => {
                this.setState({
                  messages: [...this.state.messages, message],
                })
              },
              onUserCameOnline: () => this.forceUpdate(),
              onUserWentOffline: () => this.forceUpdate(),
              onUserJoined: () => this.forceUpdate()
            }
          })
        })
        .then(currentRoom => {
          this.setState({ currentRoom })
        })
        .catch(error => console.error('error', error))
    }

    render() {
        return (
            <Fragment>
                <Grid container spacing={24}>
                    <Grid item xs={4}>
                        <UsersList 
                            currentUser={this.state.currentUser}
                            users={this.state.currentRoom.users}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <div  ref='scroll' style={styles.chatWindow}>
                            <ChatWindow
                                messages={this.state.messages}
                            />
                        </div>
                            <SendMessageForm
                                onSubmit={this.sendMessage}
                            />

                    </Grid>
                    
                </Grid>
            </Fragment>
        )
    }
}

export default Chat;
