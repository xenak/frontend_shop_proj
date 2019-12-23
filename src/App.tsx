import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import dataService from "./DataService";
import Home from "./HomeComponent";
import {CartComponent} from "./CartComponent";
import {OrderComponent} from "./OrderComponent";
import Main from "./MainComponent";
import {renderRoutes} from "react-router-config";

const routes = [
    {
        path: "/home",
        render: (params: any) => {
            return true ? (
                <Home {...params}/>
            ) : (
                <Redirect
                    to={{
                        pathname: "/home",
                        state: {from: params.location}
                    }}
                />
            );
        },
        // component: Home,
        routes: [{
            path: "/home/main",
            component: Main
        }, {
            path: "/home/cart",
            component: CartComponent
        }, {
            path: "/home/order",
            component: OrderComponent
        }]
    },
    {
        path: "/",
        render: ({location}: { location: any }) => {
            return (
                <Redirect
                    to={{
                        pathname: "/home"
                    }}
                />)
        }
    }
];

export default function AuthExample() {
    return (
        <Router>
            <div>
                {renderRoutes(routes)}
            </div>
        </Router>
    );
}