import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

class Inventory extends Component {
  constructor() {
    super();
    this.state = {
      inventory: [],
      search: [],
      items: []
    };
  }

  componentDidMount() {
    Promise.all([
      fetch("http://localhost:4000/Inventory"),
      fetch("http://localhost:4000/Items")
    ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([data1, data2]) =>
        this.setState({
          inventory: data1.data,
          items: data2.data
        })
      );
  }

  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 45) });
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

  render() {
    const { search, inventory } = this.state;

    const invDetails = inventory.map(({ ItemExternalID, InStockQuantity }) => {
      const found = this.state.items.find(e => e.ExternalID === ItemExternalID);

      return {
        ItemExternalID,
        name: found.name ? found.name : "",
        Prop1: found.Prop1 ? found.Prop1 : "",
        InStockQuantity
      };
    });

    let filteredInv = invDetails.filter(item => {
      return item.ItemExternalID.toLowerCase().indexOf(search) !== -1;
    });

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

        <input
          style={{
            marginBottom: "15px",
            maxWidth: "250px",
            margin: "auto",
            marginTop: "15px"
          }}
          className="form-control"
          type="text"
          placeholder="Search for an Item"
          value={search}
          onChange={this.updateSearch.bind(this)}
        />
        <ReactTable
          style={{
            maxWidth: "1000px",
            margin: "auto",
            marginTop: "15px",
            marginBottom: "15px"
          }}
          data={filteredInv}
          columns={[
            {
              Header: "ItemID",
              accessor: "ItemExternalID",
              width: 100
            },
            {
              Header: "English Description",
              accessor: "name"
            },
            {
              Header: "French Description",
              accessor: "Prop1"
            },
            {
              Header: "InStockQuantity",
              accessor: "InStockQuantity",
              width: 150
            }
          ]}
          defaultPageSize={25}
          className="-striped -highlight"
        />
      </div>
    );
  }
}

export default Inventory;
