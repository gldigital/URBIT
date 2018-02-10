import React from "react";
import "./Table.css";
import Article from "../Article/Article";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { Tabs, Tab } from 'react-bootstrap';
import Outlets from "../../pages/Profile";
import API from "../../utils/API";
import topicAPI from "../../utils/topicAPI";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import DeleteBtn from "../../components/DeleteBtn";

export class ArticleTable extends React.Component {

	constructor(props) {
      super(props);
      this.state = {
        key: 1,
        outlets: [],
        topics: []
      };
    }

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

    handleTabChange = (key) => {
      this.setState({ key });
    }

  render() {
    return (
        <Tabs activeKey={ this.state.key } onSelect={ this.handleTabChange } animation>
          <Tab eventKey={ 1 } title='Trending'>
            {this.props.articles.map((article) => {
              return (
              <Article 
                key={article.url}
                src={article.urlToImage}
                title={article.title}
                url={article.url}
                description={article.description}  
              />
              )
            })}
          </Tab>
          <Tab eventKey={ 2 } title='Favorite Outlets'>
            &nbsp;
            <p>News Outlets: {this.state.outlets.map(outlet => {
              return (
                <strong>
                  {outlet.name}
                  &nbsp; | &nbsp;
                </strong>
              );
              })}
              <a href="/profile" data-toggle="tooltip" title="Edit News Outlets"><span><i className="far fa-edit editButton"></i></span></a>
            </p>;
            {this.props.favoriteArticles.map((article) => {
              return (
              <Article 
                key={article.url}
                src={article.urlToImage}
                title={article.title}
                url={article.url}
                description={article.description}  
              />
              )
            })}
          </Tab>
          <Tab eventKey={ 3 } title='News Topics'>
            &nbsp;
            <p>Current Topics: {this.state.topics.map(topic => {
              return (
                <strong>
                  {topic.topic}
                  &nbsp; | &nbsp;
                </strong>
              );
              })}
              <a href="/profile" data-toggle="tooltip" title="Edit News Topics"><span><i className="far fa-edit editButton"></i></span></a>
            </p>;
            {this.props.newsTopics.map((article) => {
              return (
              <Article 
                key={article.url}
                src={article.urlToImage}
                title={article.title}
                url={article.url}
                description={article.description}  
              />
              )
            })}
          </Tab>
        </Tabs>
    );
  }
}
