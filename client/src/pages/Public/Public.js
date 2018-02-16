import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import { Col, Row, Container } from "../../components/Grid";
import { Table } from "../../components/Table";
import { ArticleTable } from "../../components/NewsArticle";
import API from "../../utils/newsAPI";
import cryptoAPI from "../../utils/binanceAPI";
import "./Public.css";
import axios from "axios";

class Public extends Component {
  state = {
    articles: [],
    favoriteArticles: [],
    newsTopics: [],
    coins: []
  };


 componentDidMount() {
  this.newsArticles();
  this.favoriteNewsArticles();
  this.newsTopics();
  // this.cryptoPairs();
}

newsArticles = query => {
  API.news()
    .then(res => {
    //  console.log(response.data.articles, "favoriteNewsArticles did this work");
     this.setState({ articles: res.data.articles })
    })
    .catch(err => console.log(err));
};

favoriteNewsArticles = query => {
  axios.get("/api/outlets/getoutlets")
  .then( response => {
    // console.log(data.data, "This is data");
    var outletNameString = "";

    for (let i =0; i < response.data.length; i++){
      // console.log(data.data[i], "this is data again");
      var commaString = response.data[i].name + ",";
      outletNameString += commaString;
      // console.log(outletNameString, "commastring");
    }

    var cleanOutletNameString = outletNameString.substring(0, outletNameString.length - 1);

    return axios.get('https://newsapi.org/v2/everything?q=cryptocurrency&domains=' + cleanOutletNameString +'&' +
    'apiKey=b20d4f18b29a4098b58c9c3a9a21cbfd')
    .then(response => {
      this.setState({ favoriteArticles: response.data.articles })
    })
  })
};

newsTopics = query => {

  axios.get("/api/topics")
  .then( response => {
    // console.log(data.data, "This is data");
    var outletNameString = "";

    for (let i =0; i < response.data.length; i++){
      // console.log(data.data[i], "this is data again");
      var commaString = response.data[i].topic + ",";
      outletNameString += commaString;
      // console.log(outletNameString, "commastring");
    }

    var cleanOutletNameString = outletNameString.substring(0, outletNameString.length - 1);
    console.log(cleanOutletNameString, "we found them");

    return axios.get('https://newsapi.org/v2/everything?q=' + cleanOutletNameString +'&' + 'language=en&' +
    'apiKey=b20d4f18b29a4098b58c9c3a9a21cbfd')
    .then(response => {
      // console.log(response,"this is our newsAPI response@@@@")
      this.setState({ newsTopics: response.data.articles })
    })
  })
};

// cryptoPairs = query => {
//   cryptoAPI.allPairs()
//     .then(response => {
//      console.log(response.data, "cryptoData did this work");
//      this.setState({ coins: response.data })
//     })
//     .catch(err => console.log(err));
// };
  render() {
    
    return (
    
      <Container fluid >
        <Jumbotron className="heroHome" > 
          <h1 className="text-center" data-aos="fade-down"> Track Your Crypto</h1>
          <p className="text-center" data-aos="fade-down"> Stay up to date with the latest news, prices, and all the drama.</p>
          <div className="heroIcon" data-aos="zoom-out-up">
            <img className="heroArrow center-block" src="https://cdn1.iconfinder.com/data/icons/utility-icons/50/Down-512.png" alt="arrow down" />
          </div>
        </Jumbotron>
        <Container>
          <Row>
            <Col size="md-2 sm-2 xs-2">
              <p className="text-right"><i class="fas fa-chart-line"></i></p>
            </Col>
            <Col size="md-6">
              <h2>Track Real Time Rates</h2>
              <p>It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </Col>
            <Col size="md-4"></Col>
          </Row>
          <Row>
            <Col size="md-2 sm-2 xs-2">
              <p className="text-right"><i class="far fa-newspaper"></i></p>
            </Col>
            <Col size="md-6">
              <h2>Follow the Latest News</h2>
              <p>It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </Col>
            <Col size="md-4"></Col>
          </Row>
          <Row>
            <Col size="md-2 sm-2 xs-2">
              <p className="text-right"><i class="fas fa-universal-access"></i></p>
            </Col>
            <Col size="md-6">
              <h2>Customize Your News Feed</h2>
              <p>It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </Col>
            <Col size="md-4"></Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <br/>
            <br/>
            <br/>
            <hr/>
              <Table
                cryptoData= {this.state.coins}
              />
            <hr/>
            <br/>
            <br/>
            <br/>
          </Row>
        </Container>
        <Container>
          <Row>
            <br/>
            <br/>
            <br/>
            <hr />
            <h1 className="text-center">Latest Cryptocurrency News Articles</h1>
            <hr />
            <ArticleTable 
             articles= {this.state.articles}
             favoriteArticles= {this.state.favoriteArticles}
             newsTopics= {this.state.newsTopics}
            />
            <br/>
            <br/>
          </Row>
        </Container>
      </Container>
    );
  }
}

export default Public;
