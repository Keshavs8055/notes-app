import { Box, Fab } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import React from "react";
import { connect } from "react-redux";
import { openModal } from "../../../redux/modal/modal.action";

const Button = (props) => {
  return (
    <Box position="fixed" bottom={4} right={4}>
      <Fab color="primary" size="large" onClick={props.openModal}>
        <Add color="secondary" />
      </Fab>
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    openModal: () => dispatch(openModal),
  };
};

export default connect(null, mapDispatchToProps)(Button);
