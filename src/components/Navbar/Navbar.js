
import React from 'react';
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();

    const items = [
        {
            label: 'Ana Sayfa',
            icon: 'pi pi-home',
            command: () => navigate('/')
        },
        {
            label: 'Sepet',
            icon: 'pi pi-shopping-cart',
            command: () => navigate('/cart')
        },
        {
            label: 'Siparişlerim',
            icon: 'pi pi-shopping-bag',
            command: () => navigate('/orders')
        },
        {
            label: 'Hesabım',
            icon: 'pi pi-user',
            command: () => navigate('/myProfile')
        }
    ];

    return (
        <div className="card">
            <Menubar model={items} />
            <style jsx>{`
                .p-menubar .p-menubar-root-list .p-menuitem-link {
                    text-decoration: none; // Alt çizgiyi kaldır
                }
            `}</style>
        </div>
    )
}
