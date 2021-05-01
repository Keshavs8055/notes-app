import {
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  TextareaAutosize,
  Typography,
  withStyles,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React from "react";
import { connect } from "react-redux";
import { firestore, getNotes } from "../../../firebase";
import { openModal } from "../../../redux/modal/modal.action";
import { updateValue } from "../../../redux/noteValue/value.action";
import { updateUserNotes } from "../../../redux/userNotes/userNotes.action";

class NoteModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: {
        exist: false,
        message: null,
      },
      note: props.noteValue,
      loading: false,
    };
  }
  handleComponentState = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleChange = (e) => {
    this.props.handleNoteValue(updateValue(e.target.value));
  };
  handleNoteClear = () => {
    this.props.handleNoteValue(updateValue(""));
  };
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.note.length < 1) {
      console.log("IN IF STTS");
      this.setState({
        error: {
          exist: true,
          message: "type something and then submit.",
        },
      });
      return;
    }

    this.setState({ loading: true });
    const doc_id = new Date().valueOf();
    firestore
      .collection("users")
      .doc(this.props.user.uid)
      .collection("notes")
      .doc(`${doc_id}`)
      .set({
        created_on: new Date().toDateString(),
        content: this.state.note,
        note_id: doc_id,
      })
      .then(() => {
        getNotes(this.props.user.uid).then((res) => {
          this.props.setNotes(updateUserNotes(res));
          this.props.closeModal();
          this.setState({ loading: false });
        });
      });
  };
  render() {
    const { classes } = this.props;
    return (
      <Dialog
        maxWidth="md"
        fullWidth
        // onBackdropClick={this.props.closeModal}
        open={this.props.modelOpen}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <DialogTitle id="max-width-dialog-title">
            Create A New Note
          </DialogTitle>
          <DialogActions>
            <Button
              onClick={this.props.closeModal}
              disabled={this.state.loading}
              color="primary"
            >
              Close
            </Button>
          </DialogActions>
        </Box>
        <DialogContent>
          <form autoComplete="off">
            <FormControl fullWidth required>
              <TextareaAutosize
                rowsMin={5}
                autoComplete="off"
                autoFocus
                placeholder="If you click buttons on your keyboards, they're magically gonna appear here"
                name="note"
                value={this.props.noteValue}
                className={classes.textarea}
                onChange={(e) => {
                  this.handleChange(e);
                  this.handleComponentState(e);
                }}
              />
            </FormControl>
            {this.state.error.exist ? (
              <Box width="100%">
                <Typography variant="subtitle2" color="error">
                  {this.state.error.message}
                </Typography>
              </Box>
            ) : null}
            <ButtonGroup
              color="primary"
              aria-label="outlined primary button group"
              className={classes.buttons}
            >
              <Button
                disabled={this.state.loading}
                type="submit"
                onClick={this.handleSubmit}
              >
                Create
              </Button>
              <Button
                onClick={this.handleNoteClear}
                className={classes.button}
                startIcon={<Delete />}
                disabled={this.state.loading}
              >
                Clear Input
              </Button>
            </ButtonGroup>
          </form>
        </DialogContent>
      </Dialog>
    );
  }
}
const mstp = (state) => ({
  modelOpen: state.ModalReducer.modalOpen,
  noteValue: state.NoteValue.noteValue,
  user: state.UserReducer.user,
});
const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(openModal),
    handleNoteValue: (value) => dispatch(value),
    setNotes: (data) => dispatch(data),
  };
};
const styles = (theme) => ({
  textarea: {
    resize: "vertical",
    outline: "none",
    maxHeight: "30vh",
    borderColor: theme.palette.primary.main,
    overflow: "scroll",
    overflowY: "scroll",
    overflowX: "hidden",
    borderRadius: 5,
    padding: theme.spacing(1),
    "&::-webkit-scrollbar": {
      width: "0.3vw",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "purple",
    },
    ...theme.typography.body1,
  },
  buttons: {
    marginTop: theme.spacing(2),
  },
  groupSelect: {
    minWidth: "60%",
    marginBottom: theme.spacing(2),
  },
});

export default connect(mstp, mapDispatchToProps)(withStyles(styles)(NoteModal));
