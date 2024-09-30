import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useEffect, useRef, useState } from 'react';
import { CREATE_CATEGORY, CREATE_PRODUCT, EDIT_CATEGORY, GET_ALL_CATEGORIES } from '../../service/HttpService';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { ListBox } from 'primereact/listbox';

export default function EditCategory() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [categories, setCategories] = useState();
    const [selectedCategory, setSelectedCategory] = useState(null);

    const toast = useRef(null);

    useEffect(() => {
        getCategoriesFromDb();
    }, []);

    const getCategoriesFromDb = () => {
        GET_ALL_CATEGORIES()
            .then((response) => response.json())
            .then((data) => setCategories(data))
            .catch((error) => console.error('Error while getting categories', error));
    }

    useEffect(() => {
        if (selectedCategory) {
            setName(selectedCategory.name);
            setDescription(selectedCategory.description);
            setImage(selectedCategory.imageUrl);
        }
    }, [selectedCategory]);

    const showSuccessToast = (summary, detail) => {
        toast.current.show({ severity: 'success', summary: summary, detail: detail, life: 3000 });
    }

    const showWarningToast = (summary, detail) => {
        toast.current.show({ severity: 'warn', summary: summary, detail: detail, life: 3000 });
    }

    const showErrorToast = (summary, detail) => {
        toast.current.show({ severity: 'error', summary: summary, detail: detail, life: 3000 });
    }

    const saveCategory = () => {
        if (selectedCategory === null) {
            showWarningToast("Lütfen bir kategori seçin.", "");
            return;
        }
        if (name === '' || description === '' || image === '') {
            showWarningToast("Lütfen tüm alanları doldurun.", "");
            return;
        }

        EDIT_CATEGORY({ id: selectedCategory.id, name: name, description: description, imageUrl: image })
            .then(response => {
                if (response.status === 401) { showErrorToast('Kategori kaydedilirken bir hata ile karşılaşıldı.', "Tekrar giriş yapmayı deneyin.") }
                else { showSuccessToast('Kategori başarılı bir şekilde veritabanına kaydedildi.', '') }
            })
            .catch(error => { console.log(error); showErrorToast('Kategori kaydedilirken bir hata ile karşılaşıldı.', "Tekrar giriş yapmayı deneyin.") });

    }

    return (
        <div className="mt-6 flex align-items-center justify-content-center">
            <Toast ref={toast} />
            <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
                <div className="text-center my-5">
                    <div className="text-900 text-3xl font-medium mb-3">Kategori Düzenle</div>
                </div>
                <div className="col-12 md:col-4">
                </div>
                <div>
                    <ListBox filter value={selectedCategory} onChange={(e) => { setSelectedCategory(e.value) }} options={categories} optionLabel="name" className="w-full mb-2" />

                    {selectedCategory &&
                        <div>
                            <label htmlFor="categoryName" className="block text-900 font-medium mb-2">Kategori Adı:</label>
                            <InputText id="categoryName" type="text" className="w-full mb-3" value={name} onChange={(e) => setName(e.target.value)} />

                            <label htmlFor="categoryDescription" className="block text-900 font-medium mb-2">Ürün Açıklaması:</label>
                            <InputTextarea id="categoryDescription" className="w-full mb-3" autoResize value={description} onChange={(e) => setDescription(e.target.value)} rows={5} cols={30} />

                            <label htmlFor="categoryImg" className="block text-900 font-medium mb-2">Görsel Linki:</label>
                            <InputText id="categoryImg" type="text" className="w-full mb-3" value={image} onChange={(e) => setImage(e.target.value)} />

                            <Button label="Kategoriyi Kaydet" icon="pi pi-save" className="w-full" onClick={saveCategory} />
                        </div>
                    }

                </div>
            </div>

        </div >
    )
}