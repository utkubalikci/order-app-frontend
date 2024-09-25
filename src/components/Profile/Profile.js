import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GET_USER } from '../../service/HttpService';
import { Button } from 'primereact/button';

export default function Profile() {
    const [userName, setUserName] = useState('');
    const [fullName, setFullName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        GET_USER(localStorage.getItem('currentUser'))
            .then(response => response.json())
            .then((data) => {
                setUserName(data.userName);
                setFullName(data.fullName);
            })
            .catch((error) => {
                console.error('Error while getting user', error)
                navigate('/toLogin');
            });
    }, [navigate]);

    const logout = () => {
        localStorage.removeItem('tokenKey');
        localStorage.removeItem('refreshKey');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('userName');
        navigate('/toLogin');
    }

    return (
        <div className="mt-6 flex align-items-center justify-content-center">
            <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
                <div className="text-center mb-5">
                    <div className="text-900 text-3xl font-medium mb-3">Hoş Geldiniz {fullName}</div>
                    <span className="text-600 font-medium line-height-3">{userName}</span>
                </div>

                <div>


                    <Button label="Hesap Ayarları (Yakında)"  icon="pi pi-cog" className="my-1 w-full"/>
                    <Button label="Sepetim" severity='success' icon="pi pi-shopping-cart" className="my-1 w-full" onClick={() => navigate('/cart')}/>
                    <Button label="Siparişlerim" severity='warning' icon="pi pi-shopping-bag" className="my-1 w-full" onClick={() => navigate('/orders')}/>
                    <Button label="Çıkış Yap" severity='danger' icon="pi pi-sign-out" className="my-1 w-full" onClick={logout}/>

                </div>
            </div>
        </div>
    )
}