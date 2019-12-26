import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import dataService, {ShopItem} from "./DataService";

interface ShopItemComponentProps {

    item: ShopItem;
    quantity: 1

}

export class ShopItemComponent extends React.Component<ShopItemComponentProps, any> {

    constructor(props: Readonly<ShopItemComponentProps>) {
        super(props);
        this.state = {
            quantity: 1
        }
    }

    changeQuantity(newquant: string) {
        this.setState({
            quantity: newquant
        });
    }

    private async onNewTodoHandle(list: number) {

        let id = this.props.item.id;
        let title = this.props.item.title;
        let image = this.props.item.image;
        let price = this.props.item.price;

        let cartItem = new ShopItem(id, title, image, price*this.state.quantity, this.state.quantity);

        await dataService.saveItem(cartItem)

        this.setState({
            item: [...this.state.item, cartItem]
        })
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

        return (
            <Card style={{width: '100%'}}>
                <div className="card-img-top"
                     style={{height: '200px', backgroundImage: 'url(' + this.props.item.image + ')', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat'}}></div>
                <Card.Body>
                    <Card.Title>{this.props.item.title}</Card.Title>
                    <Card.Text>
                        <div className="price">₽{this.props.item.price}</div>
                        Бесплатная упаковка на выбор: лента, крафт, дизайнерская упаковка.
                        Оттенок и размер бутона могут немного отличаться от представленного на фото.
                        Указанные цены действуют при оформлении онлайн-заказа на сайте.
                    </Card.Text>

                           <select onChange={event => this.changeQuantity(event.target.value)}>
                               <option>1</option>
                               <option>2</option>
                               <option>3</option>
                               <option>4</option>
                               <option>5</option>
                               <option>6</option>
                               <option>7</option>
                               <option>8</option>
                               <option>9</option>
                               <option>10</option>
                           </select>
                    <Button variant="success" style={{float: 'right'}}>
                        <FontAwesomeIcon icon="plus"/><span className="ml-1" onClick={() => this.onNewTodoHandle(this.props.item.id)} > В корзину</span>
                    </Button>
                </Card.Body>
            </Card>
        );
    }
}