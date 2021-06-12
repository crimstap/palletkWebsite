import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import NavPills from "components/NavPills/NavPills.js";
import Parallax from "components/Parallax/Parallax.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import profile from "assets/img/logo-black.png";
import l_shaped_warehouse from "assets/img/l_shaped_warehouse.png";
import i_shaped_warehouse from "assets/img/i_shaped_warehouse.png";
import u_shaped_warehouse from "assets/img/u_shaped_warehouse.png";
import x_shaped_warehouse from "assets/img/x_shaped_warehouse.png";
import {PropTypes} from "prop-types";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Checkbox from "@material-ui/core/Checkbox";

import studio1 from "assets/img/examples/studio-1.jpg";

import styles from "assets/jss/material-kit-react/views/profilePage.js";

const useStyles = makeStyles(styles);

class DemoPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render = () => {
    const classes = this.props.classes;
    return (
      <div>
        <Header
          color="transparent"
          brand="Palletek"
          rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{
            height: 200,
            color: "white"
          }}
        />
        <Parallax small filter image={require("assets/img/warehouse.jpg")} />
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div>
            <div className={classes.container}>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={6}>
                  <div className={classes.profile}>
                    <div>
                      <img src={profile} alt="..."/>
                    </div>
                    <div className={classes.name}>
                      <h3 className={classes.title}>
                        Palletek Warehouse Planner
                      </h3>
                      <h6></h6>
                    </div>
                  </div>
                </GridItem>
              </GridContainer>
              <div className={classes.description}>
                <p>
                  Fill in the fields below and Palletek will generate a plan
                  estimate for your warehouse solution
                </p>
              </div>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                  <form
                    className={classes.container}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      id="filled-full-width"
                      label={<div style={{ fontSize: 20 }}> Company Name</div>}
                      style={{ margin: 12 }}
                      placeholder="Enter your company name"
                      fullWidth
                      margin="none"
                      variant="outlined"
                    />
                    <TextField
                      id="filled-full-width"
                      label={
                        <div style={{ fontSize: 20 }}> Type of Industry</div>
                      }
                      style={{ margin: 12 }}
                      placeholder="Enter your type of industry"
                      fullWidth
                      margin="none"
                      variant="outlined"
                    />
                    <Card
                      fullWidth
                      style={{ margin: 12, marginLeft: 12, marginRight: -12 }}
                    >
                      <FormControl
                        style={{ margin: 12 }}
                        variant="outlined"
                        fullWidth
                        label="Gner "
                        hiddenLabel="true"
                        className={classes.formControl}
                      >
                        <FormLabel
                          style={{
                            fontSize: 20,
                            textAlign: "left",
                            marginBottom: 12
                          }}
                          component="legend"
                        >
                          Required Type of System
                        </FormLabel>
                        <RadioGroup
                          style={{ marginLeft: 24 }}
                          aria-label="system"
                          name="system"
                          value={""}
                        >
                          <FormControlLabel
                            value="RFID"
                            control={<Radio />}
                            label="RFID"
                          />
                          <FormControlLabel
                            value="IOT"
                            control={<Radio />}
                            label="IOT"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Card>

                    <Card
                      fullWidth
                      style={{ margin: 12, marginLeft: 12, marginRight: -12 }}
                    >
                      <FormControl
                        style={{ margin: 12 }}
                        variant="outlined"
                        fullWidth
                        label="Gner "
                        hiddenLabel="true"
                        className={classes.formControl}
                      >
                        <FormLabel
                          style={{
                            fontSize: 20,
                            textAlign: "left",
                            marginBottom: 12
                          }}
                          component="legend"
                        >
                          Warehouse Layout
                        </FormLabel>
                        <RadioGroup
                          style={{ marginLeft: 24 }}
                          aria-label="system"
                          name="system"
                          value={""}
                        >
                          <FormControlLabel
                            value="Type 1"
                            control={<Radio />}
                            style={{ marginTop: 50 }}
                            label={
                              <img
                                style={{ height: 200 }}
                                src={l_shaped_warehouse}
                              />
                            }
                          />
                          <FormControlLabel
                            value="Type 2"
                            control={<Radio />}
                            style={{ marginTop: 50 }}
                            label={
                              <img
                                style={{ height: 200 }}
                                src={i_shaped_warehouse}
                              />
                            }
                          />
                          <FormControlLabel
                            value="Type 3"
                            control={<Radio />}
                            style={{ marginTop: 50 }}
                            label={
                              <img
                                style={{ height: 200 }}
                                src={u_shaped_warehouse}
                              />
                            }
                          />
                          <FormControlLabel
                            value="Type 4"
                            control={<Radio />}
                            style={{ marginTop: 50, marginBottom: 50 }}
                            label={
                              <img
                                style={{ height: 200 }}
                                src={x_shaped_warehouse}
                              />
                            }
                          />
                        </RadioGroup>
                      </FormControl>
                    </Card>

                    <Card
                      fullWidth
                      style={{
                        display: "flex",
                        margin: 12,
                        marginLeft: 12,
                        marginRight: -12
                      }}
                    >
                      <FormControl
                        style={{ margin: 12 }}
                        variant="outlined"
                        hiddenLabel="true"
                        className={classes.formControl}
                      >
                        <FormLabel
                          style={{
                            fontSize: 20,
                            textAlign: "left",
                            marginBottom: 12
                          }}
                          component="legend"
                        >
                          Dimensions of Warehouse
                        </FormLabel>
                        <div style={{ display: "flex" }}>
                          <TextField
                            fullWidth="false"
                            id="filled-full-width"
                            label={<div style={{ fontSize: 20 }}> Width</div>}
                            style={{ margin: 12 }}
                            placeholder="Width"
                            margin="none"
                            variant="outlined"
                          />
                          <TextField
                            fullWidth="false"
                            id="filled-full-width"
                            label={<div style={{ fontSize: 20 }}> Length</div>}
                            style={{ margin: 12 }}
                            placeholder="Length"
                            margin="none"
                            variant="outlined"
                          />
                        </div>
                      </FormControl>
                    </Card>
                    <TextField
                      id="filled-full-width"
                      label={
                        <div style={{ fontSize: 20 }}>
                          {" "}
                          Size of Staging Area (m2)
                        </div>
                      }
                      style={{ margin: 12 }}
                      placeholder="Size of Staging Area (m2)"
                      fullWidth
                      margin="none"
                      variant="outlined"
                    />
                    <TextField
                      id="filled-full-width"
                      label={
                        <div style={{ fontSize: 20 }}>
                          {" "}
                          Size of Storage Area (m2)
                        </div>
                      }
                      style={{ margin: 12 }}
                      placeholder="Size of Storage Area (m2)"
                      fullWidth
                      margin="none"
                      variant="outlined"
                    />

                    <Card
                      fullWidth
                      style={{ margin: 12, marginLeft: 12, marginRight: -12 }}
                    >
                      <FormControl
                        style={{ margin: 12 }}
                        variant="outlined"
                        fullWidth
                        label="products_recieved "
                        hiddenLabel="true"
                        className={classes.formControl}
                      >
                        <FormLabel
                          style={{
                            fontSize: 20,
                            textAlign: "left",
                            marginBottom: 12
                          }}
                          component="legend"
                        >
                          Types of Products:
                        </FormLabel>
                        <RadioGroup
                          style={{ marginLeft: 24 }}
                          aria-label="system"
                          name="system"
                          value={""}
                        >
                          <FormControlLabel
                            value="FMCGS"
                            control={<Checkbox />}
                            label="FMCGS"
                          />
                          <FormControlLabel
                            value=" Pharmacuticals"
                            control={<Checkbox />}
                            label=" Pharmacuticals"
                          />
                          <FormControlLabel
                            value="Electronics"
                            control={<Checkbox />}
                            label="Electronics"
                          />
                          <FormControlLabel
                            value="Industrial Products"
                            control={<Checkbox />}
                            label="Industrial Products"
                          />
                          <FormControlLabel
                            value="Clothes"
                            control={<Checkbox />}
                            label="Clothes"
                          />
                          <FormControlLabel
                            value="Chemical Products"
                            control={<Checkbox />}
                            label="Chemical Products"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Card>

                    <Card
                      fullWidth
                      style={{ margin: 12, marginLeft: 12, marginRight: -12 }}
                    >
                      <FormControl
                        style={{ margin: 12 }}
                        variant="outlined"
                        fullWidth
                        label="products_recieved "
                        hiddenLabel="true"
                        className={classes.formControl}
                      >
                        <FormLabel
                          style={{
                            fontSize: 20,
                            textAlign: "left",
                            marginBottom: 12
                          }}
                          component="legend"
                        >
                          Products Recieved On:
                        </FormLabel>
                        <RadioGroup
                          style={{ marginLeft: 24 }}
                          aria-label="system"
                          name="system"
                          value={""}
                        >
                          <FormControlLabel
                            value="Pallets"
                            control={<Radio />}
                            label="Pallets"
                          />
                          <FormControlLabel
                            value="Cartons"
                            control={<Radio />}
                            label="Cartons"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Card>
                    <TextField
                      id="filled-full-width"
                      label={
                        <div style={{ fontSize: 20 }}>
                          Number of Working Shifts
                        </div>
                      }
                      style={{ margin: 12 }}
                      placeholder="Enter number of working shifts"
                      fullWidth
                      margin="none"
                      variant="outlined"
                    />
                    <TextField
                      id="filled-full-width"
                      label={<div style={{ fontSize: 20 }}>Full Name</div>}
                      style={{ margin: 12 }}
                      placeholder="Enter your full name"
                      fullWidth
                      margin="none"
                      variant="outlined"
                    />
                    <TextField
                      id="filled-full-width"
                      label={<div style={{ fontSize: 20 }}>Email</div>}
                      style={{ margin: 12 }}
                      placeholder="Enter your email"
                      fullWidth
                      margin="none"
                      variant="outlined"
                    />
                    <TextField
                      id="filled-full-width"
                      label={<div style={{ fontSize: 20 }}>Phone</div>}
                      style={{ margin: 12 }}
                      placeholder="Enter your phone number"
                      fullWidth
                      margin="none"
                      variant="outlined"
                    />
                  </form>
                </GridItem>
              </GridContainer>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  };
}
DemoPage.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(DemoPage);
