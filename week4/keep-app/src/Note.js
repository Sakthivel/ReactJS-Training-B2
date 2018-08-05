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
          <Typography color="textSecondary">
            {this.props.value}
          </Typography>
        </CardContent>
      </Card>
        </Fragment>;
    }
}
