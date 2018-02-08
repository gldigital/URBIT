import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { Input, TextArea, FormBtn } from "../../components/Form";
import { List, ListItem } from "../../components/List";
import DeleteBtn from "../../components/DeleteBtn";
import "./Profile.css";
import API from  "../../utils/newsAPI"

class Profile extends Component {
  state = {
    newsOutlet: [],
    title: "",
    user: ""
  };

 loadNewsOutlet = () => {
    API.news()
      .then(res =>
        this.setState({ newsOutlet: res.data, title: ""})
      )
      .catch(err => console.log(err));
  };

 handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log("this is the state", this.state);
    if (this.state.title) {
      API.saveOutlet({
        name: this.state.title
      }).then((res) => {
          console.log("got this back from the backend", res);
           this.loadNewsOutlet()
        })
        // .catch(err => console.log(err));
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
                        value={this.state.title}
                        onChange={this.handleInputChange}
                        name="title"
                        placeholder="Title (required)"
                    />
                  </Col>
                  <Col size="md-3 sm-3 xs-2">
                      <FormBtn onClick={this.handleFormSubmit}>
                              Submit Outlet
                      </FormBtn>
                  </Col>
                </form>
                {/* {this.state.newsOutlet.length ? (
                <List>
                  {this.state.newsOutlet.map(outlet => (
                    <ListItem key={outlet._id}>
                      <Link to={"/outlets/" + outlet._id}>
                        <strong>
                          {outlet.title}
                        </strong>
                      </Link>
                      <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <h3>No Results to Display</h3>
              )} */}
              <Col size="md-12 sm-12 xs-12">
                <hr/>
                  <ul className="list-inline">
                    <li><span className="glyphicon glyphicon-remove-sign"></span>CNBC.com</li>
                    <li><span className="glyphicon glyphicon-remove-sign"></span>CCN.com</li>
                    
                  </ul>
                <hr/>
              </Col>
            </Col>
            </Container>
        </Row>
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
                        value={this.state.title}
                        onChange={this.handleInputChange}
                        name="title"
                        placeholder="Title (required)"
                    />
                  </Col>
                  <Col size="md-3 sm-3 xs-2">
                      <FormBtn onClick={this.handleFormSubmit}>
                              Submit Topic
                      </FormBtn>
                  </Col>
                </form>
                {/* {this.state.newsOutlet.length ? (
                <List>
                  {this.state.newsOutlet.map(outlet => (
                    <ListItem key={outlet._id}>
                      <Link to={"/outlets/" + outlet._id}>
                        <strong>
                          {outlet.title}
                        </strong>
                      </Link>
                      <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <h3>No Results to Display</h3>
              )} */}
              <Col size="md-12 sm-12 xs-12">
                <hr/>
                  <ul className="list-inline">
                    <li><span className="glyphicon glyphicon-remove-sign"></span>NBA</li>
                    <li><span className="glyphicon glyphicon-remove-sign"></span>Bitcoin</li>
                    <li><span className="glyphicon glyphicon-remove-sign"></span>Ethereum</li>
                  </ul>
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

export default Profile;