import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Fade from "@material-ui/core/Fade";

let openNotifier;

export class Notifier extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      message: "",
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    openNotifier = this.handleOpen;
  }

  handleOpen = ({ message }) => {
    this.setState({ open: true, message });
  };

  handleClose = () => {
    this.setState({
      message: "",
      open: false,
    });
  };

  render() {
    return (
      <div>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={this.state.open}
          onClick={this.handleClose}
          TransitionComponent={Fade}
          autoHideDuration={5000}
          message={this.state.message}
          key={Fade.name}
        />
      </div>
    );
  }
}

export function notify({ message }) {
  openNotifier({ message });
}
