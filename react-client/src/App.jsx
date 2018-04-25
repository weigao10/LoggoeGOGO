import {BrowserRouter as Router, Route, Link, Switch, History} from 'react-router-dom';
import ReactDOM from 'react-dom';
import React from 'react';
import $ from 'jquery';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import RegistrationPage from './components/RegistrationPageView.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import StudentHomepage from './components/StudentHomepageView.jsx';
import OwnerHomepage from './components/OwnerHomepageView.jsx';
import StudentVideo from './components/StudentVideoView.jsx';
import LandingPage from './components/LandingPageView.jsx';
import OwnerVideo from './components/OwnerVideoView.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <MuiThemeProvider>
        <Router>
          <Switch>
            <LandingPage exact path="/" component={LandingPage}/>
            <RegistrationPage exact path="/registration" component={RegistrationPage}/>
            <StudentHomepage exact path="/student" component={StudentHomepage}/>
            <StudentVideo exact path="/student/video" component={StudentVideo}/>
            <OwnerHomepage exact path="/owner" component={OwnerHomepage}/>
            <OwnerVideo exact path="/owner/video" component={OwnerVideo}/>
          </Switch>
        </Router>
      </MuiThemeProvider>
    )
  }
}

export default DragDropContext(HTML5Backend)(App);