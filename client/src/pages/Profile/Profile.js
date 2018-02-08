import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

class Outlets extends Component {
  // Setting our component's initial state
  state = {
    outlets: [],
    name: ""
  };

  // When the component mounts, load all outlets and save them to this.state.outlets
  componentDidMount() {
    this.loadOutlets();
  }

  // Loads all outlets  and sets them to this.state.outlets
  loadOutlets = () => {
    API.getOutlets()
      .then(res =>
        this.setState({ outlets: res.data, name: ""})
      )
      .catch(err => console.log(err));
  };

  // Deletes a book from the database with a given id, then reloads outlets from the db
  deleteOutlet = id => {
    API.deleteOutlet(id)
      .then(res => this.loadOutlets())
      .catch(err => console.log(err));
  };

  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload outlets from the database
  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.name) {
      API.saveOutlet({
        name: this.state.name
      })
        .then(res => this.loadOutlets())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>What Outlets Should I Read?</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.name}
                onChange={this.handleInputChange}
                name="name"
                placeholder="Title (required)"
              />
              <FormBtn
                disabled={!(this.state.name)}
                onClick={this.handleFormSubmit}
              >
                Submit Book
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Outlets On My List</h1>
            </Jumbotron>
            {this.state.outlets.length ? (
              <List>
                {this.state.outlets.map(outlet => {
                  return (
                    <ListItem key={outlet._id}>
                      <a href={"/outlets/" + outlet._id}>
                        <strong>
                          {outlet.name}
                        </strong>
                      </a>
                      <DeleteBtn onClick={() => this.deleteOutlet(outlet._id)} />
                    </ListItem>
                  );
                })}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Outlets;
