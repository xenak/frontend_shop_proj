import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import dataService, {ShopItem} from "./DataService";

interface ShopItemComponentProps {

    item: ShopItem;

}

export class ShopItemComponent extends React.Component<ShopItemComponentProps, any> {

    private async onNewTodoHandle(list: number) {

        let id = this.props.item.id;
        let title = this.props.item.title;
        let image = this.props.item.image;
        let price = this.props.item.price;


        let cartItem = new ShopItem(id,title, image,price,"admin");
        //cartItem.login = "admin"
        //cartItem = cartItem[id, login="admin",title,price]
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
                        <div className="price">${this.props.item.price}</div>

                        Some quick example text to build on the card title and
                        make up the bulk of
                        the card's content.
                    </Card.Text>
                    <Button variant="success">
                        <FontAwesomeIcon icon="plus"/><span className="ml-1" onClick={() => this.onNewTodoHandle(this.props.item.id)} > Add to cart</span>
                    </Button>
                </Card.Body>
            </Card>
        );
    }

}