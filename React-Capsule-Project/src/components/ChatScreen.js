import React, { Component } from 'react';
import Chatkit from '@pusher/chatkit';
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';
// import TypingIndicator from './TypingIndicator';
import WhosOnlineList from './WhosOnlineList';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

class ChatScreen extends Component {
    constructor (props) {
        super();

        this.state = {
            currentUser: {},
            currentRoom: {},
            messages: [],
            usersWhoAreTyping: []
        }

        this.sendMessage = this.sendMessage.bind(this);
        // this.sendTypingEvent = this.sendTypingEvent.bind(this);
    }

    // sendTypingEvent() {
    //     this.state.currentUser
    //         .isTypingIn({ roomId: this.state.currentRoom.id })
    //         .catch(error => console.error('error', error))
    // }

    sendMessage(text) {
        this.state.currentUser.sendMessage({
            text,
            roomId: this.state.currentRoom.id
        })
    }

    componentDidMount () {
        const chatManager = new Chatkit.ChatManager({
            instanceLocator: 'v1:us1:3e937575-3d1a-4604-bc09-190f79f02b60',
            userId: this.props.currentUsername,
            tokenProvider: new Chatkit.TokenProvider({
                url: 'http://localhost:3001/authenticate'
            })
        })

        chatManager
        .connect()
        .then(currentUser => {
          this.setState({ currentUser })
          return currentUser.subscribeToRoom({
            roomId: 14943454,
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
        const styles = {
            container: {
                
            },
            chatContainer: {
                padding: 20,
                marginTop: 30
            },
            whosOnlineListContainer: {
                padding: 20,
                marginTop: 30,
                marginLeft: 10
            },
            chatListContainer: {
                
            }
        }
        return (
            <React.Fragment>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit">
                            Chat App
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={3}>
                        <Paper style={styles.whosOnlineListContainer}>
                            <WhosOnlineList
                                currentUser={this.state.currentUser}
                                users={this.state.currentRoom.users}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={8} style={styles.chatListContainer}>
                        <Paper style={styles.chatContainer}> 
                            <MessageList
                                messages={this.state.messages}
                                style={styles.chatList}
                            />
                            <SendMessageForm 
                                onSubmit={this.sendMessage}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}

export default ChatScreen;