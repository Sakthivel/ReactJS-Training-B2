import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';

const styles = {
    paper : {
        background: '#e6efdf',
        padding: '10px'
    },
    even : {
        marginRight: '10px',
        borderBottom: '1px solid #ddd',
        listStyle: 'none',
        
        marginBottom: '10px'
    },
    odd : {
        marginLeft: '10px',
        borderBottom: '1px solid #ddd',
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
    }
}

export default ChatWindow;