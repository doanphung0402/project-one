import {
  Box,
  Divider,
  Grid,
  List,
  TextField,
  Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React, { useEffect } from "react";
import CreateSurveyStyle from "./styleComponent/CreateSurveyStyle";
import TitleIcon from "@material-ui/icons/Title";
import SubjectIcon from "@material-ui/icons/Subject";
import NoteIcon from "@material-ui/icons/Note";
import { useSelector } from "react-redux";
import OptionModal from "./ModalOption";
import ListItemOption from "./ListItemOption";
const CreateSurvey = (props) => {
  const classes = props.classes;
  const optionList = useSelector((state) => state.listOption.ListOption);
  const renderListItem = (listOption) => {
    const xml = listOption.map((option, index) => {
      return (
        <ListItemOption key={index} position={index} option={option} />
      );
    });
    return xml 
  };
  useEffect(() => {
    console.log(optionList);
  });
  return (
    <Grid container className={classes.gridContainer}>
     <Grid item xs={3}></Grid>
      <Grid item xs={6} className={classes.container}>
        <Typography variant="h3">Tạo khảo sát của bạn </Typography>
        <Box className={classes.box}>
          <form className={classes.root} noValidate autoComplete="off">
            <Box className={classes.BoxForm}>
              <TitleIcon className={classes.IconForm} />
              <TextField
                className={classes.formfield}
                id="standard-basic"
                label="Title"
              />
            </Box>
            <Box className={classes.BoxForm}>
              <SubjectIcon className={classes.IconForm} />
              <TextField
                className={classes.formfield}
                id="standard-basic"
                label="Decription"
              />
            </Box>
            <Box className={classes.BoxForm}>
              <NoteIcon className={classes.IconForm} />
              <TextField
                className={classes.formfield}
                id="standard-basic"
                label="Note"
              />
            </Box>
            <Divider style={{ marginTop: "20px" }} primary="Spam" />
            <Typography style={{ margin: "30px" }} variant="h3">
              Lựa chọn khảo sát :{" "}
            </Typography>
            <Box>
              <List>

                {renderListItem(optionList)}

              </List>
            </Box>
          </form>
          <Box style={{ marginTop: "40px" }}>
            <OptionModal />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={3}></Grid>
    </Grid>
  );
};

export default withStyles(CreateSurveyStyle)(CreateSurvey);
