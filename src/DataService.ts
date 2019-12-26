
export class ShopItem {

    id: number;
    title: string;
    image: string;
    price: number;
    quantity: number;

    constructor(id: number, title: string, image: string, price: number, quantity:number) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.price = price;
        this.quantity = quantity;
    }

}


// Класс для работы с сервером
class DataService {

    private static DB_URL = "http://localhost:4000";


    /**
     * Получить все ShopItem'ы пользователя
     */
    public async getShopItems(filter: string = ".*"): Promise<ShopItem[]> {

        let todoResponsePromise: Promise<Response> = fetch(`${DataService.DB_URL}/shopItem?title_like=${filter}`);

        let response: Response = await todoResponsePromise;

        let jsonPromise: Promise<ShopItem[]> = (response).json();

        return await jsonPromise;
    }


    public async getCart(): Promise<ShopItem[]> {
        let cartResponsePromise: Promise<Response> = fetch(`${DataService.DB_URL}/cart`);
        let response: Response = await cartResponsePromise;
        let jsonPromise: Promise<ShopItem[]> = (response).json();

        return jsonPromise;
    }

    /**
     * Удалить TodoItem
     * @param id идентификатор item'a
     * @returns true, если получилось удалить
     */

    public async deleteItem(id: number): Promise<boolean> {

        let deletePromise = fetch(`${DataService.DB_URL}/cart/${id}`, {
            method: "DELETE"
        });
        return (await deletePromise).ok;
    }

    /**
     * Добавить новый TodoItem на сервер
     * @param newItem новый TodoItem
     */

    public async saveItem(newItem: ShopItem): Promise<ShopItem> {

        delete newItem.id;
        let postPromise = fetch(`${DataService.DB_URL}/cart`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(newItem)
        });

        return await (await postPromise).json();
    }


    /**
     * Подтверждение заказа
     * @param userFname логин
     * @param userLname пароль
     * @param userAddress
     * @param userPhone
     * @param userTotal
     * @param userEmail
     * @param userCart
     */
    public async commit(userFname: string, userLname: string, userAddress: string, userPhone: string, userTotal: number, userEmail: string, userCart: any) {
        let postPromise = fetch(`${DataService.DB_URL}/order`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify([{'fname': userFname, 'lname': userLname, 'address': userAddress, 'phone': userPhone, 'total': userTotal, 'email': userEmail, 'cart': userCart}])
    });
    return await (await postPromise).json();
}





}

let dataService = new DataService();
export default dataService;