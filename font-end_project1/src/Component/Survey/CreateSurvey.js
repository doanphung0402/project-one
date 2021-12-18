import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  List,
  TextField,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React, { Fragment, useEffect } from "react";
import CreateSurveyStyle from "../styleComponent/CreateSurveyStyle";
import TitleIcon from "@material-ui/icons/Title";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import SubjectIcon from "@material-ui/icons/Subject";
import NoteIcon from "@material-ui/icons/Note";
import { useDispatch, useSelector } from "react-redux";
import OptionModal from "./ModalOption";
import ListItemOption from "./ListItemOption";
import Button from "@material-ui/core/Button";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import { useHistory } from "react-router-dom";
import { addSurveyInfo } from "../../features/survey/SurveyInfo";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useState } from "react";
import ScheduleSurvey from "./ScheduleSurveyOption";
const CreateSurvey = (props) => {
  const classes = props.classes;
  const history = useHistory();
  const dispath = useDispatch();
  const optionList = useSelector((state) => state.listOption.ListOption);
  const ListSurveySchedule = useSelector(state=>state.SurveySchedule.ListSurveySchedule); 

  const [checkedA,setCheckedA] = useState(false); 
  const handleChange = (event) =>{
     const status = event.target.checked ; 
     setCheckedA(status); 
  }
  const [OptionList,setOptionList] = useState([]); 
  console.log("🚀 ~ file: CreateSurvey.js ~ line 44 ~ CreateSurvey ~ OptionList", OptionList)

  useEffect(()=>{
    if(checkedA){
      setOptionList(ListSurveySchedule)
    }else{
       setOptionList(optionList); 
    }
  },[checkedA,optionList,ListSurveySchedule])

  const renderListItem = (OptionList) => {
    let xml ; 
      xml = OptionList.map((option, index) => {
        return <ListItemOption key={index} flag={checkedA} position={index} option={option} />;
      }); 
    return xml;
  };


  const validationSchema = yup.object().shape({
    title: yup.string("Tiêu đề").required("*Nhập tiêu đề khảo sát"),
    note: yup.string("Lưu ý"),
    decription: yup
      .string("Nhập mô tả khảo sát")
      .required("*Nhập mô tả khảo sát "),
  });
  const SurveyDefaultValue = useSelector(
    (state) => state.SurveyInfo.SurveyInfo
  );
  const goBack = () => {
    history.push("/survey/my-survey");
  };



  const renderModalOption =()=>{
     let xml; 
     if (checkedA){
        xml =(<ScheduleSurvey/>)
     }else{
        xml =(<OptionModal/>); 
     }
     return xml; 
  }
  return (
    <Fragment>
      <Grid container className={classes.gridContainer}>
        <Grid item xs={3}></Grid>
        <Grid item xs={6} className={classes.container}>
          <Typography variant="h3">Tạo khảo sát của bạn </Typography>
          <Box className={classes.box}>
            <Formik
              initialValues={{
                title: SurveyDefaultValue.title,
                decription: SurveyDefaultValue.decription,
                note: SurveyDefaultValue.note,
              }}
              onSubmit={(values) => {
                if (optionList.length === 0) {
                  toast.error("Nhập ít nhất 1 lựa chon để tiếp tục ! ");
                } else {
                  dispath(addSurveyInfo(values));
                  history.push("/survey/create-survey-send-to");
                }
              }}
              validationSchema={validationSchema}
              validateOnChange={true}
              validateOnBlur={false}
            >
              {(props) => (
                <Form className={classes.root} noValidate autoComplete="off">
                  <Box className={classes.BoxForm}>
                    <TitleIcon className={classes.IconForm} />
                    <TextField
                      className={classes.formfield}
                      id="standard-basic"
                      label="Title"
                      name="title"
                      defaultValue={SurveyDefaultValue.title}
                      required
                      error={props.touched.title && Boolean(props.errors.title)}
                      onChange={props.handleChange}
                      helperText={props.touched.title && props.errors.title}
                    />
                  </Box>
                  <Box className={classes.BoxForm}>
                    <SubjectIcon className={classes.IconForm} />
                    <TextField
                      className={classes.formfield}
                      id="standard-basic"
                      label="Decription"
                      name="decription"
                      defaultValue={SurveyDefaultValue.decription}
                      required
                      error={
                        props.touched.decription &&
                        Boolean(props.errors.decription)
                      }
                      onChange={props.handleChange}
                      helperText={
                        props.touched.decription && props.errors.decription
                      }
                    />
                  </Box>
                  <Box className={classes.BoxForm}>
                    <NoteIcon className={classes.IconForm} />
                    <TextField
                      className={classes.formfield}
                      id="standard-basic"
                      label="Note"
                      name="note"
                      defaultValue={SurveyDefaultValue.note}
                      error={props.touched.note && Boolean(props.errors.note)}
                      onChange={props.handleChange}
                      helperText={props.touched.note && props.errors.note}
                    />
                  </Box>
                  <Divider style={{ marginTop: "20px" }} primary="Spam" />
                  <Typography style={{ margin: "30px" }} variant="h3">
                    Lựa chọn khảo sát :{" "}
                  </Typography>


                  <FormControlLabel style={{marginLeft :""}}
                   control={<Checkbox checked={checkedA} onChange={handleChange} name="checkedA" />}
                   label="Khảo sát sự kiện"
                  />

                        


                  <Box>
                    <List>{renderListItem(OptionList)}</List>
                  </Box>
                  <Box style={{ margin: "40px" }}>
                    {renderModalOption}
                  </Box>

                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "50px",
                    }}
                  >
                    <Button
                      onClick={goBack}
                      variant="contained"
                      color="primary"
                      style={{ margin: "30px" }}
                      startIcon={<ArrowBackIosIcon />}
                    >
                      Quay lai
                    </Button>
                    <Button
                      style={{ margin: "30px" }}
                      variant="contained"
                      color="secondary"
                      endIcon={<DoubleArrowIcon />}
                      type="submit"
                    >
                      Tiếp tục
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={12} className={classes.buttonContinue}></Grid>
      </Grid>
    </Fragment>
  );
};

export default withStyles(CreateSurveyStyle)(CreateSurvey);
