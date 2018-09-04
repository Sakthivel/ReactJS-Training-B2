import React, {Component, Fragment} from 'react';
import Grid from '@material-ui/core/Grid';
import TakeAProject from './TakeAProject';
import Projects from './Projects';
import { BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';

import Notes from './Notes';

const styles = {
    MenuBar: {
        minHeight: "400px",
        padding: "50px",
        width: "200px"
    }
}

export default class Main extends Component {
    render() {
        return <Router><Fragment>
                <Grid container spacing={24}>
                <Paper style={styles.MenuBar}>
                <Grid item xs={12} sm={3}>
                    <List component="nav">
                        <ListItem button>
                            <Link to={'/'} exact >Projects</Link>
                        </ListItem>
                        <ListItem button>
                            <Link to={'/notes'}  component={Notes}>Notes</Link>
                        </ListItem>
                    </List>
                </Grid>
                </Paper>
                <Grid item xs={12} sm={9}>
                    <Switch>
                        <Route exact path='/notes' render={(props) => <Notes  projects={this.props.projects} />}/>
                        <Route exact path='/' render={(props) => <div> <TakeAProject onNew={this.props.onNew}/>
                        <Projects projects={this.props.projects} onDelete={this.props.onDelete} createNote={this.props.createNote}/> </div> }/>

                    </Switch>
                </Grid>
                </Grid>
            </Fragment></Router>;
    }
}
