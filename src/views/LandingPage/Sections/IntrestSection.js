import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/workStyle.js";
import { flexbox } from "@material-ui/system";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
const useStyles = makeStyles(styles);

export default function IntrestSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem cs={12} sm={12} md={8}>
          <h2 className={classes.title}>Come Join Us</h2>
          <h4 className={classes.description}>
            Register an account to enjoy our services or alternatively you can
            try our free demo plan creator
          </h4>
        </GridItem>
        <GridContainer
          cs={12}
          sm={12}
          md={8}
          style={{
            margin: "10px",
            display: "flex",
            alignItems: "center"
          }}
          direction={"column"}
        >
          <GridItem xs={12} sm={12} md={4}>
            <Link to="/signup">
              <Button color="primary">Register an account</Button>
            </Link>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Button color="danger">Try our plan creator</Button>
          </GridItem>
        </GridContainer>
      </GridContainer>
    </div>
  );
}
