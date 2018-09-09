import React, { Component, Fragment } from 'react'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
    layout: {
        width: 'auto',
        display: 'block', // Fix IE11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

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
            <Fragment>
            <CssBaseline />
            <main className={this.props.classes.layout}>
                <Paper className={this.props.classes.paper}>
                    
                    <h1>Talking App</h1>
                    <form id="signin" onSubmit={this.onSubmit.bind(this)} >
                        <Typography variant="title" color="inherit">Login</Typography>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="name">Username</InputLabel>
                            <Input id="name" name="name" autoComplete="name" autoFocus onChange={this.onChange.bind(this)} />
                        </FormControl>
                        <Button 
                            onClick={this.onSubmit.bind(this)} 
                            fullWidth
                            variant = "raised"
                            color = "primary"
                            >
                            Submit
                        </Button>
                    </form>
                </Paper>
            </main>
            </Fragment>
        )
    }
}

export default withStyles(styles)(Login);
