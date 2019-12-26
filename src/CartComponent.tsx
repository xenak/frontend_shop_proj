import React from "react";
import dataService, {ShopItem} from "./DataService";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Navbar from "react-bootstrap/Navbar";
import "./home.scss";
import {Link, RouteComponentProps, withRouter} from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table'


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
        const { cartItems } = this.state;
        const enabled =
            cartItems.length > 0;
        const msgTotal = cartItems.reduce(function(prev, cur) {
            return prev + cur.price
        }, 0);

        return (
            <div>
                <Alert variant={'info'} show={!enabled}>
                    Корзина пуста.
                </Alert>

                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Название товара</th>
                        <th>Количество</th>
                        <th>Стоимость</th>
                        <th> </th>
                    </tr>
                    </thead>
                    {this.state.cartItems.map(ShopItem => {
                        return (
                            <tbody>
                            <tr>
                                <td>{ShopItem.title}</td>
                                <td>1</td>
                                <td>{ShopItem.price}</td>
                                <td>
                                    <button className="btn btn-outline-secondary" type="button"
                                            onClick={() => {
                                                this.onItemRemove(ShopItem.id)
                                            }}
                                    >Удалить
                                    </button>

                                </td>
                            </tr>
                            </tbody>
                        )
                    })}
                </Table>


                <div>Итоговая сумма: {msgTotal}</div>
                <Link to="/home/order">
                    <Button variant="outline-danger" disabled={!enabled}>
                        Заказать
                    </Button>
                </Link>
            </div>

        );
    }
}