import { useLocation } from "react-router-dom"
import './Error.css'

export default function Error() {
    const location = useLocation();
    return (
        <div className="error-container">
            <h1 className="error-title"><span>404</span> - Page Not Found</h1>
            <p className="error-message">The page <code onClick={() => window.location.reload()}>{location.pathname}</code> does not exist.</p>
        </div>
    )
}