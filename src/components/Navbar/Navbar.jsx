import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { Box, Button, ButtonGroup, Icon } from "@material-ui/core";
import { connect } from "react-redux";
import { openModal } from "../../redux/modal/modal.action";
import { groupModal } from "../../redux/modal/groupModal.action";
import { auth } from "../../firebase";
import { updateUserNotes } from "../../redux/userNotes/userNotes.action";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    [theme.breakpoints.up("md")]: {
      flexDirection: "column",
    },
  },
  title: {
    display: "block",
    margin: 0 + `${theme.spacing(1)}`,
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  stitle: {
    margin: theme.spacing(1),
    [theme.breakpoints.up("md")]: {
      margin: 0,
    },
  },
  toolbar: {
    flexDirection: "column",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: 0,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "40ch",
    },
  },
  sectionDesktop: {
    display: "block",
    margin: theme.spacing(1),
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const Navbar = (props) => {
  const classes = useStyles();
  const handleChange = (e) => {
    const query = e.target.value;
    const notes = props.mainNotes;
    const filtered = notes.filter((note) => note.content.includes(query));
    props.setNotes(updateUserNotes(filtered));
  };
  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Box display="flex" className={classes.titleContainer}>
            <Typography className={classes.title} variant="h6" noWrap>
              Got Note?
            </Typography>
            <Typography className={classes.stitle} variant="subtitle2">
              By Keshav
            </Typography>
          </Box>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search: Only useful when you have a lot"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onChange={handleChange}
              inputProps={{ "aria-label": "search" }}
              fullWidth
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <ButtonGroup>
              <Button
                startIcon={<Icon>note_add</Icon>}
                onClick={props.openModal}
                color="inherit"
              >
                <Typography>New Note</Typography>
              </Button>

              <Button
                color="inherit"
                startIcon={<Icon>logout</Icon>}
                onClick={() => auth.signOut()}
              >
                Log-Out
              </Button>
            </ButtonGroup>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mdtp = (dispatch) => ({
  openModal: () => dispatch(openModal),
  openGroupModal: () => dispatch(groupModal),
  setNotes: (data) => dispatch(data),
});
const mstp = (state) => ({
  mainNotes: state.userNotes.mainUserNotes,
});
export default connect(mstp, mdtp)(Navbar);
