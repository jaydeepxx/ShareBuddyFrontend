import React,{Component} from 'react'
import Home from '../pages/home'
import View from '../pages/view'
import {Router,Route, Switch} from 'react-router-dom'

import {history} from "../history";
import TopBar from '../components/top-bar'
import LoginForm from '../components/login'
class Layout extends Component{


    constructor(props){
        super(props);

        this.state = {

            showLoginForm: false

        }
    }

    render(){

        const {showLoginForm} = this.state;

        return (
          <div className={"app-layout"}>
            <TopBar
              onShowLoginForm={() => {
                this.setState({
                  showLoginForm: true,
                });
              }}
            />
            {showLoginForm ? (
              <LoginForm
                onClose={() => {
                  this.setState({
                    showLoginForm: false,
                  });
                }}
              />
            ) : null}

            <Router history={history}>
              <Switch>
                <Route exact path={"/"} component={Home} />
                <Route exact path={"/share/:id"} component={View} />
              </Switch>
            </Router>
            <div className="site-slogan flex text-center text-sm mt-5 pl-5 pr-5">
              Note: First File Sharing Time Will Be Little Longer Because
              Backend Is Deployed On Free Version Of Render.Com Which Takes Time
              To Response To Very First Post Request
            </div>
          </div>
        );
    }
}

export default Layout;