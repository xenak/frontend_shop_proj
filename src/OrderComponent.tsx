import * as React from "react";
import dataService, {ShopItem} from "./DataService";
import "./home.scss";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link, RouteComponentProps, withRouter} from "react-router-dom";
import Alert from "react-bootstrap/Alert"


interface OrderState {

    firstName: string;
    lastName: string;
    address: string;
    phone: string;
    total: number;
    cartitems: []
    item: ShopItem[];

}


export interface OrderComponentProps extends RouteComponentProps {}

export class OrderComponent extends React.Component<OrderComponentProps, OrderState> {


    constructor(props: Readonly<OrderComponentProps>) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            address: "",
            phone: "",
            total: 0,
            item: [],
            cartitems: []
        };

        dataService.getCart().then(value => {
            this.setState({
                item: value,
                total: value.reduce(function(prev, cur) {
                    return prev + cur.price
                }, 0)
            });
        })

    }


    thisItems() {
        const item = [] as any
        return item
    }



    changeFName(newfname: string) {
        this.setState({
            firstName: newfname
        });
    }

    changeLName(newlname: string) {
        this.setState({
            lastName: newlname
        });
    }
    changeAddress(newadd: string) {
        this.setState({
            address: newadd
        });
    }
    changePhone(newphone: string) {
        this.setState({
            phone: newphone
        });
    }

    private async onItemRemove(id: number) {
        await dataService.deleteItem(id);
        this.setState({
            item: this.state.item.filter((item) => item.id !== id)
        });
    }

    deleteAll(): void {

        for (let i = 1; i < 20; i++) {
            this.onItemRemove(i)
        }
        }

    private async onNewOrderHandle() {
        const {} = await dataService.commit(this.state.firstName, this.state.lastName, this.state.address, this.state.phone, this.state.total, this.state.item);
    }

    render(): React.ReactNode {

        const { item } = this.state
        const total = item.reduce(function(prev, cur) {
            return prev + cur.price
        }, 0);


        const state = (this.state.phone.length === 10 && this.state.firstName.length > 1 && this.state.lastName.length > 1 && this.state.address.length > 10)
        let button;

        if (state) {
            button = <Link to="/home/main">
                <button className="btn btn-outline-secondary" type="button"
                        onClick={() => {
                            this.onNewOrderHandle(); this.deleteAll()}}
                >Оформить заказ
                </button>
            </Link>
        }
        else {
            button =

                <Alert variant={'danger'}>
                Пожалуйста, заполните все поля.
            </Alert>
        }
        return (
            <div className="input-group mb-3">
                <div className="input-group mb-3">
                    <div>
                    Имя: <input type="text" onChange={event => this.changeFName(event.target.value)}
                           className="form-control"
                            placeholder="Имя"
                                        required={true}/>

                    </div>
                    <div>
                        Фамилия: <input type="text" onChange={event => this.changeLName(event.target.value)}
                       className="form-control"
                       placeholder="Фамилия"
                       required={true}/>
                    </div>
                </div>
                <div className="input-group mb-3">
                    Адрес: <input onChange={event => this.changeAddress(event.target.value)}
                       className="form-control"
                       placeholder="Адрес"
                       required={true}/>
                       </div>
                <div className="input-group mb-3">
                        Номер телефона: <input onChange={event => this.changePhone(event.target.value)}
                       className="form-control"
                       placeholder="Номер телефона"
                       inputMode={"tel"}
                       required={true}/>

                       <div>
                           Итого: {total}
                       </div>

                       </div>
                {button}
            </div>
        );
    }
}