import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const styles = {
    paper: {
        padding: '1em'
    },
    saveButton: {
        padding: '1em'
    }
}

export default class TakeANote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            note: '',
            title: ''
        }
    }
static get propTypes() {
    return {
        onNew: PropTypes.func.isRequired
    }
}

    handleNoteChange(event) {
        this.setState({note: event.target.value});
    }
    handleTitleChange(event) {
        this.setState({title: event.target.value});
    }
    handleExpand() {
        this.setState({expanded: true});
    }
    handleCreateNote() {
        this.props.onNew(this.state.title, this.state.note)
    }
    render() {
        return <Paper style={styles.paper}>
        {this.state.expanded ?
        <TextField
          label="Title"
          value={this.state.title}
          onChange={this.handleTitleChange.bind(this)}
          fullWidth={true}
          /> : null }
        <TextField
          label="Take A Note"
          value={this.state.note}
          onChange={this.handleNoteChange.bind(this)}
          onClick={this.handleExpand.bind(this)}
          fullWidth={true}
          />
          {this.state.expanded ? <Button onClick={this.handleCreateNote.bind(this)} style={styles.saveButton} color="primary">Save</Button> : null}
          </Paper>;
    }
}
