import * as React from "react";
import dataService, {ShopItem} from "./DataService";
import "./home.scss";
import {Link, RouteComponentProps} from "react-router-dom";
import Alert from "react-bootstrap/Alert"
import Form from "react-bootstrap/Form"

interface OrderState {

    firstName: string;
    lastName: string;
    address: string;
    phone: string;
    total: number;
    email: string;
    cartitems: [];
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
            email: "",
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

    changeEmail(newemail: string) {
        this.setState({
            email: newemail
        });
    }

    private async onItemRemove(id: number) {
        await dataService.deleteItem(id);
        this.setState({
            item: this.state.item.filter((item) => item.id !== id)
        });
    }

    deleteAll(): void {

        for (let i = 1; i < 100; i++) {
            this.onItemRemove(i)
        }
        }

    private async onNewOrderHandle() {
        const {} = await dataService.commit(this.state.firstName, this.state.lastName, this.state.address, this.state.phone, this.state.total, this.state.email, this.state.item);
    }

    render(): React.ReactNode {

        const { item } = this.state
        const total = item.reduce(function(prev, cur) {
            return prev + cur.price
        }, 0);


        const state = (this.state.phone.length >= 10 && this.state.firstName.length > 1 && this.state.lastName.length > 1 && this.state.address.length > 5 && this.state.email.length > 6)
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
            <div className="App">
                <Form>
                    <Form.Label> Имя </Form.Label>
                        <input type="text" onChange={event => this.changeFName(event.target.value)}
                                    className="form-control"
                                    placeholder="Имя"
                                    required={true}/>

                    <Form.Label> Фамилия </Form.Label>
                        <input type="text" onChange={event => this.changeLName(event.target.value)}
                                        className="form-control"
                                        placeholder="Фамилия"
                                        required={true}/>
                    <Form.Label> Адрес </Form.Label>
                        <input onChange={event => this.changeAddress(event.target.value)}
                                      className="form-control"
                                      placeholder="Адрес"
                                      required={true}/>

                    <Form.Label> Номер телефона </Form.Label>
                        <input onChange={event => this.changePhone(event.target.value)}
                                               className="form-control"
                                               placeholder="+79995558877"
                                               inputMode={"tel"}
                                               type="number"
                                               required={true}/>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>


                    <Form.Label> Почтовый адрес </Form.Label>
                    <input onChange={event => this.changeEmail(event.target.value)}
                           className="form-control"
                           placeholder="my@email.com"
                           required={true}/>
                </Form>

                       <div>
                           Итого: {total}
                       </div>


                {button}
            </div>

        );
    }
}