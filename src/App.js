import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export class App extends Component {
  state={
    SearchItems:'' 
  }
  handleSearch = (query)=>{
    this.setState({SearchItems:query})
  }

  render() {
    return (
      <>
        <Router>
          <Navbar onSearch={this.handleSearch}/>
          <Routes>
            <Route
              path={`/HeadlineHub/${this.state.SearchItems}`}
              element={<News category="general" pageSize={8} search={this.state.SearchItems}/>}
            />
            <Route
              path="/HeadlineHub/business"
              element={<News category="business" pageSize={8} search={this.state.SearchItems}/>}
            />
            <Route
              path="/HeadlineHub/sports"
              element={<News category="sports" pageSize={8} search={this.state.SearchItems}/>}
            />
            <Route
              path="/HeadlineHub/technology"
              element={<News category="technology" pageSize={8} search={this.state.SearchItems}/>}
            />
            <Route
              path="/HeadlineHub/health"
              element={<News category="health" pageSize={8} search={this.state.SearchItems}/>}
            />
            <Route
              path="/HeadlineHub/entertainment"
              element={<News category="entertainment" pageSize={8} search={this.state.SearchItems}/>}
            />
          </Routes>
        </Router>
      </>
    );
  }
}

export default App;

