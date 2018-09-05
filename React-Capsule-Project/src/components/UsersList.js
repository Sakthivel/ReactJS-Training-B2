import React, { Component } from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = {
  list : {
    background: '#eee',
    cursor: 'default'
  },
  highlighted : {
    background: '#ddd',
    cursor: 'default'
  }
}

class UsersList extends Component {

  render() {
    if (this.props.users) {
      return  <List component="nav">
        {this.props.users.map((user, index) => {
          if (user.id === this.props.currentUser.id) {
            return (
              <ListItem style={styles.highlighted} key={user.id} button>
                <ListItemText primary={user.name} />
              </ListItem>
            )
          }
          return (
            <ListItem style={styles.list}  key={user.id} button>
                <ListItemText primary={user.name} />
              </ListItem>
          )
        })}
      </List>
    } else {
      return <p>Loading...</p>
    }
  }
}

export default UsersList;