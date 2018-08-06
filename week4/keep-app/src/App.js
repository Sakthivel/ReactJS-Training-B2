import React, {Component, Fragment} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Main from './Main';

const styles = {
    AppBar: {
        marginBottom: "20px"
    }
}

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [
                {
                    name: "Default Project",
                    desc: "Description",
                    id: 'qw2',
                    notes: [
                        "hello"
                    ]
                }
            ]
        }
    }
    addProject(name, desc, id) {
        this.setState({
            projects: [...this.state.projects, {name, desc, id}]
        })
    }
    createANote(projId, note) {
        
        let finalProj = this.state.projects.filter((proj) => {
            if (projId === proj.id) {
                if(proj.note) {
                    proj.note.push(note);
                } else {
                    proj.note = [note];
                }
            }
            return proj;
        });

        console.log(finalProj);

        this.setState(state => {
            state.projects = finalProj;
            return state;
        });
    }
    deleteProject(id) {
        let finalProj = this.state.projects.filter((proj) => {
            return id !== proj.id;
        });

        this.setState(state => {
            state.projects = finalProj;
            return state;
        });
    }
    render() {
        return <Fragment><AppBar position="static" style={styles.AppBar}>
        <Toolbar variant="dense">
        <IconButton color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit">
            Keep
          </Typography>
        </Toolbar>
      </AppBar>
      <Main onNew={this.addProject.bind(this)} projects={this.state.projects} onDelete={this.deleteProject.bind(this)} createNote={this.createANote.bind(this)}/>
      </Fragment>;
    }
}
