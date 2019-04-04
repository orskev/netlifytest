import React, { Component } from "react";
import { Button, Carousel } from "react-bootstrap";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

class Home extends Component {
  getUserId = () => {
    var str = window.location.pathname;
    var words = str.split("/");
    return words[2];
  };

  InventoryGetSlsId = () => {
    var str = window.location.pathname;
    var words = str.split("/");
    return "/inventory/" + words[2];
  };

  goToSalesOrder = () => {
    this.props.history.push(`/salesorder/${this.getUserId()}`);
  };

  goToCatalog = () => {
    this.props.history.push(`/catalog/${this.getUserId()}`);
  };

  goToActivities = () => {
    this.props.history.push(`/activities/${this.getUserId()}`);
  };

  goToAccounts = () => {
    this.props.history.push(`/accounts/${this.getUserId()}`);
  };

  goToRepDashboard = () => {
    this.props.history.push(`/repdashboard/${this.getUserId()}`);
  };

  goToHome = () => {
    this.props.history.push(`/home/${this.getUserId()}`);
  };

  goToArticles = () => {
    this.props.history.push(`/articles/${this.getUserId()}`);
  };

  goToNotes = () => {
    this.props.history.push(`/notes/${this.getUserId()}`);
  };

  goToInventory = () => {
    this.props.history.push(`/inventory/${this.getUserId()}`);
  };

  render() {
    return (
      <div>
        <div>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="#home">MDR Brands</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link onClick={() => this.goToHome()}>Home</Nav.Link>
                <NavDropdown title="More Actions" id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={() => this.goToArticles()}>
                    Articles
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => this.goToNotes()}>
                    Notes
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => this.goToInventory()}>
                    Inventory
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/">Log Out</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
        <div
          style={{
            position: "fixed",
            width: "100%",
            margin: "auto",
            paddingTop: "100px"
          }}
        >
          <Carousel style={{ height: "450px" }}>
            <Carousel.Item>
              <img
                src={require("../images/FrankiesSlide.jpg")}
                alt="First slide"
                style={{ height: "400px" }}
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                src={require("../images/WaffersLS2.jpg")}
                alt="Third slide"
                style={{ height: "400px" }}
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                src={require("../images/LadySarahMuffins.jpg")}
                alt="Third slide"
                style={{ height: "400px" }}
              />
            </Carousel.Item>
          </Carousel>
        </div>

        <div className="footer">
          <Button
            style={{
              width: "50%",
              backgroundColor: "darkturquoise",
              borderColor: "whitesmoke",
              color: "white",
              margin: "25px"
            }}
            variant="light"
            size="lg"
            active
            onClick={() => this.goToSalesOrder()}
          >
            Sales Order
          </Button>
          <Button
            className="menu-buttons"
            style={{
              width: "50%"
            }}
            variant="light"
            size="lg"
            active
            onClick={() => this.goToAccounts()}
          >
            Accounts
          </Button>
          <Button
            className="menu-buttons"
            style={{
              width: "50%"
            }}
            variant="light"
            size="lg"
            active
            onClick={() => this.goToRepDashboard()}
          >
            Rep Dashboard
          </Button>
          <Button
            className="menu-buttons"
            style={{
              width: "50%"
            }}
            variant="light"
            size="lg"
            active
            onClick={() => this.goToActivities()}
          >
            Activities
          </Button>
          <Button
            className="menu-buttons"
            style={{
              width: "50%"
            }}
            variant="light"
            size="lg"
            active
            onClick={() => this.goToCatalog()}
          >
            Catalog
          </Button>
        </div>
      </div>
    );
  }
}

export default Home;
