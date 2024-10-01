import { useParams } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { CONFIRM_ORDER, GET_ORDER_BY_ID } from "../../service/HttpService";
import { Timeline } from "primereact/timeline";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

export default function OrderPage() {
    const { id } = useParams();
    const toast = useRef(null);
    const [orderItems, setOrderItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [orderId, setOrderId] = useState();
    const [activeIndex, setActiveIndex] = useState(0);
    const [orderDate, setOrderDate] = useState();

    const showSuccessToast = () => {
        toast.current.show({ severity: 'success', summary: 'Siparişi onayladınız.', detail: "Kargoya verildiğinde tarafınıza bilgi verilecektir.", life: 3000 });
    }

    useEffect(() => {
        getOrder();
    }, []);

    const setStepper = (status) => {
        switch (status) {
            case 'BEKLIYOR':
                setActiveIndex(0);
                break;
            case 'ONAYLANDI':
                setActiveIndex(1);
                break;
            case 'HAZIRLANIYOR':
                setActiveIndex(2);
                break;
            case 'GONDERILDI':
                setActiveIndex(3);
                break;
            case 'TESLIM_EDILDI':
                setActiveIndex(4);
                break;
            default:
                break;
        }
    }

    const getOrder = () => {
        GET_ORDER_BY_ID(id)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setOrderItems(data.orderItems);
                setTotalPrice(data.price);
                setStepper(data.status);
                setOrderId(data.id);
                setOrderDate(new Date(data.orderDate).toLocaleString());
            })
            .catch(error => {
                console.log(error);
            })
    }

    const confirmOrder = () => {
        CONFIRM_ORDER(orderId)
            .then(() => { showSuccessToast();getOrder(); })
            .catch(error => console.log(error))
    }

    const footer =
        <div className="flex">
            <div className="col-6">
                Toplam Fiyat: {totalPrice}₺
            </div>
            {
                activeIndex === 0 &&
                <Button label="Sipariş Onayla" icon="pi pi-cart-arrow-down" severity="success" className="w-full" onClick={confirmOrder} />
            }
        </div>;

    return (
        <div className="mt-6 flex align-items-center justify-content-center">
            <Toast ref={toast} />
            <div className="surface-card p-4 shadow-2 border-round w-full lg:w-10">
                <div className="text-center mb-5">
                    <div className="text-900 text-3xl font-medium mb-3">{id} Numaralı Sipariş</div>
                    <span className="text-600 font-medium line-height-3">Sipariş Tarihi: {orderDate}</span>
                </div>


                <Stepper headerPosition="bottom" activeStep={activeIndex} linear={true} >
                    <StepperPanel header="Onay Bekliyor"></StepperPanel>
                    <StepperPanel header="Onaylandı"></StepperPanel>
                    <StepperPanel header="Hazırlanıyor"></StepperPanel>
                    <StepperPanel header="Gönderildi"></StepperPanel>
                    <StepperPanel header="Teslim Edildi"></StepperPanel>
                </Stepper>

                <div className="card">
                    <DataTable value={orderItems} footer={footer} tableStyle={{ minWidth: '30rem' }}>
                        <Column field="productName" header="Ürün Adı"></Column>
                        <Column field="quantity" header="Adet"></Column>
                        <Column field="price" header="Fiyat"></Column>
                    </DataTable>
                </div>

            </div>
        </div>
    )
}