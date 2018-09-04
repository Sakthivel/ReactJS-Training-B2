import React, {Component, Fragment} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

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

export default class Note extends  Component {


    render() {
        return <Fragment>
        <Card style={styles.card}>
        <CardContent>
          <Typography variant="title" color="textSecondary">
            List of {this.props.value.name} Notes:
          </Typography>
          <Typography color="textSecondary">

            {this.props.value.note.map((note) => <p>{note}</p>)}
          </Typography>
        </CardContent>
      </Card>
    </Fragment>;
    }
}
