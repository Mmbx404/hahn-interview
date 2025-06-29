import {AuthProvider} from "./context/AuthContext";
import SimpleRouter from "./components/SimpleRouter";


function App() {
    return (
        <AuthProvider>
            <SimpleRouter></SimpleRouter>
        </AuthProvider>
    );
}

export default App;
