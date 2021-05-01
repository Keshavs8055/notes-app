import { Box, CircularProgress } from "@material-ui/core";
import React from "react";
import Navbar from "./components/Navbar/Navbar";
import NoteModal from "./components/NewNote/NewNoteModal/Modal";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { indigo } from "@material-ui/core/colors";
import { Home } from "./components/Home/Home";
import { auth, getNotes } from "./firebase";
import { connect } from "react-redux";
import { loginUser } from "./redux/user/user.actions";
import { Login } from "./components/Home/Login/Login";
import { updateUserNotes } from "./redux/userNotes/userNotes.action";

const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: {
      main: "#fff",
      contrastText: "#fff",
    },
  },
});
class App extends React.Component {
  state = {
    user: null,
    loading: true,
  };
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.props.userUpdate(loginUser(user));
        this.setState({ user: user });
        getNotes(user.uid).then((res) => {
          this.props.setNotes(updateUserNotes(res));
        });
      } else {
        this.props.userUpdate(loginUser(null));
        this.setState({ user: null });
      }
      this.setState({ loading: false });
    });
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        {this.state.loading ? (
          <Box textAlign="center" marginTop={10}>
            <CircularProgress color="primary" />
          </Box>
        ) : this.state.user ? (
          <>
            <Box position="relative" minHeight="100vh" className="App">
              <Navbar />
              <Home />
            </Box>
            <NoteModal />
          </>
        ) : (
          <Login />
        )}
      </ThemeProvider>
    );
  }
}
const mdtp = (dispatch) => {
  return {
    userUpdate: (value) => dispatch(value),
    setNotes: (data) => dispatch(data),
  };
};

export default connect(null, mdtp)(App);
