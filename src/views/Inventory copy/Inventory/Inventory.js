import React from "react";
// react component for creating dynamic tables
import ReactTable from "react-table";
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
import Dvr from "@material-ui/icons/Dvr";
import Favorite from "@material-ui/icons/Favorite";
import Close from "@material-ui/icons/Close";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";

import { dataTable } from "variables/general.js";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.js";
import axios from "axios";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};

async function getData() {
  return await axios.post("http://192.168.1.111:5000/getallitems_inventory");
}

class Inventory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: undefined
    };
  }

  async componentDidMount() {
    getData().then(req => {
      this.setState({ data: this.renderData(req.data.result) });
    });
  }

  render() {
    const classes = this.props.classes;

    return (
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="primary" icon>
              <CardIcon color="danger">
                <Assignment />
              </CardIcon>
              <h3 className={classes.cardIconTitle}>View Items</h3>
              <h5
                style={{ marginLeft: "5vw", marginTop: "1vh", color: "grey" }}
              >
                Here you can view previously recorded Items.{" "}
              </h5>{" "}
            </CardHeader>
            <CardBody>
              <ReactTable
                data={this.state.data}
                filterable
                columns={[
                  {
                    Header: "Name",
                    accessor: "name"
                  },
                  {
                    Header: "Barcode",
                    accessor: "barcode"
                  },
                  {
                    Header: "Unit Description",
                    accessor: "unitDescription"
                  },
                  {
                    Header: "Amount",
                    accessor: "amount"
                  },
                  {
                    Header: "Shelf Life",
                    accessor: "shelfLife"
                  },
                  {
                    Header: "Entry Date",
                    accessor: "entryDate"
                  },
                  {
                    Header: "Item Type",
                    accessor: "itemType"
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
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
  //dataTable.dataRows
  renderData = data => {
    var dataCreated = data.map((prop, key) => {
      console.log(prop);
      return {
        id: key,
        name: prop.item_name,
        barcode: prop.item_barcode,
        unitDescription: prop.description,
        amount: prop.contain_no,
        shelfLife: prop.storage_time,
        entryDate: prop.entry_date,
        itemType: prop.item_type
        // actions: (
        //   we've added some custom button actions
        //   <div className="actions-right">
        //     {/* use this button to add a like kind of action */}
        //     <Button
        //       justIcon
        //       round
        //       simple
        //       onClick={() => {
        //         let obj = this.state.data.find(o => o.id === key);
        //         alert(
        //           "You've clicked LIKE button on \n{ \nName: " +
        //             obj.name +
        //             ", \nposition: " +
        //             obj.position +
        //             ", \noffice: " +
        //             obj.office +
        //             ", \nage: " +
        //             obj.age +
        //             "\n}."
        //         );
        //       }}
        //       color="info"
        //       className="like"
        //     >
        //       <Favorite />
        //     </Button>{" "}
        //     {/* use this button to add a edit kind of action */}
        //     <Button
        //       justIcon
        //       round
        //       simple
        //       onClick={() => {
        //         let obj = this.state.data.find(o => o.id === key);
        //         alert(
        //           "You've clicked EDIT button on \n{ \nName: " +
        //             obj.name +
        //             ", \nposition: " +
        //             obj.position +
        //             ", \noffice: " +
        //             obj.office +
        //             ", \nage: " +
        //             obj.age +
        //             "\n}."
        //         );
        //       }}
        //       color="warning"
        //       className="edit"
        //     >
        //       <Dvr />
        //     </Button>{" "}
        //     {/* use this button to remove the data row */}
        //     <Button
        //       justIcon
        //       round
        //       simple
        //       onClick={() => {
        //         var newData = this.state.data;
        //         newData.find((o, i) => {
        //           if (o.id === key) {
        //             here you should add some custom code so you can delete the data
        //             from this component and from your server as well
        //             newData.splice(i, 1);
        //             return true;
        //           }
        //           return false;
        //         });
        //         this.setState({ data: [...newData] });
        //       }}
        //       color="danger"
        //       className="remove"
        //     >
        //       <Close />
        //     </Button>{" "}
        //   </div>
        // )
      };
    });
    return dataCreated;
  };
}

Inventory.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Inventory);
