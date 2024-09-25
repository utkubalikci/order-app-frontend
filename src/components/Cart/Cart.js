import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Messages } from "primereact/messages";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ADD_TO_CART, CREATE_ORDER_BY_USER_ID, GET_CART, GET_CART_ITEMS, REMOVE_CART_BY_USER_ID, REMOVE_FROM_CART } from "../../service/HttpService";
import { Toast } from "primereact/toast";

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const toast = useRef(null);

    const showSuccessToast = () => {
        toast.current.show({ severity: 'success', summary: 'Sipariş oluşturuldu.', detail: "Siparişlerim sayfasına giderek siparişinizi onaylayabilirsiniz.", life: 3000 });
    }

    useEffect(() => {
        GET_CART_ITEMS(localStorage.getItem('currentUser'))
            .then(response => response.json())
            .then((data) => {
                setCartItems(data);
                console.log(data);
            })
            .catch((error) => {
                console.error('Error while getting cart', error)
                navigate('/toLogin');
            });
    }, []);

    const removeCart = () => {
        REMOVE_CART_BY_USER_ID(localStorage.getItem('currentUser'))
            .then(() => {
                setCartItems([]);
            })
            .catch((error) => {
                console.error('Error while removing cart', error)
            });
    }

    const giveOrder = () => {
        CREATE_ORDER_BY_USER_ID(localStorage.getItem('currentUser'))
            .then(() => {
                setCartItems([]);
                showSuccessToast();
            })
            .catch((error) => {
                console.error('Error while giving order', error)
            });
    }

    const removeItem = (rowData) => {
        REMOVE_FROM_CART({ userId: parseInt(localStorage.getItem('currentUser')), productId: rowData.id, quantity: rowData.quantity })
            .then(() => {
                setCartItems(prevItems => prevItems.filter(item => item.id !== rowData.id));
            })
            .catch((error) => {
                console.error('Error while removing item from cart', error)
            });
    }

    const increaseQuantity = (rowData) => {
        ADD_TO_CART({ userId: parseInt(localStorage.getItem('currentUser')), productId: rowData.id, quantity: 1 })
            .then(() => {
                setCartItems(prevItems =>
                    prevItems.map(item =>
                        item.id === rowData.id ? { ...item, quantity: item.quantity + 1 } : item
                    )
                );
            })
            .catch((error) => {
                console.error('Error while adding item to cart', error)
            });
    }

    const decreaseQuantity = (rowData) => {
        rowData.quantity === 1 ? removeItem(rowData) :
            ADD_TO_CART({ userId: parseInt(localStorage.getItem('currentUser')), productId: rowData.id, quantity: -1 })
                .then(() => {
                    setCartItems(prevItems =>
                        prevItems.map(item =>
                            item.id === rowData.id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
                        )
                    );
                })
                .catch((error) => {
                    console.error('Error while adding item to cart', error)
                });
    }

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">Ürünler</span>
            <Button severity="danger" icon="pi pi-trash" rounded raised onClick={removeCart} />
        </div>
    );
    const footer = <div>
        Toplam Fiyat: {totalPrice}₺
        <Button label="Sipariş Ver" icon="pi pi-cart-arrow-down" severity="success" className="w-full" onClick={giveOrder} />
    </div>;

    return (
        <div className="mt-6 flex align-items-center justify-content-center">
            <Toast ref={toast} />
            <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
                <div className="text-center mb-5">
                    <div className="text-900 text-3xl font-medium mb-3">Sepetim</div>
                </div>

                <div className="card">
                    <DataTable value={cartItems} header={header} footer={footer} tableStyle={{ minWidth: '30rem' }}>
                        <Column field="productName" header="Ürün Adı"></Column>
                        <Column field="price" header="Birim Fiyatı"></Column>
                        {/* <Column field="quantity" header="Adet"></Column> */}
                        <Column header="Adet" body={(rowData) => (
                            <div>
                                <Button className="mx-1" icon="pi pi-minus" severity="warning" onClick={() => decreaseQuantity(rowData)} />
                                <Button className="mx-1" label={rowData.quantity} severity="secondary" />
                                <Button className="mx-1" icon="pi pi-plus" severity="success" onClick={() => increaseQuantity(rowData)} />
                                <Button className="mx-1" icon="pi pi-trash" severity="danger" onClick={() => removeItem(rowData)} />
                            </div>
                        )}></Column>
                        <Column header="Toplam Fiyat" body={(rowData) => rowData.price * rowData.quantity}></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    )
}