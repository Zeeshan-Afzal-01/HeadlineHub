import React, { Component } from 'react';
import { Link } from "react-router-dom";

import './Navbar.css'

export default class Navbar extends Component {
  state = {
    query: ''
  }

  searchItems = (event) => {
    this.props.onSearch(this.state.query);
  }

  handleInputChange = (event) => {
    this.setState({ query: event.target.value });
  }

  render() {
    return (
      <nav className="navbar Navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="#">HeadlineHub</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/HeadlineHub">Home <span className="sr-only">(current)</span></Link>
            </li>

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href='#' id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Categories
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="/HeadlineHub/entertainment">Entertainment</Link>
                <Link className="dropdown-item" to="/HeadlineHub/business">Business</Link>
                <Link className="dropdown-item" to="/HeadlineHub/health">Health</Link>
                <Link className="dropdown-item" to="/HeadlineHub/technology">Technology</Link>
                <Link className="dropdown-item" to="/HeadlineHub/sports">Sports</Link>

                <div className="dropdown-divider"></div>
                <Link className={`dropdown-item"  to="/HeadlineHub/${this.query}`}></Link>
              </div>
            </li>
          </ul>
        </div>
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="search"
            onChange={this.handleInputChange}
            placeholder="Search"
            aria-label="Search"
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            onClick={this.searchItems}
            type="submit"
          >
            Search
          </button>
        </form>
      </nav>
    )
  }
}
