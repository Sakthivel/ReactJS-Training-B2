import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';


class Login extends Component {
    constructor(props) {
        super();

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
             <Grid container spacing={24}>
                <Grid item xs={4}>
                    <h1>Talking App</h1>
                </Grid>
                <Grid item xs={8}>
                        <form onSubmit={this.onSubmit.bind(this)} >
                            <Typography variant="title" color="inherit">Login</Typography>
                            <TextField
                                id="name"
                                label="Username"
                                onChange={this.onChange.bind(this)}
                                margin="normal"
                                />
                            <Button onClick={this.onSubmit.bind(this)} variant="outlined" color="primary" >
                                Submit
                            </Button>
                        </form>
                </Grid>
            </Grid>
        )
    }
}

export default Login;
