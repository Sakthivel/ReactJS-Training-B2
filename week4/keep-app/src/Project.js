import React, {Component, Fragment} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import Icon from '@material-ui/core/Icon';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = {
    card: {
        width: "20em"
    },
    model: {
        top: "20%",
        padding: "0 30%"
    },
    modelContent: {
        padding: "25px"
    },
    saveButton: {
        padding: '1em'
    }
}

export default class Project extends  Component {
    constructor() {
        super();
        this.state = {
            open: false,
            note: ''
        }
    }
    deleteCurrentProject(i, event) {
        event.preventDefault();
        this.props.deleteProject(this.props.value.id);
    }
    addNewNote(event) {
        event.preventDefault();
        this.handleOpen();
    }
    handleOpen() {
        this.setState({ open: true });
    };

    handleClose() {
        this.setState({ open: false });
    };

    addNote() {
        this.props.createANote(this.props.value.id, this.state.note);
        this.handleClose();
    }
    handleNoteChange(event) {
        this.setState({note: event.target.value});
    }

    render() {
        return <Fragment>
        <Card style={styles.card}>
        <CardContent>
          <Typography variant="title" color="textSecondary">
            {this.props.value.name}
          </Typography>
          <Typography color="textSecondary">
            {this.props.value.desc}
          </Typography>
        </CardContent>
        <Icon color="primary" onClick={this.addNewNote.bind(this)}>
        add_circle
        </Icon>
        <DeleteIcon onClick={this.deleteCurrentProject.bind(this, this.props.value.id)}/>
        <i className = "material-icons">view_list </i>

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose.bind(this)} style={styles.model}
        >
          <Paper>
              <div style={styles.modelContent}>
                <Typography variant="title" id="modal-title">
                    Add Note
                </Typography>
                
                <TextField
                    label="Note"
                    value={this.state.note}
                    fullWidth={true}
                    onChange={this.handleNoteChange.bind(this)}
                    /> 
                    <Button onClick={this.addNote.bind(this)} style={styles.saveButton} color="primary">Add Note</Button>
            </div>
          </Paper>
        </Modal>
      </Card>
        </Fragment>;
    }
}
