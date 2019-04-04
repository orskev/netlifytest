import React, { Component } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import CatalogItem from "./CatalogItem";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

class Catalog extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
      items: [],
      pictureIndex: false,
      isOpen: false
    };
  }

  updatePictureIndex = key => {
    var elementPos = this.state.items
      .map(function(x) {
        return x.ExternalID;
      })
      .indexOf(key);
    this.setState({
      pictureIndex: elementPos
    });
  };

  updateIsOpened = () => {
    this.setState({ isOpen: true });
  };

  componentDidMount() {
    fetch("http://localhost:4000/items")
      .then(res => res.json())
      .then(res => {
        this.setState({
          items: res.data
        });
      });
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
    const { search, items, pictureIndex, isOpen } = this.state;
    let filteredItems = items.filter(item => {
      return (
        item.ExternalID.toLowerCase().indexOf(
          this.state.search.toLowerCase()
        ) !== -1
      );
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
          placeholder="Search for an item"
          value={search}
          onChange={this.updateSearch.bind(this)}
        />
        <ul style={{ marginTop: "10px", marginBottom: "10px", padding: "0" }}>
          {Object.keys(filteredItems).map(key => (
            <CatalogItem
              key={key}
              index={key}
              details={filteredItems[key]}
              updatePictureIndex={this.updatePictureIndex}
              updateIsOpened={this.updateIsOpened}
            />
          ))}
        </ul>
        {isOpen && (
          <Lightbox
            mainSrc={require(`../images/${items[pictureIndex].PicPath}.jpg`)}
            nextSrc={items[(pictureIndex + 1) % items.length].PicPath}
            prevSrc={
              items[(pictureIndex + items.length - 1) % items.length].PicPath
            }
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                pictureIndex: (pictureIndex + items.length - 1) % items.length
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                pictureIndex: (pictureIndex + 1) % items.length
              })
            }
          />
        )}
      </div>
    );
  }
}

export default Catalog;
