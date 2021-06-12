import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import {withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// @material-ui/icons

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page
import ProductSection from "./Sections/ProductSection.js";
import IntrestSection from "./Sections/IntrestSection";

import Modal from "@material-ui/core/Modal";

import ReactPlayer from "react-player";


class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoModal: false
    };
  }
  render() {
    const classes = this.props.classes;

    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.videoModal}
          onClose={() => this.setState({ videoModal: false })}
        >
          <ReactPlayer
            style={{
              margin: "0",
              position: "absolute",
              top: "50%",
              left: "50%",
              MsTransform: "translate(-50%,-50%)",
              transform: "translate(-50%,-50%)"
            }}
            height={"70%"}
            width={"70%"}
            url={"https://www.youtube.com/watch?v=N7c0MzU32rA&feature=youtu.be"}
            youtubeConfig={{ playerVars: { showinfo: 1 } }}
            facebookConfig={{ appId: "12345" }}
          />
        </Modal>
        <Header
          absolute
          color="transparent"
          brand={
            <Link to="/" style={{ color: "white" }}>
              PALLETK
            </Link>
          }
          rightLinks={<HeaderLinks />}
        />

        <Parallax filter image={require("assets/img/warehouse.jpg")}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <h1 className={classes.title}>
                  <img
                    style={{
                      width: "10em",
                      maxWidth: "90vw",
                      height: "auto"
                    }}
                    src={require("assets/img/logo-white.png")}
                    alt="Paltek Smart Solutions."
                  />
                </h1>
                <h4>
                  Palletk provides solutions for warehouse and business owners.
                  Calculating what you need for your business and providing
                  smart solutions. All with 24 hour support
                </h4>
                <br />
                <Button
                  color="primary"
                  size="lg"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={this.openVideoModal}
                >
                  <i className="fas fa-play" />
                  Watch video
                </Button>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <ProductSection />
            <IntrestSection />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  openVideoModal = () => {
    this.setState({ videoModal: true });
  };
}
LandingPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LandingPage);
