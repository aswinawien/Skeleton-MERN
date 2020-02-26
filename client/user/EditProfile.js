import React, { Component } from "react";
import Card, { CardActions, CardContent } from "material-ui/Card";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "material-ui/Dialog";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";
import Typography from "material-ui/Typography";
import Icon from "material-ui/Icon";
import IconButton from "material-ui/IconButton";
import Avatar from "material-ui/Avatar";
import FileUpload from "material-ui-icons/FileUpload";
import Edit from "material-ui-icons/Edit";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import auth from "./../auth/auth-helper";
import { read, update } from "./api-user.js";
import { Redirect } from "react-router-dom";

const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit * 2
  },
  title: {
    margin: theme.spacing.unit * 2,
    color: theme.palette.protectedTitle
  },
  error: {
    verticalAlign: "middle"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300
  },
  submit: {
    margin: "auto",
    marginBottom: theme.spacing.unit * 2
  },
  input: {
    display: "none"
  },
  filename: {
    marginLeft: "10px"
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: "auto"
  }
});

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      redirectToProfile: false,
      error: "",
      open: false
    };
  }

  componentDidMount = () => {
    this.userData = new FormData();
    const jwt = auth.isAuthenticated();
    read(
      {
        userId: this.props.userId
      },
      { t: jwt.token }
    ).then(data => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        this.setState({ name: data.name, email: data.email });
      }
    });
  };
  clickSubmit = () => {
    const jwt = auth.isAuthenticated();
    const user = {
      name: this.state.name || undefined,
      email: this.state.email || undefined,
      password: this.state.password || undefined
    };
    update(
      {
        userId: this.props.userId
      },
      {
        t: jwt.token
      },
      user
    ).then(data => {
      console.log(data);
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        this.setState({ userId: data._id, redirectToProfile: true });
      }
    });
  };
  handleChange = name => event => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    this.userData.set(name, value);
    this.setState({ [name]: value });
  };
  handleRequestClose = () => {
    this.setState({ open: false });
  };
  clickButton = () => {
    this.setState({ open: true });
  };
  render() {
    const { classes } = this.props;
    if (this.state.redirectToProfile) {
      return <Redirect to={"/"} />;
    }
    return (
      <div>
        <IconButton
          aria-label="Edit"
          color="primary"
          onClick={this.clickButton}
        >
          <Edit />
        </IconButton>
        <Dialog open={this.state.open} onClose={this.handleRequestClose}>
          <Card className={classes.card}>
            <DialogContent>
              <DialogTitle
                type="headline"
                component="h2"
                className={classes.title}
              >
                Edit Profile
              </DialogTitle>
              <input
                accept="image/*"
                type="file"
                onChange={this.handleChange("photo")}
                style={{ display: "none" }}
                id="icon-button-file"
              />
              <label htmlFor="icon-button-file">
                <Button variant="raised" color="default" component="span">
                  Upload <FileUpload />
                </Button>
              </label>
              <span className={classes.filename}>
                {this.state.photo ? this.state.photo.name : ""}
              </span>
              <br />
              <TextField
                id="name"
                label="Name"
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange("name")}
                margin="normal"
              />
              <br />
              <TextField
                id="multiline-flexible"
                label="About"
                multiline
                rows="2"
                className={classes.textField}
                value={this.state.about}
                onChange={this.handleChange("about")}
              />
              <br />
              <TextField
                id="email"
                type="email"
                label="Email"
                className={classes.textField}
                value={this.state.email}
                onChange={this.handleChange("email")}
                margin="normal"
              />
              <br />
              <TextField
                id="password"
                type="password"
                label="Password"
                className={classes.textField}
                value={this.state.password}
                onChange={this.handleChange("password")}
                margin="normal"
              />
              <br />{" "}
              {this.state.error && (
                <Typography component="p" color="error">
                  <Icon color="error" className={classes.error}>
                    error
                  </Icon>
                  {this.state.error}
                </Typography>
              )}
            </DialogContent>
            <DialogActions>
              <Button
                color="primary"
                variant="raised"
                onClick={this.clickSubmit}
                className={classes.submit}
              >
                Submit
              </Button>
            </DialogActions>
          </Card>
        </Dialog>
      </div>
    );
  }
}

EditProfile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EditProfile);
