import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';

const styles = {
    paper : {
        background: '#33bfff',
        padding: '10px'
    },
    even : {
        marginRight: '10px',
        borderBottom: '1px solid #007bb2',
        listStyle: 'none',
        marginBottom: '10px'
    },
    odd : {
        marginLeft: '10px',
        borderBottom: '1px solid #007bb2',
        listStyle: 'none',
        marginBottom: '10px'
    },
    username : {
        fontStyle: 'italic'
    },
    message : {
        fontSize: '12px',
        padding: '10px 0 0'
    }
}

class ChatWindow extends Component {
    render() {
        if (this.props.messages) {
            return (
                <div>
                    <ul>
                        {this.props.messages.map((message, index) => (
                        <li style={ (index % 2 === 0) ? styles.even : styles.odd} key={index}>
                            <Paper style={styles.paper} >
                                <span style={styles.username}>{message.senderId}</span>-
                                <p style={styles.message}>{message.text}</p>
                            </Paper>
                        </li>
                        ))}
                    </ul> 
                </div>
            )
        } else {
            return (<div>Loading message...</div>)
        }
    }
}

export default ChatWindow;