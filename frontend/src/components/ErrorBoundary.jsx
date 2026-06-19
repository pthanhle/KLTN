import { Component } from 'react';
import ErrorPage from '../pages/ErrorPage';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, info) {
        console.error('[ErrorBoundary]', error, info);
    }

    render() {
        if (this.state.hasError) {
            return <ErrorPage status="500" />;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
