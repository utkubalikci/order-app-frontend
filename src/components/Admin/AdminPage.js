import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useEffect, useRef, useState } from 'react';
import { CREATE_PRODUCT, GET_ALL_CATEGORIES, GET_USER } from '../../service/HttpService';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';

export default function AdminPage() {
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    const toast = useRef(null);

    const showSuccessToast = (summary, detail) => {
        toast.current.show({ severity: 'success', summary: summary, detail: detail, life: 3000 });
    }

    const showWarningToast = (summary, detail) => {
        toast.current.show({ severity: 'warn', summary: summary, detail: detail, life: 3000 });
    }

    const showErrorToast = (summary, detail) => {
        toast.current.show({ severity: 'error', summary: summary, detail: detail, life: 3000 });
    }

    useEffect(() => {
        GET_USER(localStorage.getItem('currentUser'))
            .then(response => response.json())
            .then((data) => {
                setUserName(data.userName);
            })
            .catch((error) => {
                console.error('Error while getting user', error)
                // navigate('/toLogin');
            });
    }, [navigate]);

    return (
        <div className="mt-6 flex align-items-center justify-content-center">
            <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
                <div className="text-center mb-5">
                    <div className="text-900 text-3xl font-medium mb-3">Yönetici Paneli</div>
                    <span className="text-600 font-medium line-height-3">{userName}</span>
                </div>

                <div>
                    <Button label="Ürün Ekle" severity='success' icon="pi pi-plus" className="my-1 w-full" onClick={() => navigate('./add/product')} />
                    <Button label="Ürün Düzenle" severity='info' icon="pi pi-plus" className="my-1 w-full" onClick={() => navigate('./edit/product')} />

                    <Button label="Kategori Ekle" severity='success' icon="pi pi-plus" className="my-1 w-full" onClick={() => navigate('./add/category')} />
                    <Button label="Kategori Düzenle" severity='info' icon="pi pi-plus" className="my-1 w-full" onClick={() => navigate('./edit/category')} />

                </div>
            </div>
            <Toast ref={toast} />

        </div>
    )
}