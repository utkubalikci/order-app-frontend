import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import { GET_ALL_PRODUCTS } from '../../service/HttpService';
import { ListBox } from 'primereact/listbox';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [layout, setLayout] = useState('grid');
    const [categories, setCategories] = useState(['Bilgisayar', 'Telefon']);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        GET_ALL_PRODUCTS()
            .then((response) => response.json())
            .then((data) => setProducts(data.slice(0, 12)))
            .catch((error) => console.error('Error while getting products', error));
    }, []);

    const getSeverity = (product) => {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };

    const listItem = (product, index) => {
        return (
            <div className="col-12" key={product.id}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4 border-round shadow-1', { 'border-top-1 surface-border': index !== 0 })}>
                    <img className="w-12rem xl:w-9rem shadow-2 block mx-auto border-round" src={product.imageUrl} alt={product.name} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{product.name}</div>
                            <div className="text-700">{product.description}</div> {/* Ürün açıklaması eklendi */}
                            <Rating value={4} readOnly cancel={false}></Rating> {/* Sabit rating */}
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">Category ID: {product.categoryId}</span> {/* Kategori ID */}
                                </span>
                                <Tag value={product.stock > 0 ? 'IN STOCK' : 'OUT OF STOCK'} severity={getSeverity(product)}></Tag>
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">${product.price}</span>
                            <Button icon="pi pi-shopping-cart" className="p-button-rounded p-button-sm" disabled={product.stock === 0}></Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const gridItem = (product) => {
        return (
            <div className="col-12 sm:col-6 lg:col-4 p-2" key={product.id}>
                <div className="p-4 border-1 surface-border surface-card border-round shadow-1">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-tag"></i>
                            <span className="font-semibold">Category ID: {product.categoryId}</span> {/* Kategori ID */}
                        </div>
                        <Tag value={product.stock > 0 ? 'IN STOCK' : 'OUT OF STOCK'} severity={getSeverity(product)}></Tag>
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <img className="w-9rem shadow-2 border-round" src={product.imageUrl} alt={product.name} />
                        <div className="text-2xl font-bold">{product.name}</div>
                        <div className="text-700">{product.description}</div> {/* Ürün açıklaması eklendi */}
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">${product.price}</span>
                        <Button icon="pi pi-shopping-cart" className="p-button-rounded p-button-sm" disabled={product.stock === 0}></Button>
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (product, layout, index) => {
        if (!product) {
            return;
        }

        if (layout === 'list') return listItem(product, index);
        else if (layout === 'grid') return gridItem(product);
    };

    const listTemplate = (products, layout) => {
        return <div className="grid grid-nogutter">{products.map((product, index) => itemTemplate(product, layout, index))}</div>;
    };

    const header = () => {
        return (
            <div className="flex justify-content-end">
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        );
    };

    return (
        <div className="card grid">
            <div className="col-4 md:col-4">
                <ListBox className="w-full" filter value={selectedCategory} onChange={(e) => setSelectedCategory(e.value)} options={categories} optionLabel="name" />
            </div>
            <div className="col-8 md:col-8">
                <DataView value={products} listTemplate={listTemplate} layout={layout} header={header()} />
            </div>
        </div>
    )
}
