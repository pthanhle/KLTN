import { Component } from 'react';

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
            return (
                <div style={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#0a0a0b',
                    color: '#f8fafc',
                    fontFamily: 'monospace',
                    padding: '2rem',
                    gap: '1rem'
                }}>
                    <h1 style={{ color: '#ef4444', fontSize: '1.5rem' }}>Có lỗi xảy ra</h1>
                    <pre style={{
                        background: '#1e1e2e',
                        padding: '1rem',
                        borderRadius: '8px',
                        maxWidth: '800px',
                        overflow: 'auto',
                        fontSize: '0.85rem',
                        color: '#f97316'
                    }}>
                        {this.state.error?.toString()}
                    </pre>
                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            background: '#eab308',
                            color: '#0a0a0b',
                            border: 'none',
                            padding: '0.5rem 1.5rem',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                        }}
                    >
                        Tải lại trang
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
