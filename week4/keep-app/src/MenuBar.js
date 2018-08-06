import React, {Component, Fragment} from 'react';
import Paper from '@material-ui/core/Paper';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = {
    MenuBar: {
        minHeight: "400px",
        padding: "50px"
    }
}

export default class MenuBar extends Component {
    render() {
        return <Fragment> <Paper style={styles.MenuBar}> 
        < Router >
        <List component="nav">
            <ListItem button>
                 < Link to = "/" > < ListItemText primary = "Home" / > < /Link>
            </ListItem>
       </List>
        
      < /Router >
         </Paper> </Fragment>;
    }
}