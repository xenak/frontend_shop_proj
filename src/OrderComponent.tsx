import * as React from "react";
import {ReactNode} from "react";
import dataService, {ShopItem} from "./DataService";
import "./home.scss";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link, RouteComponentProps, withRouter} from "react-router-dom";
import {renderRoutes, RouteConfig} from "react-router-config";

interface OrderState {

    cartItems: ShopItem[];
    name: string;
    address: string

}

export class OrderComponent extends React.Component<{}, OrderState> {


    constructor(props: Readonly<{}>) {
        super(props);


        dataService.getCart().then(value => {
            this.setState({
                cartItems: value
            });
        })
    }

    render(): React.ReactNode {
        return (
            <div>
                {this.state.cartItems.map(item => (<div key={item.id}>{item.title}</div>))}
                            </div>
                    );
    }
    }