import { Box, Grid, Typography } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import NoteCard from "./noteCard";

const NotesList = (props) => {
  const { notes } = props;

  return (
    <div className="list" style={{ marginTop: "2%" }}>
      <Grid container justify="flex-start" alignItems="stretch" spacing={3}>
        {notes.length > 0 ? (
          notes.map((note, i) => {
            return (
              <NoteCard
                key={i}
                content={note.content}
                group={note.group}
                created_on={note.created_on}
                note_id={note.note_id}
              />
            );
          })
        ) : (
          <Box marginTop={5} width="100%">
            <Typography align="center">
              click the new note button. i dare Ya
            </Typography>
          </Box>
        )}
      </Grid>
    </div>
  );
};

const mstp = (state) => ({
  notes: state.userNotes.userNotes,
});

export default connect(mstp)(NotesList);
