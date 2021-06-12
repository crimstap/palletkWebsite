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
import CropFreeIcon from "@material-ui/icons/CropFree";

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
import BarcodeDocument from "components/BarcodeDocument/BarcodeDocument.js";
import ReactPDF, {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  PDFViewer
} from "@react-pdf/renderer";

import axios from "axios";
import QRCode from "qrcode.react";
import uuid from "uuid/v4";
import fileDownload from "react-file-download";
import styles from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";

const useStyles = makeStyles(styles);
function createQRCodes(orderNumber, n) {
  if (isNaN(parseInt(n))) {
    console.log("invalid number");
    return null;
  }
  var array = new Array(parseInt(n)).fill(orderNumber);
  array = array.map((val, idx) => {
    return (
      <QRCode
        key={idx}
        value={val + "_" + uuid()}
        style={{ margin: "40px" }}
        renderAs="svg"
      ></QRCode>
    );
  });

  axios.post("http://localhost:5000/genBarcode", { barcodeArray: array });

  return array;
}

function createQRCodesV2(orderNumber, n) {
  if (isNaN(parseInt(n))) {
    console.log("invalid number");
    return null;
  }
  var array = new Array(parseInt(n)).fill(orderNumber);
  array = array.map((val, idx) => {
    return val + uuid();
  });
  console.log(array);
  axios
    .post(
      "http://192.168.1.111:5000/generate_barcodes_pdf",
      {
        barcode_datalist: array
      },
      { responseType: "blob" }
    )
    .then(response => {
      const file = new Blob([response.data], {
        type: "application/pdf"
      });
      console.log("Here");
      //Build a URL from the file
      fileDownload(file,"file.pdf");
      const fileURL = URL.createObjectURL(file);
      //Open the URL on new Window
      window.open(fileURL);
    });
}
export default function BarcodeGenerator() {
  const [checked, setChecked] = React.useState([24, 22]);
  const [selectedEnabled, setSelectedEnabled] = React.useState("b");
  const [selectedValue, setSelectedValue] = React.useState(null);
  const [orderNumber, setOrderNumber] = React.useState("");
  const [qrCount, setQRCount] = React.useState(null);
  const [qrCodes, setQRCodes] = React.useState(null);
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
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary" icon>
              <CardIcon color="warning">
                <CropFreeIcon />
              </CardIcon>
              <h3 className={classes.cardIconTitle}>Generate Barcode</h3>
              <h5
                style={{ marginLeft: "5vw", marginTop: "1vh", color: "grey" }}
              >
                Generate Barcode for Order Pallets.{" "}
              </h5>
            </CardHeader>
            <CardBody>
              <form>
                <GridContainer>
                  <GridItem xs={12} sm={2}>
                    <FormLabel className={classes.labelHorizontal}>
                      Order (Batch) Number
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
                      onChange={e => setOrderNumber(e.target.value)}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={2}>
                    <FormLabel className={classes.labelHorizontal}>
                      Amount of Codes
                    </FormLabel>
                  </GridItem>

                  <GridItem xs={12} sm={10}>
                    <CustomInput
                      id="help-text"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "number"
                      }}
                      helpText="A block of help text that breaks onto a new line."
                      onChange={e => setQRCount(e.target.value)}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={2}>
                    <FormLabel className={classes.labelHorizontal}>
                      Barcode Type
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
                      value={11}
                      onChange={handleChange}
                      inputProps={{
                        name: "worker_authorization",
                        id: "worker_authorization"
                      }}
                    >
                      <MenuItem value={11}>QR Code</MenuItem>
                      <MenuItem value={20}>Barcode 1</MenuItem>
                      <MenuItem value={30}>Barcode 2</MenuItem>
                    </Select>
                  </GridItem>
                </GridContainer>
                <Button
                  color="warning"
                  style={{ marginTop: "6vh" }}
                  onClick={() => createQRCodesV2(orderNumber, qrCount)}
                >
                  Submit
                </Button>
              </form>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      {qrCodes}
    </div>
  );
}
