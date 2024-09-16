import {useRouterError} from 'react-router-dom';

export default function NotFound() {
    const error = useRouterError()
    console.error(error);
    
    return (
        <div>
            <h1>404 PAGE NOT FOUND</h1>
        </div>
    )
}