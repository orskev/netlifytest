import React, { Component } from "react";
import Article from "./Article";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

class Articles extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
      articles: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:4000/articles")
      .then(res => res.json())
      .then(res => {
        this.setState({
          articles: res.data
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
    const { articles, search } = this.state;

    let filteredArticles = articles.filter(article => {
      return (
        article.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
        -1
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
          placeholder="Search for an article"
          value={search}
          onChange={this.updateSearch.bind(this)}
        />

        <ul>
          {Object.keys(filteredArticles).map(key => (
            <Article key={key} index={key} details={filteredArticles[key]} />
          ))}
        </ul>
      </div>
    );
  }
}
export default Articles;
