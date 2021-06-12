import React, { useEffect } from "react";
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
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

// @material-ui/icons
import MailOutline from "@material-ui/icons/MailOutline";
import Check from "@material-ui/icons/Check";
import Clear from "@material-ui/icons/Clear";
import Contacts from "@material-ui/icons/Contacts";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import AddIcon from "@material-ui/icons/Add";

import ReactTable from "react-table";
import PropTypes from "prop-types";
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

// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
import Close from "@material-ui/icons/Close";
import Assignment from "@material-ui/icons/Assignment";

import styles from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";
import modalStyles from "assets/jss/material-dashboard-pro-react/views/notificationsStyle.js";

import axios from "axios";

const useStyles = makeStyles(styles);
const modalUseStyles = makeStyles(modalStyles);
function sendRequest(data, func) {
  func(true);
  console.log("sendingReq");
  axios.post("http://192.168.1.111:5000/addincoming_order/", data).then(res => {
    console.log(res);
    func(false);
  });
}

function getSupplierData(func) {
  axios
    .post("http://192.168.1.111:5000/getallsuppliers")
    .then(res => func(res.data.result));
}

export default function AddItem() {
  const [supplierModal, setSupplierModal] = React.useState(false);

  const [loadingSubmit, setLoadingSubmit] = React.useState(false);
  const [supplierData, setSupplierData] = React.useState(undefined);
  const [orderID, setOrderID] = React.useState(false);
  const [entryDate, setEntryDate] = React.useState(null);
  const [totalPaid, setTotalPaid] = React.useState(null);
  const [status, setStatus] = React.useState(null);
  const [supplierUUID, setSupplierUUID] = React.useState(null);
  const [supplierName, setSupplierName] = React.useState(null);
  const [expectedArrivalDate, setExpectedArrivalDate] = React.useState(null);

  useEffect(() => {
    console.log("Here");
    getSupplierData(setSupplierData);
  }, [supplierName]);
  const orderTypeToString = val => {
    if (val == 0) {
      return "Incoming";
    } else if (val == 1) {
      return "Delivered";
    } else if (val == 2) {
      return "Entered";
    } else if (val == 3) {
      return "Scanning";
    } else {
      return "Confirmed";
    }
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
                incoming_order_id: orderID,
                entry_date: entryDate,
                total_paid: totalPaid,
                status: orderTypeToString(status),
                supplier_uuid: supplierUUID
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

  // const Transition = React.forwardRef(function Transition(props, ref) {
  //   return <Slide direction="down" ref={ref} {...props} />;
  // });

  const classes = useStyles();
  const renderSupplierTable = () => {
    return (
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardBody>
              <ReactTable
                data={supplierData}
                filterable
                columns={[
                  {
                    Header: "Name",
                    accessor: "name"
                  },
                  {
                    Header: "Phone Number",
                    accessor: "phone_number"
                  },
                  {
                    Header: "Address",
                    accessor: "address"
                  },
                  {
                    Header: "Description",
                    accessor: "description"
                  },
                  {
                    Header: "Actions",
                    accessor: "actions",
                    sortable: false,
                    filterable: false
                  }
                ]}
                defaultPageSize={10}
                showPaginationTop
                showPaginationBottom={false}
                className="-striped -highlight"
                getTdProps={(state, rowInfo, column, instance) => {
                  return {
                    onClick: (e, handleOriginal) => {
                      console.log("A Td Element was clicked!");
                      console.log("It was in this row:", rowInfo);
                      setSupplierUUID(rowInfo.original.supplier_uuid);
                      setSupplierName(rowInfo.original.name);
                      console.log(rowInfo.original.name);
                      setSupplierModal(false);
                      // IMPORTANT! React-Table uses onClick internally to trigger
                      // events like expanding SubComponents and pivots.
                      // By default a custom 'onClick' handler will override this functionality.
                      // If you want to fire the original onClick handler, call the
                      // 'handleOriginal' function.
                      if (handleOriginal) {
                        handleOriginal();
                      }
                    }
                  };
                }}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  };

  const renderSupplierModal = (
    <Dialog
      maxWidth="md"
      fullWidth
      classes={{
        root: classes.center + " " + classes.modalRoot,
        paper: classes.modal
      }}
      open={supplierModal}
      //TransitionComponent={Transition}
      keepMounted
      onClose={() => setSupplierModal(false)}
      aria-labelledby="classic-modal-slide-title"
      aria-describedby="classic-modal-slide-description"
    >
      <DialogTitle
        id="classic-modal-slide-title"
        disableTypography
        className={classes.modalHeader}
      >
        <Button
          justIcon
          className={classes.modalCloseButton}
          key="close"
          aria-label="Close"
          color="transparent"
          onClick={() => setSupplierModal(false)}
        >
          <Close className={classes.modalClose} />
        </Button>
        <h4 className={classes.modalTitle}>Select Supplier</h4>
      </DialogTitle>
      <DialogContent
        id="classic-modal-slide-description"
        className={classes.modalBody}
      >
        {renderSupplierTable()}
      </DialogContent>
      <DialogActions className={classes.modalFooter}>
        <Button onClick={() => setSupplierModal(false)} color="danger" simple>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary" icon>
            <CardIcon color="rose">
              <AddIcon />
            </CardIcon>
            <h3 className={classes.cardIconTitle}>Add Incoming Order</h3>
            <h5 style={{ marginLeft: "5vw", marginTop: "1vh", color: "grey" }}>
              Here you record orders coming in to your warehouse{" "}
            </h5>
          </CardHeader>
          <CardBody>
            <form>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Order ID
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
                    onChange={e => setOrderID(e.target.value)}
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
                    Total Paid
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
                    onChange={e => setTotalPaid(e.target.value)}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Supplier
                  </FormLabel>
                </GridItem>

                <GridItem xs={7}>
                  <CustomInput
                    id="help-text"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text",
                      disabled: true,
                      value: supplierName
                    }}
                    helpText="A block of help text that breaks onto a new line."
                  />
                </GridItem>
                <GridItem xs={3}>
                  <Button
                    style={{ marginBottom: "0" }}
                    color="warning"
                    onClick={() => {
                      console.log("Here");
                      setSupplierModal(true);
                    }}
                  >
                    Select Supplier
                  </Button>
                </GridItem>
                {renderSupplierModal}
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Order Status
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
                    value={status}
                    onChange={e => setStatus(e.target.value)}
                    inputProps={{
                      name: "itemType",
                      id: "itemType"
                    }}
                  >
                    <MenuItem value={0}>Incoming</MenuItem>
                    <MenuItem value={1}>Delivered</MenuItem>
                    <MenuItem value={2}>Entered</MenuItem>
                    <MenuItem value={2}>Scanning</MenuItem>
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
