import React from "react";
import Head from "next/head";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Router from "next/router";
import * as classes from "../lib/styles/styles";
import LoadingBar from "../components/LoadingBar";
import auth from "../lib/api/authApi";
import { notify } from "../components/Notifier";
import ResetPassword from "../components/ResetPassword";
import baseUrl from "../lib/baseUrl";
import withAuth from "../lib/withAuth";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginInProgress: false,
      shouldRedirect: false,
      user: {
        username: "",
        password: "",
      },
      openResetPassword: false,
      error: {},
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.isValid = this.isValid.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleResetPassword = this.toggleResetPassword.bind(this);
  }

  handleOnChange = (e) => {
    const { name } = e.target;
    const user = { ...this.state.user }; // eslint-diable-line
    user[name] = e.target.value;
    this.setState({ user, error: {} });
  };

  isValid = () => {
    const { username, password } = this.state.user;
    if (!username) {
      this.setState({ error: { username: "Username is Required." } });
      return false;
    }
    if (!password) {
      this.setState({ error: { password: "Password is Required." } });
      return false;
    }
    if (!(password.length >= 8)) {
      this.setState({
        error: { password: "Invalid Password. Please try again!" },
      });
      return false;
    }
    this.setState({ error: {} });
    return true;
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if (this.isValid()) {
      try {
        this.setState({ loginInProgress: true });
        const resp = await auth.login(this.state.user);
        if(resp.success){
          document.cookie = resp.cookie;
          if(document.cookie) {
            const token = document.cookie.split("=")[1];
            auth.authenticate(token, () => {
              this.setState({
                shouldRedirect: true
              })
            })
          }
        }
        this.setState({ loginInProgress: false});
        notify({message: resp.message});
      } catch (err) {
        console.log(err);
      }
    }
  };

  toggleResetPassword = () => {
    this.setState({ openResetPassword: !this.state.openResetPassword });
  };

  render() {
    if(this.state.shouldRedirect) Router.push("/");
    return (
      <div>
        <Head>
          <title> Log In</title>
          <meta name="description" content="This is the Log In page" />
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
                  Log In
                </Typography>
                <br />
                {this.state.loginInProgress ? <LoadingBar /> : <span />}
                <br />
                <br />
                <Button
                  variant="contained"
                  style={{
                    ...classes.oAuthLoginBtn,
                    backgroundColor: "#f50057",
                    color: "#fff",
                  }}
                  href={`${baseUrl}/auth/google`}
                >
                  Login with Google
                </Button>
                <br />
                <br />
                <Typography align="center" variant="h6">
                  OR
                </Typography>
                <Typography align="center" variant="h6">
                  Log In with your Account
                </Typography>
                <TextField
                  name="username"
                  value={this.state.user.username}
                  onChange={this.handleOnChange}
                  label="User Name"
                  margin="normal"
                  style={classes.textField}
                  helperText={this.state.error.username || ""}
                  error={!!this.state.error.username}
                />
                <TextField
                  name="password"
                  value={this.state.user.password}
                  onChange={this.handleOnChange}
                  label="Password"
                  margin="normal"
                  style={classes.textField}
                  helperText={this.state.error.password || ""}
                  error={!!this.state.error.password}
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
              <p>
                Forgot Password? Click
                <Button onClick={this.toggleResetPassword}>here</Button>
              </p>
            </Card>
          </Grid>
        </Grid>
        <ResetPassword
          open={this.state.openResetPassword}
          handleClose={this.toggleResetPassword}
        />
      </div>
    );
  }
}

export default withAuth(Login, {loginRequired: false, logoutRequired: true});
