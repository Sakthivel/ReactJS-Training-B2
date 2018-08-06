import React, {Component, Fragment} from 'react';
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

export default class TakeAProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            name: '',
            desc: ''
        }
    }
static get propTypes() {
    return {
        onNew: PropTypes.func.isRequired
    }
}

    handleDescChange(event) {
        this.setState({desc: event.target.value});
    }
    handleTitleChange(event) {
        this.setState({name: event.target.value});
    }
    handleExpand() {
        this.setState({expanded: true});
    }
    handleCreateProject() {
        this.props.onNew(this.state.name, this.state.desc, this.makeid());
        this.handleCloseProject();
    }

    makeid() {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
    handleCloseProject() {
        this.setState({expanded: false, name: '', desc:''});
    }
    render() {
        return <Paper style={styles.paper}>
        {this.state.expanded ? <Fragment>
        <TextField
          label="Project Name"
          value={this.state.name}
          onChange={this.handleTitleChange.bind(this)}
          fullWidth={true}
          /> 
        <TextField
          label="Project Description"
          value={this.state.desc}
          onChange={this.handleDescChange.bind(this)}
          fullWidth={true}
          />
           <Button onClick={this.handleCreateProject.bind(this)} style={styles.saveButton} color="primary">Save</Button> 
                            <Button onClick={this.handleCloseProject.bind(this)} style={styles.saveButton} color="secondary">Close</Button> 
          </Fragment> : <Button onClick={this.handleExpand.bind(this)} style={styles.saveButton} color="primary">Add New Project</Button>  }

          

          </Paper>;
    }
}
