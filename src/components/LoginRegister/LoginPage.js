import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import React, { useRef, useState } from "react";
import { LOGIN } from "../../service/HttpService";
import { Messages } from "primereact/messages";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [checked, setChecked] = useState(false);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const msgs = useRef(null);

    const addMessages = () => {
        msgs.current.show([
            { severity: 'error', summary: 'Hata', detail: 'Kullanıcı Adı/Şifre Yanlış!', sticky: true, closable: false }
        ]);
    };
    const clearMessages = () => {
        msgs.current.clear();
    };
    const login = () => {
        clearMessages();
        LOGIN({ userName : userName, password : password })
            .then(response => response.json())
            .then((result) => {
                localStorage.setItem("tokenKey", result.accessToken);
                localStorage.setItem("refreshKey", result.refreshToken);
                localStorage.setItem("currentUser", result.userId);
                localStorage.setItem("userName", userName)
                navigate('/myProfile');
            })
            .catch((error) => {
                addMessages();
                console.error('Error while login', error)
            });

    }

    return (
        <div className="mt-6 flex align-items-center justify-content-center">
            <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
                <div className="text-center mb-5">
                    <div className="text-900 text-3xl font-medium mb-3">Hoş Geldiniz</div>
                    <span className="text-600 font-medium line-height-3">Hesabınız yok mu?</span>
                    <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer" onClick={() => navigate('/register')}>Şimdi Oluşturun!</a>
                </div>

                <div>
                    <label htmlFor="userNameLogin" className="block text-900 font-medium mb-2">Kullanıcı Adı:</label>
                    <InputText id="userNameLogin" type="text" placeholder="Kullanıcı Adı" className="w-full mb-3" value={userName} onChange={(e) => setUserName(e.target.value)} />

                    <label htmlFor="password" className="block text-900 font-medium mb-2">Parola:</label>
                    <InputText id="password" type="password" placeholder="Parola" className="w-full mb-3" value={password} onChange={(e) => setPassword(e.target.value)} />

                    <div className="flex align-items-center justify-content-between mb-6">
                        <div className="flex align-items-center">
                            <Checkbox id="rememberme" onChange={e => setChecked(e.checked)} checked={checked} className="mr-2" />
                            <label htmlFor="rememberme">Beni Hatırla</label>
                        </div>
                        <a className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Şifrenizi mi unuttunuz? Şu an hiçbir şey yapamam :)</a>
                    </div>
                    
                    <Button label="Giriş" icon="pi pi-user" className="w-full" onClick={login} />
                    
                    <Messages ref={msgs} />
                </div>
            </div>
        </div>
    )
}