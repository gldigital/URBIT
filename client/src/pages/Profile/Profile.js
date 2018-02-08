import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import topicAPI from "../../utils/topicAPI";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

class Outlets extends Component {
  // Setting our component's initial state
  state = {
    outlets: [],
    topics: [],
    name: "",
    topic: ""
  };

  // When the component mounts, load all outlets and save them to this.state.outlets
  componentDidMount() {
    this.loadOutlets();
    this.loadTopics();
  }

  // Loads all outlets  and sets them to this.state.outlets
  loadOutlets = () => {
    API.getOutlets()
      .then(res =>
        this.setState({ outlets: res.data, name: ""})
      )
      .catch(err => console.log(err));
  };

   // Loads all Topics  and sets them to this.state.Topics
   loadTopics = () => {
    topicAPI.getTopics()
      .then(res =>
        this.setState({ topics: res.data, topic: ""})
      )
      .catch(err => console.log(err));
  };

  // Deletes a outlet from the database with a given id, then reloads outlets from the db
  deleteOutlet = id => {
    API.deleteOutlet(id)
      .then(res => this.loadOutlets())
      .catch(err => console.log(err));
  };

   // Deletes a topic from the database with a given id, then reloads topics from the db
   deleteTopic = id => {
    topicAPI.deleteTopic(id)
      .then(res => this.loadTopics())
      .catch(err => console.log(err));
  };

  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, use the API.savetopic method to save the outlet data
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

  // When the form is submitted, use the topicAPI.saveTopic method to save the topic data
  // Then reload outlets from the database
  handleFormSubmitTopic = event => {
    event.preventDefault();
    if (this.state.topic) {
      topicAPI.saveTopic({
        topic: this.state.topic
      })
        .then(res => this.loadTopics())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <div className="userProfile">
          <Row>
            <Container>
              <Col size="md-3 sm-3"></Col>
              <Col size="md-9 sm-9">
                  <Col size="md-2 sm-2 xs-2">
                    <p><i class="far fa-user"></i></p>
                  </Col>
                  <Col size="md-10 sm-10">
                      <div className="userInfo">
                        <p><strong>Name:</strong><span> Greg Ladden</span> </p>
                        <p><strong>Email:</strong><span> greg@gmail.com</span> </p>
                      </div>
                  </Col>
              </Col>
            </Container>
          </Row>
        </div>
        {/* choose news outlets */}
          <Row>
            <Container>
              <Col size="md-3 sm-3"></Col>
              <Col size="md-9 sm-9">
                <Col size="md-12 sm-12 xs-12">
                  <h3>Choose News Outlets</h3>
                </Col>
                  <form>
                    <Col size="md-9 sm-9 xs-10">
                      <Input
                        value={this.state.name}
                        onChange={this.handleInputChange}
                        name="name"
                        placeholder="Must be the exact URL ( i.e. cnbc.com , ccn.com ) "
                      />
                    </Col>
                    <Col size="md-3 sm-3 xs-2">
                      <FormBtn
                        disabled={!(this.state.name)}
                        onClick={this.handleFormSubmit}
                      >
                        Submit Oulet
                      </FormBtn>
                    </Col>
                </form>
              
                <Col size="md-12 sm-12 xs-12">
                  <hr/>
                  {this.state.outlets.length ? (
                    <List>
                      {this.state.outlets.map(outlet => {
                        return (
                          <ListItem key={outlet._id}>
                            <DeleteBtn onClick={() => this.deleteOutlet(outlet._id)} />
                            <a href={"/outlets/" + outlet._id}>
                              <strong>
                                {outlet.name}
                              </strong>
                            </a>
                          </ListItem>
                        );
                      })}
                    </List>
                  ) : (
                    <p>No Results to Display</p>
                  )}
                  <hr/>
                </Col>
              </Col>
            </Container>
          </Row>
          {/* choose news topics */}
          <Row>
            <Container>
              <Col size="md-3 sm-3"></Col>
              <Col size="md-9 sm-9">
                <Col size="md-12 sm-12 xs-12">
                  <h3>Choose News Topics</h3>
                </Col>
                  <form>
                    <Col size="md-9 sm-9 xs-10">
                      <Input
                        value={this.state.topic}
                        onChange={this.handleInputChange}
                        name="topic"
                        placeholder="Basketball, Bitcoin, etc."
                      />
                    </Col>
                    <Col size="md-3 sm-3 xs-2">
                      <FormBtn
                        disabled={!(this.state.topic)}
                        onClick={this.handleFormSubmitTopic}
                      >
                        Submit Topic
                      </FormBtn>
                    </Col>
                </form>
              
                <Col size="md-12 sm-12 xs-12">
                  <hr/>
                  {this.state.topics.length ? (
                    <List>
                      {this.state.topics.map(topic => {
                        return (
                          <ListItem key={topic._id}>
                            <DeleteBtn onClick={() => this.deleteTopic(topic._id)} />
                            <a href={"/topics/" + topic._id}>
                              <strong>
                                {topic.topic}
                              </strong>
                            </a>
                          </ListItem>
                        );
                      })}
                    </List>
                  ) : (
                    <p>No Results to Display</p>
                  )}
                  <hr/>
                </Col>
              </Col>
            </Container>
          </Row>
          
          <br/>
          <br/>
          <br/>
          <br/>
      </Container>
      );
    }
  }

export default Outlets;
