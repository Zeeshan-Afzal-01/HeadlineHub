import React, { Component } from "react";
import "./News.css";
import './Newsitems.css'
export default class Newsitems extends Component {

  render() {
    let { title, description,url,urlToImage} = this.props;
    return (
      <div>
        <div className="card cards adj mx-3  my-3 ">
          <img
            className="card-img-top"
            src={urlToImage}
           alt=" "
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <a target='_blank' rel="noreferrer" href={url} className="btn btn-primary">
              Readmore
            </a>
          </div>
        </div>
      </div>
    );
  }
}
