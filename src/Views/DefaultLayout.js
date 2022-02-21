import React, { Component, Suspense } from 'react';
import { Switch } from 'react-router-dom';
import Header from "../Views/Header/Header"
class DefaultLayout extends Component {
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
  render() {
    return (
      <div className="app">
        <div>
          <Suspense fallback={this.loading()}>
            <Header />
          </Suspense>
        </div>
      </div>
    );
  }
}

export default DefaultLayout;
