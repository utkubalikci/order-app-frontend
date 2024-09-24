import { Button } from 'primereact/button';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LinkToLogin() {
    const navigate = useNavigate();
    return (
        <div className="surface-0 text-700 text-center mt-5">
            <div className="text-900 font-bold text-5xl mb-3">Alışverişin Tadını Bizimle Çıkartın</div>
            <div className="text-700 text-2xl mb-5">Giriş Yapın ya da Kayıt Olun</div>
            <Button label="Giriş Yap" icon="pi pi-user" className="font-bold px-5 py-3 p-button-raised p-button-rounded white-space-nowrap" onClick={() => navigate('/login')} />
            <Button label="Kayıt Ol" icon="pi pi-user-plus" severity="success" className="font-bold px-5 py-3 p-button-raised p-button-rounded white-space-nowrap" onClick={() => navigate('/register')} />
        </div>
    )

}