import React, { useEffect, useRef, useState } from 'react';
import { CONFIRM_ORDER, GET_ORDERS_BY_USER_ID} from '../../service/HttpService';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';

export default function Orders() {
    const [orders, setOrders] = useState();
    const toast = useRef(null);

    const showSuccessToast = () => {
        toast.current.show({ severity: 'success', summary: 'Siparişi onayladınız.', detail: "Kargoya verildiğinde tarafınıza bilgi verilecektir.", life: 3000 });
    }

    const getOrders = () => {
        GET_ORDERS_BY_USER_ID(localStorage.getItem('currentUser'))
            .then(response => response.json())
            .then(data => {
                setOrders(data);
            })
            .catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        getOrders();
    }, []);

    const confirmOrder = (rowData) => {
        CONFIRM_ORDER(rowData.id)
            .then(() => { showSuccessToast();getOrders(); })
            .catch(error => console.log(error))
    }

    return (
        <div className="mt-6 flex align-items-center justify-content-center">
            <Toast ref={toast} />
            <div className="surface-card p-4 shadow-2 border-round w-full lg:w-10">
                <div className="text-center mb-5">
                    <div className="text-900 text-3xl font-medium mb-3">Siparişlerim</div>
                    <span className="text-600 font-medium line-height-3">-</span>
                </div>

                <div className="card">
                    <DataTable value={orders} sortMode="multiple" tableStyle={{ minWidth: '20rem' }}>
                        <Column field="id" sortable header="Sipariş Numarası"></Column>
                        <Column field="status" sortable header="Durum"></Column>
                        <Column field="orderDate" sortable header="Sipariş Tarihi"></Column>
                        <Column field="price" sortable header="Fiyat"></Column>
                        <Column header="Ürün Adedi" body={(rowData) => (rowData.orderItems.length)}></Column>
                        <Column header="Siparişi Onayla" body={(rowData) => (
                            <Button label="Onayla" icon="pi pi-check" className="p-button-success" onClick={() => { confirmOrder(rowData) }} disabled={rowData.status !== 'BEKLIYOR'} />
                        )}></Column>
                    </DataTable>
                </div>


            </div>
        </div>
    )
}