import {BrowserRouter as Router, Route, Link, Switch, History} from 'react-router-dom';
import ReactDOM from 'react-dom';
import React from 'react';
import $ from 'jquery';

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
    this.state = {
      username: null, // indicates the user is not logged in 
      isOwner: null
    };
    this.getLoginStatus = this.getLoginStatus.bind(this);
  }

  componentDidMount() {
    this.getLoginStatus();
  }

  getLoginStatus() {
    
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

ReactDOM.render(<App />, document.getElementById('app'));