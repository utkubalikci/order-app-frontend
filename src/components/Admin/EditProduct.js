import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useEffect, useRef, useState } from 'react';
import { CREATE_CATEGORY, CREATE_PRODUCT, EDIT_CATEGORY, EDIT_PRODUCT, GET_ALL_CATEGORIES, GET_PRODUCT_BY_CATEGORY_ID } from '../../service/HttpService';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { ListBox } from 'primereact/listbox';

export default function EditProduct() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [stock, setStock] = useState(0);
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [categories, setCategories] = useState();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState();


    const toast = useRef(null);

    useEffect(() => {
        getCategoriesFromDb();
    }, []);

    useEffect(() => {
        getProductByCategoryId();
    }, [selectedCategory]);

    useEffect(() => {
        if (selectedProduct) {
            setName(selectedProduct.name);
            setDescription(selectedProduct.description);
            setStock(selectedProduct.stock);
            setPrice(selectedProduct.price);
            setImage(selectedProduct.imageUrl);
        }
    }, [selectedProduct]);

    const getCategoriesFromDb = () => {
        GET_ALL_CATEGORIES()
            .then((response) => response.json())
            .then((data) => setCategories(data))
            .catch((error) => console.error('Error while getting categories', error));
    }

    const getProductByCategoryId = () => {
        if (selectedCategory) {
            GET_PRODUCT_BY_CATEGORY_ID(selectedCategory.id)
                .then((response) => response.json())
                .then((data) => setProducts(data))
                .catch((error) => console.error('Error while getting products', error));
        }
    }

    const saveProduct = () => {
        if (selectedProduct === null) {
            showWarningToast("Lütfen bir ürün seçin.", "");
            return;
        }
        if (name === '' || price === 0 || description === '' || image === '') {
            showWarningToast("Lütfen tüm alanları doldurun.", "");
            return;
        }
        EDIT_PRODUCT({ id: selectedProduct.id, name: name, stock: stock, price: price, description: description, imageUrl: image, categoryId: selectedCategory.id })
        .then(response => {
            if (response.status === 401) { showErrorToast('Ürün kaydedilirken bir hata ile karşılaşıldı.', "Tekrar giriş yapmayı deneyin.") }
            else { showSuccessToast('Ürün başarılı bir şekilde veritabanına kaydedildi.', '') }
        })
        .catch(error => { console.log(error); showErrorToast('Ürün kaydedilirken bir hata ile karşılaşıldı.', "Tekrar giriş yapmayı deneyin.") });
    }


    const showSuccessToast = (summary, detail) => {
        toast.current.show({ severity: 'success', summary: summary, detail: detail, life: 3000 });
    }

    const showWarningToast = (summary, detail) => {
        toast.current.show({ severity: 'warn', summary: summary, detail: detail, life: 3000 });
    }

    const showErrorToast = (summary, detail) => {
        toast.current.show({ severity: 'error', summary: summary, detail: detail, life: 3000 });
    }



    return (
        <div className="mt-6 flex align-items-center justify-content-center">
            <Toast ref={toast} />
            <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
                <div className="text-center my-5">
                    <div className="text-900 text-3xl font-medium mb-3">Ürün Düzenle</div>
                </div>
                <div className="col-12 md:col-4">
                </div>
                <div>
                    <ListBox filter value={selectedCategory} onChange={(e) => { setSelectedCategory(e.value) }} options={categories} optionLabel="name" className="w-full mb-2" />

                    {selectedCategory &&
                        <ListBox filter value={selectedProduct} onChange={(e) => { setSelectedProduct(e.value) }} options={products} optionLabel="name" className="w-full mb-2" />

                    }

                    {selectedProduct &&
                        <div>
                            <label htmlFor="productEditName" className="block text-900 font-medium mb-2">Ürün Adı:</label>
                            <InputText id="productEditName" type="text" className="w-full mb-3" value={name} onChange={(e) => setName(e.target.value)} />

                            <label htmlFor="productEditStock" className="block text-900 font-medium mb-2">Stok Adedi:</label>
                            <InputNumber id="productEditStock" className="w-full mb-3" useGrouping={false} value={stock} onValueChange={(e) => setStock(e.value)} mode="decimal" min={0} />

                            <label htmlFor="productEditPrice" className="block text-900 font-medium mb-2">Birim Fiyatı:</label>
                            <InputNumber inputId="productEditPrice" className="w-full mb-3" value={price} onValueChange={(e) => setPrice(e.value)} minFractionDigits={2} maxFractionDigits={2} />

                            <label htmlFor="productEditDescription" className="block text-900 font-medium mb-2">Ürün Açıklaması:</label>
                            <InputTextarea id="productEditDescription" className="w-full mb-3" autoResize value={description} onChange={(e) => setDescription(e.target.value)} rows={5} cols={30} />

                            <label htmlFor="productEditImg" className="block text-900 font-medium mb-2">Görsel Linki:</label>
                            <InputText id="productEditImg" type="text" className="w-full mb-3" value={image} onChange={(e) => setImage(e.target.value)} />

                            <Button label="Ürünü Kaydet" icon="pi pi-save" className="w-full" onClick={saveProduct} />
                        </div>
                    }

                </div>
            </div>

        </div >
    )
}