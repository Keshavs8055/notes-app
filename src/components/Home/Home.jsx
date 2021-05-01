import { Container } from "@material-ui/core";
import React from "react";
import NotesList from "./Notes/notesList";

export const Home = () => {
  return (
    <div className="home">
      <Container maxWidth="lg">
        <NotesList />
      </Container>
    </div>
  );
};
