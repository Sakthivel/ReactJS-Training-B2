import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ChatBox from './ChatBox';
import UsersList from './UsersList';
import SendMessageForm from './SendMessageForm';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const styles = {
    chatBox : {
        background: 'aliceblue',
        height: '515px',
        overflowY: 'auto',
        border: '2px solid #007bb2',
        padding: '12px'
    },
    modal: {
        background: 'white',
        marginTop: '15%',
        width: '395px',
        marginLeft: '33%',
        padding: '20px'
    }
  };

class Chat extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        currentUser: PropTypes.object,
        currentRoom:  PropTypes.object,
        messages: PropTypes.array
      };

    constructor (props) {
        super();

        this.state = {
            currentUser: {},
            currentRoom: {},
            messages: [],
            roomId: 15456697,
            update: true,
            newRoom: true,
            openModal: false,
            newRoomName: ''
        }

        this.sendMessage = this.sendMessage.bind(this);
    }

    sendMessage(text) {
        this.props.currentUser.sendMessage({
            text,
            roomId: this.props.roomId || 15456697
        })

        this.props.dispatch({
            type: 'GET_MESSAGE',
            roomId: this.props.roomId || 15456697,
            currentUser: this.props.currentUser
        });

        this.setState({
            update:true
        })
    }

    componentDidMount () {
        this.props.dispatch({
            type: 'GET_CURRENT_USER',
            currentUser: this.props.username
        });

        this.setState({
            newRoom:true
        })
    }

    newRoomName(e) {
        this.setState({ newRoomName: e.target.value });
    }

    addRoom(e) {
        e.preventDefault();
        if (this.state.newRoomName !=='') {
            this.props.dispatch({
                type: 'GET_NEW_ROOM',
                currentUser: this.props.currentUser,
                roomName: this.state.newRoomName
            });
            this.handleClose();
        }
    }

    handleOpen() {
        this.setState({ openModal: true });
    }

    handleClose() {
        this.setState({ openModal: false });
    }

    render() {
        const currentUser = this.props.currentUser || {};
        const users = currentUser ? currentUser.users : [];
        const messages = this.props.messages || [];

        if(users && users.length && (this.state.update === true || this.state.newRoom === true ) ){
            this.props.dispatch({
                type: 'GET_MESSAGE',
                roomId: this.props.roomId || 15456697,
                currentUser: this.props.currentUser
            });

            this.setState({
                update:false,
                newRoom: false
            });
        }

        return (
            <Fragment>
                <Grid container spacing={24}>
                    <Grid item xs={4}>
                        <UsersList currentUser={currentUser} users={users} />
                    </Grid>
                    <Grid item xs={4}>
                        <div  ref='scroll' style={styles.chatBox}>
                            <ChatBox
                                messages={messages}
                            />
                        </div>
                            <SendMessageForm
                                onSubmit={this.sendMessage}
                            />

                    </Grid>
                    <Grid item xs={4}>
                        <Button variant="contained" color="primary" onClick={this.handleOpen.bind(this)} aria-label="Create Room">
                            Create Room
                        </Button>

                        <Modal aria-labelledby="simple-modal-title"
                               aria-describedby="simple-modal-description"
                               open={this.state.openModal}
                               onClose={this.handleClose.bind(this)}>
                          <div style={styles.modal}>
                                <Typography variant="title" id="modal-title">
                                  New Chat Room Name
                                </Typography>
                                <TextField
                                  id="newRoom"
                                  label="New Chat Room Name"
                                  onChange={this.newRoomName.bind(this)}
                                  margin="normal"
                                  fullWidth
                                />
                                <Button onClick={this.addRoom.bind(this)}
                                    variant="raised"
                                    fullWidth
                                    color="primary" >
                                    Submit
                                </Button>
                          </div>
                        </Modal>
                    </Grid>

                </Grid>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    messages: state.messages,
    currentUser: state.currentUser,
    roomId: state.roomId
});

export default  connect(mapStateToProps) (Chat);
