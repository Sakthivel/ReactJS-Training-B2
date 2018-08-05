import React, {Component, Fragment} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
        width: "20em"
    }
}

export default class Note extends  Component {
    render() {
        return <Fragment>
        <Card style={styles.card}>
        <CardContent>
          <Typography variant="title" color="textSecondary">
            {this.props.value.title}
          </Typography>
          <Typography color="textSecondary">
            {this.props.value.note}
          </Typography>
        </CardContent>
      </Card>
        </Fragment>;
    }
}
