import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Project from './Project';
import PropTypes from 'prop-types';

const styles = {
    gridContainer: {
        marginTop: '2em'
    }
}

export default class Projects extends  Component {
    static get propTypes() {
        return {
            projects: PropTypes.array.isRequired
        }
    }
    render() {
        return <Grid container spacing={24} style={styles.gridContainer}>
        {this.props.projects.map(proj => <Grid key={proj.id} item sm={4}>
        <Project value={proj} deleteProject={this.props.onDelete} createANote={this.props.createNote}/>
        </Grid>
        )}
        </Grid>;
    }
}
