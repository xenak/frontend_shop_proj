import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import dataService, {ShopItem} from "./DataService";


interface ShopItemComponentProps {

    item: ShopItem

}

export class ShopItemComponent extends React.Component<ShopItemComponentProps, any> {


    private async onNewTodoHandle(list: number) {

        let id = this.props.item.id;
        let title = this.props.item.title;
        let image = this.props.item.image;
        let price = this.props.item.price;
        let quantity = this.props.item.quantity;


        let cartItem = new ShopItem(id, title, image, price, quantity);

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
                    <Button variant="success">
                        <FontAwesomeIcon icon="plus"/><span className="ml-1" onClick={() => this.onNewTodoHandle(this.props.item.id)} > В корзину</span>
                    </Button>
                </Card.Body>
            </Card>
        );
    }

}