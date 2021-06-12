import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Chat from "@material-ui/icons/Chat";
import CropFreeIcon from "@material-ui/icons/CropFree";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>What do we offer</h2>
          <h5 className={classes.description}>
            Palletk offers a wide range of services to help you get your
            business off the ground or to upgrade your current traditional
            warehouse management system.
          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Customer Support"
              description="Palletk Provides customer support to all its clients to help solve their problems. Avialable any time, helping to solve any of your conerns"
              icon={Chat}
              iconColor="info"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Upgrading Plans"
              description="Palletk takes the responsiblity of creating a custimized plan for you in order to upgrade your current solution so you dont have to worry about it! Just enter your warehouse system's details and Palletk plans out everything for you."
              icon={Chat}
              iconColor="danger"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Smart Solutions"
              description="Palletk offers smart solutions for your warehouse needs including a deticated barcode scanning application, item management, order tracking and much more"
              icon={CropFreeIcon}
              iconColor="success"
              vertical
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}

