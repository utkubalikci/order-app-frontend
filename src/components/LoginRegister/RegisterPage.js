import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import React, { useRef, useState } from "react";
import { LOGIN, REGISTER } from "../../service/HttpService";
import { Messages } from "primereact/messages";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const [fullName, setFullName] = useState('');
    const [userName, setUserName] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');

    const navigate = useNavigate();
    const msgs = useRef(null);

    const addMessages = (message) => {
        msgs.current.show([
            { severity: 'error', summary: 'Hata', detail: message, sticky: true, closable: false }
        ]);
    };
    const clearMessages = () => {
        msgs.current.clear();
    };
    const register = () => {
        clearMessages();
        if (fullName === "" || userName === "" || password1 === "" || password2 === "") {
            addMessages("Tüm alanları doldurunuz");
            return;
        }
        if (password1 !== password2) {
            addMessages("Parolalar eşleşmiyor");
            return;
        }
        REGISTER({ fullName: fullName, userName: userName, password: password1 })
            .then(response => response.json())
            .then((result) => {
                localStorage.setItem("tokenKey", result.accessToken);
                localStorage.setItem("refreshKey", result.refreshToken);
                localStorage.setItem("currentUser", result.userId);
                localStorage.setItem("userName", userName)
                navigate('/myProfile');
            })
            .catch((error) => {
                addMessages(error.message);
                console.error('Error while login', error)
            });
    }

    return (
        <div className="mt-6 flex align-items-center justify-content-center">
            <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
                <div className="text-center mb-5">
                    <div className="text-900 text-3xl font-medium mb-3">Kayıt Ol</div>
                    <span className="text-600 font-medium line-height-3">Hesabınız var mı?</span>
                    <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer" onClick={() => navigate('/login')}>Giriş Yapın!</a>
                </div>

                <div>
                    <label htmlFor="fullNameLogin" className="block text-900 font-medium mb-2">Tam Ad Giriniz:</label>
                    <InputText id="fullNameLogin" type="text" placeholder="Tam Ad" className="w-full mb-3" value={fullName} onChange={(e) => setFullName(e.target.value)} />

                    <label htmlFor="userNameLogin" className="block text-900 font-medium mb-2">Kullanıcı Adı:</label>
                    <InputText id="userNameLogin" type="text" placeholder="Kullanıcı Adı" className="w-full mb-3" value={userName} onChange={(e) => setUserName(e.target.value)} />

                    <label htmlFor="password" className="block text-900 font-medium mb-2">Parola Giriniz:</label>
                    <InputText id="password" type="password" placeholder="Parola" className="w-full mb-3" value={password1} onChange={(e) => setPassword1(e.target.value)} />

                    <label htmlFor="password" className="block text-900 font-medium mb-2">Parolayı Tekrar Giriniz:</label>
                    <InputText id="password" type="password" placeholder="Parola" className="w-full mb-3" value={password2} onChange={(e) => setPassword2(e.target.value)} />

                    <Button label="Kayıt Ol" icon="pi pi-user" className="w-full" onClick={register} />

                    <Messages ref={msgs} />
                </div>
            </div>
        </div>
    )
}