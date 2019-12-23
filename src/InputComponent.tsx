import React, {ReactNode} from "react";

interface InputComponentState {

    currentFName: string;
    currentLName: string;
    currentAddress: string;
    currentNumber: string;

}

interface InputComponentProps {

    onNewOrderFName: (firstName: string) => void;
    onNewOrderLName: (lastName: string) => void;
    onNewOrderAddress: (address: string) => void;
    onNewOrderNumber: (number: string) => void;

}

export class InputComponent extends React.Component<InputComponentProps, InputComponentState> {

    constructor(props: Readonly<InputComponentProps>) {
        super(props);
        this.state = {
            currentFName: "",
            currentLName: "",
            currentAddress: "",
            currentNumber: ""
        };
    }

    handleChanges(newStringValue: string) {
        this.setState({
            currentFName: newStringValue,
            currentLName: newStringValue,
            currentAddress: newStringValue,
            currentNumber: newStringValue
        });
    }

    handleSave() {
        this.props.onNewOrderFName(this.state.currentFName);
        this.props.onNewOrderLName(this.state.currentLName);
        this.props.onNewOrderAddress(this.state.currentAddress);
        this.props.onNewOrderNumber(this.state.currentNumber);

    }

    render(): ReactNode {
        return (
            <div className="input-group mb-3">
                <input type="text" onChange={event => this.handleChanges(event.target.value)}
                       value={this.state.currentFName} className="form-control" placeholder="Имя"/>
                <input type="text" onChange={event => this.handleChanges(event.target.value)}
                       value={this.state.currentLName} className="form-control" placeholder="Фамилия"/>
                <input type="text" onChange={event => this.handleChanges(event.target.value)}
                       value={this.state.currentAddress} className="form-control" placeholder="Адрес"/>
                <input type="text" onChange={event => this.handleChanges(event.target.value)}
                       value={this.state.currentNumber} className="form-control" placeholder="Номер телефона"/>
                <div className="input-group-append">
            </div>
                                    <button className="btn btn-outline-secondary" onClick={event => this.handleSave()}
                            type="button">Оформить заказ
                    </button>

            </div>
        );
    }

}