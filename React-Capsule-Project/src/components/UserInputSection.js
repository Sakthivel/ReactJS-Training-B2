import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const styles = {
    section : {
        margin: '4em auto',
        width: '100%',
        maxWidth: '1040px'
    }
}

class UserInputSection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
        }
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(this.state.username);
    }

    onChange(e) {
        this.setState({ username: e.target.value });
    }

    render() {
        return (
            <section style={styles.section}>
                <form onSubmit={this.onSubmit.bind(this)} >
                    <Typography variant="title" color="inherit">capsule-chat</Typography>
                    <TextField
                        id="name"
                        label="Enter the User name"
                        onChange={this.onChange.bind(this)}
                        margin="normal"
                        />
                        <Button onClick={this.onSubmit.bind(this)} variant="outlined" color="primary" >
                            Submit
                        </Button> 
                </form>
            </section>
        )
    }
}

export default UserInputSection;