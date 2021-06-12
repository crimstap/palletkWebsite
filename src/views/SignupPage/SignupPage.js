import React from "react";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/signup-bg1.jpg";
import axios from "axios";

class SignupPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirm_password: "",
      cardAnimaton: "cardHidden",
      open: false,
      errors: null
    };
    setTimeout(() => {
      this.setState({ cardAnimaton: "" });
    }, 700);
  }

  render() {
    const classes = this.props.classes;

    return (
      <div>
        <Header
          absolute
          color="transparent"
          brand="PALLETK"
          rightLinks={<HeaderLinks />}
        />
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center"
          }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={4}>
                <Card className={classes[this.state.cardAnimaton]}>
                  <form className={classes.form}>
                    <CardHeader
                      style={{ backgroundColor: "#2196f3" }}
                      className={classes.cardHeader}
                    >
                      <h4 style={{ color: "white" }}>Sign Up</h4>
                    </CardHeader>
                    <CardBody>
                      {this.renderErrors()}
                      <CustomInput
                        labelText="First Name"
                        id="first"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text"
                        }}
                        onChange={e =>
                          this.setState({ firstname: e.target.value })
                        }
                      />
                      <CustomInput
                        labelText="Last Name"
                        id="last"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text"
                        }}
                        onChange={e =>
                          this.setState({ lastname: e.target.value })
                        }
                      />{" "}
                      <CustomInput
                        labelText="Email"
                        id="email"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text"
                        }}
                        onChange={e => this.setState({ email: e.target.value })}
                      />{" "}
                      <CustomInput
                        labelText="Password"
                        id="pass"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "password"
                        }}
                        onChange={e =>
                          this.setState({ password: e.target.value })
                        }
                      />
                      <CustomInput
                        labelText="Confirm Password"
                        id="confirm_pass"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "password"
                        }}
                        onChange={e =>
                          this.setState({ confirm_password: e.target.value })
                        }
                      />
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button
                        color="primary"
                        size="lg"
                        onClick={() => {
                          this.handleSignup();
                        }}
                      >
                        Get started
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
          <Footer whiteFont />
        </div>
      </div>
    );
  }

  handleSignup = () => {
    this.setState({ error: null });
    if (this.state.password != this.state.confirm_password) {
      alert("Passwords dont match");
      return;
    }
    axios
      .post("http://192.168.1.111:5000/signup/", {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        password: this.state.password
      })
      .then(res => {
        console.log(res);
        this.handleResponse(res);
      });
  };

  handleResponse = res => {
    if (res.data.success== false) { 
      this.setState({ errors: res.data.errors });
    }
    else {
      window.location='http://192.168.1.111:3000/login'
      return;
    }
  };
  
  renderErrors = () => {
    if (this.state.errors == null) return null;

    return this.state.errors.map(e => {
      return (
        <Card
          key={e}
          fullWidth
          style={{
            margin: 4,
            backgroundColor: "#f8d7da",
            boxShadow:
              "0px 1px 1px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 1px -1px rgba(0,0,0,0.12)"
          }}
        >
          <div
            style={{
              fontWeight: "500",
              color: " #721c24 ",
              borderRadius: 4,
              margin: 4,
              padding: 4,
              paddingLeft: 12
            }}
            key="s"
          >
            {e}
          </div>
        </Card>
      );
    });
  };
}

SignupPage.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(SignupPage);
