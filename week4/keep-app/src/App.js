import React, {Component, Fragment} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import TakeANote from './TakeANote';
import Notes from './Notes';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [
                {
                    title: "Note 1",
                    note: "my first note in my app"
                },
                {
                    title: "Note 2",
                    note: "my second note in my app"
                },
                {
                    title: "Note 3",
                    note: "my third note in my app"
                }
            ]
        }
    }
    addNote(title, note) {
        this.setState({
            notes: [...this.state.notes, {title, note}]
        })
    }
    render() {
        return <Fragment><AppBar position="static">
        <Toolbar variant="dense">
        <IconButton color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit">
            Keep
          </Typography>
        </Toolbar>
      </AppBar>
      <TakeANote onNew={this.addNote.bind(this)}/>
      <Notes notes={this.state.notes}/>
      </Fragment>;
    }
}
