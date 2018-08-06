import React, {Component, Fragment} from 'react';
import Grid from '@material-ui/core/Grid';
import TakeAProject from './TakeAProject';
import Projects from './Projects';
import MenuBar from './MenuBar';

export default class Main extends Component {
    render() {
        return <Fragment>
                <Grid container spacing={24}>
                <Grid item xs={12} sm={3}>
                    < MenuBar / >
                </Grid>
                <Grid item xs={12} sm={8}>
                    <TakeAProject onNew={this.props.onNew}/>
                    <Projects projects={this.props.projects} onDelete={this.props.onDelete} createNote={this.props.createNote}/>
                </Grid>
                </Grid>
            </Fragment>;
    }
}