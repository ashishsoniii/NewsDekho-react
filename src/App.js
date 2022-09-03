// import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import NewsComponent from './components/NewsComponent';

import {
  // BrowserRouter, //react contexts hook!
  Routes,
  Route,
  //   Link
} from "react-router-dom";

// Class based components!
export default class App extends Component {
  pageSize=12;
  render() {
    return (
      <div>
        <Navbar />
        <Routes>
          <Route path='/' element={<NewsComponent key="general " pageSize={this.pageSize} country="in" category="general" />} />

          <Route exact path="/business" element={<NewsComponent key=" business" pageSize={this.pageSize} country="in" category="business" />}    >Business</Route>
          <Route exact path="/entertainment" element={<NewsComponent key=" entertainment" pageSize={this.pageSize} country="in" category="entertainment" />}          >Entertainment</Route>
          <Route exact path="/general" element={<NewsComponent key="general " pageSize={this.pageSize} country="in" category="general" />}    >General</Route>
          <Route exact path="/health" element={<NewsComponent key="health " pageSize={this.pageSize} country="in" category="health" />}  >Health</Route>
          <Route exact path="/science" element={<NewsComponent key="science " pageSize={this.pageSize} country="in" category="science" />}    >Science</Route>
          <Route exact path="/sports" element={<NewsComponent key="sports " pageSize={this.pageSize} country="in" category="sports" />}  >Sports</Route>
          <Route exact path="/technology" element={<NewsComponent key="technology " pageSize={this.pageSize} country="in" category="technology" />}      >Technology</Route>



          {/* <NewsComponent key =" " pageSize = {5} country = "in" category ="sports" /> */}
        </Routes>
      </div>
    )
  }
}
