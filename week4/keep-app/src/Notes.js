import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Note from './Note';
import PropTypes from 'prop-types';

const styles = {
    gridContainer: {
        marginTop: '2em'
    }
}

export default class Notes extends  Component {
    static get propTypes() {
        return {
            notes: PropTypes.array.isRequired
        }
    }
    render() {
        return <Grid container spacing={24} style={styles.gridContainer}>
        {this.props.notes.map(note => <Grid key={note.title} item sm={4}>
        <Note value={note}/>
        </Grid>
        )}
        </Grid>;
    }
}
