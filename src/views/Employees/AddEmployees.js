import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Radio from "@material-ui/core/Radio";
import Checkbox from "@material-ui/core/Checkbox";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/Select";
import CircularProgress from "@material-ui/core/CircularProgress";

// @material-ui/icons
import MailOutline from "@material-ui/icons/MailOutline";
import Check from "@material-ui/icons/Check";
import Clear from "@material-ui/icons/Clear";
import Contacts from "@material-ui/icons/Contacts";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import AddIcon from "@material-ui/icons/Add";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardText from "components/Card/CardText.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";

import axios from "axios";

import styles from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";

const useStyles = makeStyles(styles);

function sendRequestWorker(data, func) {
  func(true);

  axios.post("http://192.168.1.111:5000/addworker/", data).then(res => {
    console.log(res);
    func(false);
  });
}

function getEmployeLevel() {
  return "Supervisor";
}

function renderEmployeeType() {
  if (getEmployeLevel() == "Supervisor") {
    const Items = ["Worker"];
    return Items.map((item, idx) => {
      return (
        <MenuItem key={idx} value={0}>
          {item}
        </MenuItem>
      );
    });
  } else if (getEmployeLevel() == "Boss") {
    const Items = ["Worker", "Supervisor"];
    return Items.map((item, idx) => {
      return <MenuItem key={idx}>{item}</MenuItem>;
    });
  } else if (getEmployeLevel() == "Admin") {
    const Items = ["Worker", "Supervisor", "Boss", "Admin"];
    return Items.map((item, idx) => {
      return <MenuItem key={idx}>{item}</MenuItem>;
    });
  }
}

export default function RegularForms() {
  const [checked, setChecked] = React.useState([24, 22]);
  const [selectedEnabled, setSelectedEnabled] = React.useState("b");
  const [selectedValue, setSelectedValue] = React.useState(null);

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [ssn, setSSN] = React.useState("");
  const [employeeType, setEmployeeType] = React.useState(-1);
  const [loadingSubmit, setLoadingSubmit] = React.useState(false);

  const handleChange = event => {
    setSelectedValue(event.target.value);
  };
  const handleChangeEnabled = event => {
    setSelectedEnabled(event.target.value);
  };
  const handleToggle = value => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const renderSubmit = () => {
    if (loadingSubmit) {
      return <CircularProgress color="warning" style={{ marginTop: "6vh" }} />;
    } else {
      return (
        <Button
          color="warning"
          style={{ marginTop: "6vh" }}
          onClick={() =>
            sendRequestWorker(
              {
                first_name: firstName,
                last_name: lastName,
                ssn: ssn
              },
              setLoadingSubmit
            )
          }
        >
          Submit
        </Button>
      );
    }
  };
  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary" icon>
            <CardIcon color="warning">
              <AddIcon />
            </CardIcon>
            <h3 className={classes.cardIconTitle}>Add Employeess</h3>
            <h5 style={{ marginLeft: "5vw", marginTop: "1vh", color: "grey" }}>
              Here you can view and add new Employeess to be able to use the
              app.{" "}
            </h5>
          </CardHeader>
          <CardBody>
            <form>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    First Name
                  </FormLabel>
                </GridItem>

                <GridItem xs={12} sm={10}>
                  <CustomInput
                    id="help-text"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text"
                    }}
                    helpText="A block of help text that breaks onto a new line."
                    onChange={e => setFirstName(e.target.value)}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Last Name
                  </FormLabel>
                </GridItem>

                <GridItem xs={12} sm={10}>
                  <CustomInput
                    id="help-text"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text"
                    }}
                    helpText="A block of help text that breaks onto a new line."
                    onChange={e => setLastName(e.target.value)}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Identification Number
                  </FormLabel>
                </GridItem>

                <GridItem xs={12} sm={10}>
                  <CustomInput
                    id="help-text"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text"
                    }}
                    helpText="A block of help text that breaks onto a new line."
                    onChange={e => setSSN(e.target.value)}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Employees Authorization
                  </FormLabel>
                </GridItem>

                <GridItem
                  xs={12}
                  sm={6}
                  md={5}
                  lg={5}
                  style={{
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "center"
                  }}
                >
                  <Select
                    fullWidth
                    inputProps={{
                      name: "Employees_authorization",
                      id: "Employees_authorization"
                    }}
                    value={employeeType}
                    onChange={e => setEmployeeType(e.target.value)}
                  >
                    {renderEmployeeType()}
                  </Select>
                </GridItem>
              </GridContainer>
              {renderSubmit()}
            </form>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
