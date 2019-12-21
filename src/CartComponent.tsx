import React from "react";
import dataService, {ShopItem} from "./DataService";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./home.scss";
import {Link, RouteComponentProps, withRouter} from "react-router-dom";


interface CartState {

    cartItems: ShopItem[];

}

export class CartComponent extends React.Component<{}, CartState> {

    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            cartItems: []
        };

        dataService.getCart().then(value => {
            this.setState({
                cartItems: value
            });
        })

    }


    private async onItemRemove(id: number) {
        await dataService.deleteItem(id);
            this.setState({
                cartItems: this.state.cartItems.filter((item) => item.id !== id)
            });
        }



    render(): React.ReactNode {
        return (
            <div>
                <div className="container">
                    <div id="items-container">
                        {this.state.cartItems.map(ShopItem => {
                            return(
                                <div className="card" key={ShopItem.id}>
                                    <div className="d-flex p-2 bd-highlight justify-content-between">
                                        <h5 className="mb-1">{ShopItem.title}</h5>
                                        <h5 className="mb-1">{ShopItem.price}</h5>

                                        <button className="btn btn-outline-secondary" type="button"
                                                onClick={() => {
                                                    this.onItemRemove(ShopItem.id)
                                                }}
                                        >Delete
                                        </button>
                                    </div>

                                </div>
                        )
                        })}

                    </div>
                </div>
                <Link to="/home/cart/order">
                    <Button variant="outline-danger">
                        Order
                    </Button>
                </Link>
            </div>

        );
    }
}