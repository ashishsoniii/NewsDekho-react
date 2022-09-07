// import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import NewsComponent from './components/NewsComponent';
import LoadingBar from 'react-top-loading-bar';

import {
  // BrowserRouter, //react contexts hook!
  Routes,
  Route,
  //   Link
} from "react-router-dom";





// Class based components!
export default class App extends Component {

  state = {
    progress: 0
  }
  setProgress = (progress) => {
    this.setState({ progress: progress });
  }
  pageSize = 7;
  // apikey ="3d59be3f84fa41fcaa8797a8b2c10e85";
  // apikey = "6b78a6e95a964aa8b3aceea48a84d044";
  apikey = "4b67c54ecb1f4ed08cfc913ac0a8a12f";
  // apikey = process.env.REACT_APP_NEWS_API;



  render() {
    return (
      <div>
        <Navbar />
        <LoadingBar
          color='#f11946'
          progress={this.state.progress}
        // onLoaderFinished={() => setProgress(0)}
        />
        <Routes>
          <Route path='/' element={<NewsComponent setProgress={this.setProgress} apikey={this.apikey} key="general " pageSize={this.pageSize} country="in" category="general" />} />

          <Route exact path="/business" element={<NewsComponent setProgress={this.setProgress} apikey={this.apikey} key=" business" pageSize={this.pageSize} country="in" category="business" />}    >Business</Route>
          <Route exact path="/entertainment" element={<NewsComponent setProgress={this.setProgress} apikey={this.apikey} key=" entertainment" pageSize={this.pageSize} country="in" category="entertainment" />}          >Entertainment</Route>
          <Route exact path="/general" element={<NewsComponent setProgress={this.setProgress} apikey={this.apikey} key="general " pageSize={this.pageSize} country="in" category="general" />}    >General</Route>
          <Route exact path="/health" element={<NewsComponent setProgress={this.setProgress} apikey={this.apikey} key="health " pageSize={this.pageSize} country="in" category="health" />}  >Health</Route>
          <Route exact path="/science" element={<NewsComponent setProgress={this.setProgress} apikey={this.apikey} key="science " pageSize={this.pageSize} country="in" category="science" />}    >Science</Route>
          <Route exact path="/sports" element={<NewsComponent setProgress={this.setProgress} apikey={this.apikey} key="sports " pageSize={this.pageSize} country="in" category="sports" />}  >Sports</Route>
          <Route exact path="/technology" element={<NewsComponent setProgress={this.setProgress} apikey={this.apikey} key="technology " pageSize={this.pageSize} country="in" category="technology" />}      >Technology</Route>



          {/* <NewsComponent key =" " pageSize = {5} country = "in" category ="sports" /> */}
        </Routes>
      </div>
    )
  }
}
