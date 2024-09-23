import { Button } from 'primereact/button';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'reactstrap';

export default function LinkToLogin() {
    const navigate = useNavigate();
    return (
        <Container className='text-center flex justify-center m-4 bg-light'>
            <p>Lütfen Giriş Yapın.</p>
            <Button label="Giriş Yap" className="p-button-text" onClick={() => navigate('/login')} />

        </Container>
    )

}