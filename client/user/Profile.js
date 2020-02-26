import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Paper from "material-ui/Paper";
import List, {
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText
} from "material-ui/List";
import Avatar from "material-ui/Avatar";
import IconButton from "material-ui/IconButton";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import Person from "material-ui-icons/Person";
import Divider from "material-ui/Divider";
import DeleteUser from "./DeleteUser";
import { Link, Redirect } from "react-router-dom";

import authHelper from "../auth/auth-helper";
import { read } from "./api-user";
import EditProfile from "./EditProfile";

const styles = theme => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: "auto",
    padding: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 5
  }),
  title: {
    margin: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 2}px`,
    color: theme.palette.protectedTitle
  }
});

class Profile extends React.Component {
  constructor({ match }) {
    super();
    this.state = {
      user: "",
      redirectToSignin: false
    };
    this.match = match;
    console.log("match", match);
  }

  init(userId) {
    const jwt = authHelper.isAuthenticated();
    read(
      {
        userId: userId
      },
      { t: jwt.token }
    )
      .then(data => {
        console.log("data", data);
        if (data.error) {
          this.setState({
            redirectToSignin: true
          });
        } else
          this.setState({
            user: data
          });
      })
      .catch(e => {
        console.log("error", e);
      });
  }

  componentDidMount() {
    this.init(this.match.params.userId);
  }

  componentDidCatch(prevProps, prevState) {
    if (this.props !== prevProps) this.init(props.match.userId);
  }

  render() {
    const { classes, history } = this.props;
    const redirectToSignin = this.state.redirectToSignin;
    if (redirectToSignin) {
      return <Redirect to="/signin" />;
    }
    return (
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          Profile
        </Typography>
        <List dense>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <Person />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={this.state.user.name}
              secondary={this.state.user.email}
            />{" "}
            {authHelper.isAuthenticated().user &&
              authHelper.isAuthenticated().user._id == this.state.user._id && (
                <ListItemSecondaryAction
                  style={{
                    display: "flex",
                    flexDirection: "row"
                  }}
                >
                  <EditProfile userId={this.state.user._id} />
                  <DeleteUser userId={this.state.user._id} />
                </ListItemSecondaryAction>
              )}
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary={
                "Joined: " + new Date(this.state.user.created).toDateString()
              }
            />
          </ListItem>
        </List>
      </Paper>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);
