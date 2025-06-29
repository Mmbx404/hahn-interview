import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {TabPanel, TabView} from 'primereact/tabview';
import {InputText} from 'primereact/inputtext';
import {Password} from 'primereact/password';
import {Button} from 'primereact/button';
import {classNames} from 'primereact/utils';
import {login, register} from "../api/authApi";
import {useAuth} from "../context/AuthContext";

function AuthPage() {
    const {setIsAuthenticated} = useAuth();
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(0);

    // Shared state
    const [email, setEmail] = useState('');
    const [username, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [password, setPassword] = useState('');
    const [submitted, setSubmitted] = useState(false);

    // Registration-only
    const [confirmPassword, setConfirmPassword] = useState('');

    const isEmailValid = () => /\S+@\S+\.\S+/.test(email);
    const isPasswordValid = () => password.length >= 6;

    const handleLogin = async () => {
        setSubmitted(true);
        if (isEmailValid() && isPasswordValid()) {
            try {
                const res = await login({email: email, password: password});
                setIsAuthenticated(true);
                localStorage.setItem('jwt', res.data.token);
                navigate('/products');
            } catch (error) {
                console.error('Failed to fetch products', error);
            }
        }
    };

    const handleRegister = async () => {
        setSubmitted(true);
        if (isEmailValid() && isPasswordValid() && password === confirmPassword) {
            try {
                const res = await register({
                    username: username,
                    firstname: firstName,
                    email: email,
                    password: password
                });
                setIsAuthenticated(true);
                localStorage.setItem('jwt', res.data.token);
                navigate('/products');
            } catch (error) {
                console.error('Failed to fetch products', error);
            }
        }
    };

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            backgroundColor: '#f8f9fa',
        }}>
            <div className="p-card p-p-4" style={{width: '350px'}}>
                <h2 style={{textAlign: 'center'}}>Welcome</h2>
                <TabView activeIndex={activeIndex} onTabChange={(e) => {
                    setActiveIndex(e.index);
                    setSubmitted(false);
                    setEmail('');
                    setPassword('');
                    setConfirmPassword('');
                }}>
                    <TabPanel header="Login">
                        <div className="p-fluid">
                            <div className="p-field">
                                <label htmlFor="login-email">Email</label>
                                <InputText id="login-email" value={email} onChange={(e) => setEmail(e.target.value)}
                                           className={classNames({'p-invalid': submitted && !isEmailValid()})}/>
                                {submitted && !isEmailValid() && <small className="p-error">Invalid email.</small>}
                            </div>
                            <div className="p-field">
                                <label htmlFor="login-password">Password</label>
                                <Password id="login-password" value={password}
                                          onChange={(e) => setPassword(e.target.value)} toggleMask feedback={false}
                                          className={classNames({'p-invalid': submitted && !isPasswordValid()})}/>
                                {submitted && !isPasswordValid() &&
                                    <small className="p-error">Password must be at least 6 characters.</small>}
                            </div>
                            <Button label="Login" className="p-mt-2 w-full" onClick={handleLogin}/>
                        </div>
                    </TabPanel>

                    <TabPanel header="Register">
                        <div className="p-fluid">
                            <div className="p-field">
                                <label htmlFor="register-email">Email</label>
                                <InputText id="register-email" value={email} onChange={(e) => setEmail(e.target.value)}
                                           className={classNames({'p-invalid': submitted && !isEmailValid()})}/>
                                {submitted && !isEmailValid() && <small className="p-error">Invalid email.</small>}
                            </div>
                            <div className="p-field">
                                <label htmlFor="register-username">User Name</label>
                                <InputText id="register-username" value={username}
                                           onChange={(e) => setUserName(e.target.value)}
                                />
                            </div>
                            <div className="p-field">
                                <label htmlFor="register-firstname">First Name</label>
                                <InputText id="register-firstname" value={firstName}
                                           onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="p-field">
                                <label htmlFor="register-password">Password</label>
                                <Password id="register-password" value={password}
                                          onChange={(e) => setPassword(e.target.value)} toggleMask feedback={false}
                                          className={classNames({'p-invalid': submitted && !isPasswordValid()})}/>
                                {submitted && !isPasswordValid() &&
                                    <small className="p-error">Password must be at least 6 characters.</small>}
                            </div>
                            <div className="p-field">
                                <label htmlFor="register-confirm">Confirm Password</label>
                                <Password id="register-confirm" value={confirmPassword}
                                          onChange={(e) => setConfirmPassword(e.target.value)} toggleMask
                                          feedback={false}
                                          className={classNames({'p-invalid': submitted && password !== confirmPassword})}/>
                                {submitted && password !== confirmPassword &&
                                    <small className="p-error">Passwords do not match.</small>}
                            </div>
                            <Button label="Register" className="p-mt-2 w-full" onClick={handleRegister}/>
                        </div>
                    </TabPanel>
                </TabView>
            </div>
        </div>
    );
}

export default AuthPage;
