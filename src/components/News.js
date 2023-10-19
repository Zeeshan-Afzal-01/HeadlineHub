import React, { Component } from "react";
import Newsitems from "./Newsitems";
import "./News.css";
import Spinner from './spinner';
import PropTypes from 'prop-types';

export default class News extends Component {
  static defaultProps = {
    pageSize: 8,
    category: 'general',
    search: 'worldcup'
  };

  static propTypes = {
    pageSize: PropTypes.number,
    category: PropTypes.string,
    search: PropTypes.string,
  };

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0, 
    };
  }

  async fetchNews(category, page) {
    const url = `https://newsapi.org/v2/top-headlines?q=${this.props.search}&country=us&category=${category}&apiKey=93a0d4c2c9484b0db228d5286596996c&page=${page}&pageSize=${this.props.pageSize}`;

    try {
      this.setState({ loading: true });
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const parsedData = await response.json();
      console.log(parsedData);

      this.setState({
        articles: [...this.state.articles, ...parsedData.articles], // Concatenate new articles with existing ones
        totalResults: parsedData.totalResults,
        loading: false
      });
    } catch (error) {
      console.error("API request failed", error);
      this.setState({ loading: false });
    }
  }

  componentDidMount() {
    this.fetchNews(this.props.category, this.state.page);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.category !== this.props.category) {
      this.setState({ articles: [], page: 1 });
      this.fetchNews(this.props.category, this.state.page);
    }
  }

  handlePrevious = () => {
    this.fetchNews(this.props.category, this.state.page - 1);
    this.setState((prevState) => ({ page: prevState.page - 1 }));
  };

  handleNext = () => {
    this.fetchNews(this.props.category, this.state.page + 1);
    this.setState((prevState) => ({ page: prevState.page + 1 }));
  };

  handleScroll = () => {
    const { loading, articles, totalResults, page } = this.state;
    if (!loading && articles.length < totalResults) {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollY + windowHeight >= documentHeight - 200) {
        this.handleNext(); 
      }
    }
  };

  componentDidMount() {
    this.fetchNews(this.props.category, this.state.page);
    window.addEventListener("scroll", this.handleScroll); 
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll); 
  }

  render() {
    const { category } = this.props;

    return (
      <>
        <div className="container d-flex justify-content-center mt-2">
          <h2>HeadlineHub - {category === "general" ? "Top" : category.charAt(0).toUpperCase() + category.slice(1)} Headlines</h2>
        </div>
        {this.state.loading && <Spinner />}
        <div className="containers">
          {this.state.articles.map((element, index) => (
            <div key={element.title}>
              <Newsitems
                title={element.title ? element.title : ""}
                description={element.description ? element.description : ""}
                urlToImage={
                  element.urlToImage
                    ? element.urlToImage
                    : "https://i.pinimg.com/736x/fc/b2/2a/fcb22a107a2b56cf2aae4e1a1ec26348.jpg"
                }
                url={element.url}
              />
            </div>
          ))}
        </div>
        <div className="credits">
    
          Designed by <a href="https://github.com/Zeeshan-Afzal-01">Zeeshan Afzal</a>
  </div>
       
      </>
    );
  }
}
