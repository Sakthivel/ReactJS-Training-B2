import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Note from './Note';

const styles = {
    gridContainer: {
        marginTop: '2em'
    }
}

export default class Notes extends  Component {
    
    render() {
        return <Grid container spacing={24} style={styles.gridContainer}>
        {this.props.projects.map(proj => <Grid key={proj.id} item sm={4}>
        <Note value={proj}/>
        </Grid>
        )}
        </Grid>;
    }
}
