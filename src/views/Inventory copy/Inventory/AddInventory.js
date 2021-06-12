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
import CircularProgress from "@material-ui/core/CircularProgress";

import styles from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";
import axios from "axios";

const useStyles = makeStyles(styles);

function sendRequest(data, func) {
  func(true);
  console.log("HEre");
  axios
    .post("http://192.168.1.111:5000/additem_toinventory/", data)
    .then(res => {
      console.log(res);
      func(false);
    });
}

export default function AddItem() {
  const [checked, setChecked] = React.useState([24, 22]);
  const [selectedEnabled, setSelectedEnabled] = React.useState("b");
  const [selectedValue, setSelectedValue] = React.useState(null);

  const [loadingSubmit, setLoadingSubmit] = React.useState(false);
  const [itemName, setItemName] = React.useState(null);
  const [barcode, setBarcode] = React.useState(null);
  const [description, setDescription] = React.useState(null);
  const [amount, setAmount] = React.useState(null);
  const [entryDate, setEntryDate] = React.useState(null);
  const [itemType, setItemType] = React.useState(null);

  const itemTypeToString = val => {
    if (val == 0) {
      return "Pallet";
    } else if (val == 1) {
      return "Single Item";
    } else {
      return "Shrink";
    }
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
      return <CircularProgress color="rose" style={{ marginTop: "6vh" }} />;
    } else {
      return (
        <Button
          color="rose"
          style={{ marginTop: "6vh" }}
          onClick={() =>
            sendRequest(
              {
                item_barcode: barcode,
                contain_no: amount,
                description: description,
                entry_date: entryDate,
                item_type: itemTypeToString(itemType)
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
            <CardIcon color="rose">
              <AddIcon />
            </CardIcon>
            <h3 className={classes.cardIconTitle}>Add Inventory</h3>
            <h5 style={{ marginLeft: "5vw", marginTop: "1vh", color: "grey" }}>
              Here you can manually add to your inventory without an incoming
              order{" "}
            </h5>
          </CardHeader>
          <CardBody>
            <form>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Barcode
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
                    onChange={e => setBarcode(e.target.value)}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Amount
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
                    onChange={e => setAmount(e.target.value)}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Entry Date
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
                    onChange={e => setEntryDate(e.target.value)}
                  />
                </GridItem>
              </GridContainer>

              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Description
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
                    onChange={e => setDescription(e.target.value)}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Item Type
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
                    value={itemType}
                    onChange={e => setItemType(e.target.value)}
                    inputProps={{
                      name: "itemType",
                      id: "itemType"
                    }}
                  >
                    <MenuItem value={0}>Pallet</MenuItem>
                    <MenuItem value={1}>Single Item</MenuItem>
                    <MenuItem value={2}>Shrink</MenuItem>
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
