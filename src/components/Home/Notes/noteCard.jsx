import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {
  Box,
  CircularProgress,
  Fab,
  Grid,
  Icon,
  Paper,
} from "@material-ui/core";
import { connect } from "react-redux";
import { openModal } from "../../../redux/modal/modal.action";
import { firestore, getNotes } from "../../../firebase";
import { updateUserNotes } from "../../../redux/userNotes/userNotes.action";

const NoteCard = (props) => {
  const [loading, toggleLoading] = React.useState(false);
  const handleClick = () => {
    toggleLoading(true);
    const ask = confirm(
      "Nothing Can be done after deleting this note, Cause i was too lazy to create a recycle bin"
    );
    if (ask) {
      console.log(ask);
      firestore
        .collection("users")
        .doc(props.user.uid)
        .collection("notes")
        .doc(`${props.note_id}`)
        .delete()
        .then(() => {
          getNotes(props.user.uid)
            .then((res) => {
              props.setNotes(updateUserNotes(res));
            })
            .then(toggleLoading(false));
        });
    } else {
      toggleLoading(false);
      return;
    }
  };
  return (
    <Grid item xs={12} md={props.content.length < 100 ? 4 : 8}>
      <Paper elevation={9}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="body2" component="p">
              {props.content}
            </Typography>
            {props.group ? (
              <Box display="flex" justifyContent="space-between">
                <Typography variant="caption">Group: {props.group}</Typography>
              </Box>
            ) : null}
          </CardContent>
          <CardActions>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="baseline"
              width="100%"
            >
              <Typography variant="caption" color="primary">
                {props.created_on}
              </Typography>
              <Fab
                variant="round"
                style={{
                  background: "transparent",
                }}
                color="secondary"
                disabled={loading}
                onClick={handleClick}
              >
                {loading ? (
                  <CircularProgress size={20} />
                ) : (
                  <Icon color="error">delete</Icon>
                )}
              </Fab>
            </Box>
          </CardActions>
        </Card>
      </Paper>
    </Grid>
  );
};
const mdtp = (dispatch) => ({
  openModal: () => dispatch(openModal),
  setNotes: (data) => dispatch(data),
});
const mstp = (state) => ({
  user: state.UserReducer.user,
});
export default connect(mstp, mdtp)(NoteCard);
