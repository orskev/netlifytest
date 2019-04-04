import React, { Component } from "react";
import OrderHeader from "./OrderHeader";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

class Activities extends Component {
  constructor() {
    super();
    this.state = {
      orders: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:4000/salesheader")
      .then(res => res.json())
      .then(res => {
        this.setState({
          orders: res.data
        });
      });
  }

  getUserId = () => {
    var str = window.location.pathname;
    var words = str.split("/");
    return words[2];
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

  goToOrderDetails = (key, key1) => {
    this.props.history.push(`/orderdetails/${key}/${key1}`);
  };

  render() {
    const userID = this.getUserId();
    const orderBySls = this.state.orders.filter(function(obj) {
      return obj.sls_id === userID;
    });

    const orderBySlsSorted = orderBySls.reverse();
    return (
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
        <ul style={{ marginTop: "10px", marginBottom: "10px" }}>
          {Object.keys(orderBySlsSorted).map((key, key1) => (
            <OrderHeader
              key={key}
              index={key}
              key1={key1}
              details={orderBySlsSorted[key]}
              goToOrderDetails={this.goToOrderDetails}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default Activities;
