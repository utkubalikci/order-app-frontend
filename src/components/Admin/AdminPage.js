import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useEffect, useRef, useState } from 'react';
import { CREATE_PRODUCT, GET_ALL_CATEGORIES } from '../../service/HttpService';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';

export default function AdminPage() {
    const [name, setName] = useState('');
    const [stock, setStock] = useState(0);
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categoryNameToSave, setCategoryNameToSave] = useState('');

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
        getCategoriesFromDb();
    }, []);

    const getCategoriesFromDb = () => {
        GET_ALL_CATEGORIES()
            .then((response) => response.json())
            .then((data) => setCategories(data))
            .catch((error) => console.error('Error while getting categories', error));
    }

    const saveProduct = () => {
        if (name === '' || stock === 0 || price === 0 || description === '' || image === '' || selectedCategory === null) {
            showWarningToast("Lütfen tüm alanları doldurun.", "");
            return;
        }
        CREATE_PRODUCT({ name: name, stock: stock, price: price, description: description, imageUrl: image, categoryId: selectedCategory.id })
            .then(response => {
                if (response.status === 401) { showErrorToast('Ürün kaydedilirken bir hata ile karşılaşıldı.', "Tekrar giriş yapmayı deneyin.") }
                else { showSuccessToast('Ürün başarılı bir şekilde veritabanına kaydedildi.', '') }
            })
            .catch(error => { console.log(error); showErrorToast('Ürün kaydedilirken bir hata ile karşılaşıldı.', "Tekrar giriş yapmayı deneyin.") });
    }

    return (
        <div className="mt-6 flex align-items-center justify-content-center">
            <Toast ref={toast} />
            <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
                <div className="text-center mb-5">
                    <div className="text-900 text-3xl font-medium mb-3">Ürün Ekle</div>
                </div>

                <div>
                    <label htmlFor="productName" className="block text-900 font-medium mb-2">Ürün Adı:</label>
                    <InputText id="productName" type="text" className="w-full mb-3" value={name} onChange={(e) => setName(e.target.value)} />

                    <label htmlFor="productStock" className="block text-900 font-medium mb-2">Stok Adedi:</label>
                    <InputNumber id="productStock" className="w-full mb-3" useGrouping={false} value={stock} onValueChange={(e) => setStock(e.value)} mode="decimal" min={0} />

                    <label htmlFor="productPrice" className="block text-900 font-medium mb-2">Birim Fiyatı:</label>
                    <InputNumber inputId="productPrice" className="w-full mb-3" value={price} onValueChange={(e) => setPrice(e.value)} minFractionDigits={2} maxFractionDigits={2} />

                    <label htmlFor="productDescription" className="block text-900 font-medium mb-2">Ürün Açıklaması:</label>
                    <InputTextarea id="productDescription" className="w-full mb-3" autoResize value={description} onChange={(e) => setDescription(e.target.value)} rows={5} cols={30} />

                    <label htmlFor="productImg" className="block text-900 font-medium mb-2">Görsel Linki:</label>
                    <InputText id="productImg" type="text" className="w-full mb-3" value={image} onChange={(e) => setImage(e.target.value)} />

                    <label htmlFor="productCategory" className="block text-900 font-medium mb-2">Kategori:</label>
                    <Dropdown value={selectedCategory} onChange={(e) => setSelectedCategory(e.value)} options={categories} optionLabel="name"
                        className="w-full mb-3" />

                    <Button label="Ürünü Kaydet" icon="pi pi-save" className="w-full" onClick={saveProduct} />

                </div>

                <div className="text-center my-5">
                    <div className="text-900 text-3xl font-medium mb-3">Kategori Ekle</div>
                </div>

                <div>
                    <label htmlFor="categoryName" className="block text-900 font-medium mb-2">Kategori Adı:</label>
                    <InputText id="categoryName" type="text" className="w-full mb-3" value={categoryNameToSave} onChange={(e) => setCategoryNameToSave(e.target.value)} />

                    <Button label="Kategoriyi Kaydet" icon="pi pi-save" className="w-full" />

                </div>
            </div>

        </div>
    )
}