import React from 'react';
import {Link} from 'react-router-dom';
const Home = ()=>{
    return (
    <div className="container">
        <div className="row">
            <div className="col-md-6">    
                <div className="jumbotron">
                    <h1 className="display-4">New Customer</h1>
                    <p className="lead">To deliver your packages, first you need to register and after registration, the pick-up man will come to you and collect the packages</p>
                    
                    <p className="lead">
                      <Link className="btn btn-primary btn-lg" to="/customer-register" role="button"> Register</Link>
                    </p>
                </div>
            </div>
            <div className="col-md-6">    
                <div className="jumbotron">
                    <h1 className="display-4">Registered Customer</h1>
                    <p className="lead">To deliever your packages, just send notification to pick-up man by entering your phone number</p>
                    <hr className="my-4"/>
                     <p className="lead">
                      <a className="btn btn-primary btn-lg" href="/order-request" role="button">Assign Pick up</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
    );
}
export default Home;