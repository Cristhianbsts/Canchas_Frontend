import { Link } from "react-router"
import "../css/error.css"

const ErrorScreen = () => {
    return (
        <main className="main">
            <div className="err-card">
                <h1>Error 404</h1>
                <p>Página no encontrada 😭</p>
                <Link to= '/'>
                   <button className="back-btn">
                    Volver al inicio
                   </button>
                </Link>
                
            </div>
        </main>
    )
}

export default ErrorScreen
