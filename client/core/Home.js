import React from "react";
import { withStyles } from "material-ui/styles";
import Card, { CardContent, CardMedia } from "material-ui/Card";
import Typography from "material-ui/Typography";
import Proptypes from "prop-types";

import Mern from "./../assets/images/mern.png";

const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    marginTop: theme.spacing.unit * 5
  },
  title: {
    padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2.5}px 
    ${theme.spacing.unit * 2}px`,
    textAlign: "center",
    color: theme.palette.secondary,
    fontSize: "20px"
  },
  media: {
    minHeight: 330
  }
});

class Home extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Card className={classes.card}>
          <Typography type="headline" component="h2" className={classes.title}>
            MERN Skeleton
          </Typography>
          <CardMedia className={classes.media} image={Mern} />
          <CardContent>
            <Typography type="body1" component="p">
              Welcome to the Mern Skeleton
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}

Home.prototypes = {
  classes: Proptypes.object.isRequired
};

export default withStyles(styles)(Home);
