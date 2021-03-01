import React from "react";
import Head from "next/head";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Link from "next/link";
import Router from "next/router";
import * as classes from "../lib/styles/styles";
import LoadingBar from "../components/LoadingBar";
import auth from "../lib/api/authApi";
import { notify } from "../components/Notifier";
import withAuth from "../lib/withAuth";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signUpInProgress: false,
      shouldRedirect: false,
      user: {
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        email: "",
      },
      error: {},
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.isValid = this.isValid.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOnChange = (e) => {
    const { name } = e.target;
    console.log("name", name);
    const user = { ...this.state.user };
    user[name] = e.target.value;
    this.setState({ user, error: {} });
  };

  isValid = () => {
    if (!this.state.user.username) {
      this.setState({ error: { username: "Username is Required." } });
      return false;
    }
    if (!this.state.user.email) {
      this.setState({ error: { email: "Email is Required." } });
      return false;
    }
    if (!this.state.user.password) {
      this.setState({ error: { password: "Password is Required." } });
      return false;
    }
    if (!(this.state.user.password.length >= 8)) {
      this.setState({
        error: { password: "Invalid Password. Please try again!" },
      });
      return false;
    }
    if (!this.state.user.email.trim().match(/.+@.+\..+/)) {
      this.setState({ error: { email: "Invalid Email. Please try agains!" } });
      return false;
    }
    this.setState({ error: {} });
    return true;
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if (this.isValid()) {
      try {
        this.setState({ signUpInProgress: true });
        const resp = await auth.signup(this.state.user);
        if (resp.success) {
          this.setState({
            signUpInProgress: false,
            shouldRedirect: true,
          });
        } else {
          this.setState({ signUpInProgress: false });
          notify({ message: resp.message });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  render() {
    if (this.state.shouldRedirect) Router.push(`/login`);
    return (
      <div>
        <Head>
          <title> Sign Up</title>
          <meta name="description" content="This is the Sign Up page" />
        </Head>
        <Grid container spacing={3} justify="center" style={classes.container}>
          <Grid item sx={10} sm={8} md={4}>
            <Card variant="outlined" style={classes.card}>
              <CardContent>
                <Typography
                  color="secondary"
                  align="center"
                  variant="h5"
                  component="h2"
                >
                  Sign Up
                </Typography>
                <br />
                {this.state.signUpInProgress ? <LoadingBar /> : <span />}
                <br />
                <br />
                <Button
                  variant="contained"
                  style={{
                    ...classes.oAuthLoginBtn,
                    backgroundColor: "#f50057",
                    color: "#fff",
                  }}
                  href="http://localhost:3000/auth/google"
                >
                  Login with Google
                </Button>
                <br />
                <br />
                <Typography align="center" variant="h6">
                  OR
                </Typography>
                <Typography align="center" variant="h6">
                  Register a New Account
                </Typography>
                <TextField
                  name="firstName"
                  value={this.state.user.firstName}
                  onChange={this.handleOnChange}
                  label="First Name"
                  margin="normal"
                  style={classes.textField}
                />
                <TextField
                  name="lastName"
                  value={this.state.user.lastName}
                  onChange={this.handleOnChange}
                  label="Last Name"
                  margin="normal"
                  style={classes.textField}
                />
                <TextField
                  name="username"
                  value={this.state.user.username}
                  onChange={this.handleOnChange}
                  label="User Name"
                  margin="normal"
                  style={classes.textField}
                  helperText={
                    this.state.error.username
                      ? this.state.error.username
                      : "Username is Required"
                  }
                  error={!!this.state.error.username}
                />
                <TextField
                  name="password"
                  value={this.state.user.password}
                  onChange={this.handleOnChange}
                  label="Password"
                  margin="normal"
                  style={classes.textField}
                  helperText={
                    this.state.error.password
                      ? this.state.error.password
                      : `Password is Required. Password should be at 
                      least ́8 characters.`
                  }
                  error={!!this.state.error.password}
                />
                <TextField
                  name="email"
                  value={this.state.user.email}
                  onChange={this.handleOnChange}
                  label="Email"
                  margin="normal"
                  style={classes.textField}
                  helperText={
                    this.state.error.email
                      ? this.state.error.email
                      : "Email is Required. Email should be like abc@example.com"
                  }
                  error={!!this.state.error.email}
                />
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  style={{ margin: "0 auto" }}
                  onClick={this.handleSubmit}
                >
                  Submit
                </Button>
              </CardActions>
              <p>Already An User? <Link href="/login"><a>Log In</a></Link></p>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withAuth(SignUp, { loginRequired: false, logoutRequired: true });
