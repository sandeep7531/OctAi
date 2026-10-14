import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    // Crash hone par ye state update karega
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Crash report:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // 🚨 Next.js jaisa Custom Error UI
            return (
                <div className="h-screen bg-[#0d0f14] text-white flex flex-col items-center justify-center p-6">
                    <div className="max-w-xl w-full bg-red-950/30 border border-red-500/30 rounded-xl p-6">
                        <h2 className="text-xl font-bold text-red-400 mb-2">Application Error</h2>
                        <p className="text-slate-300 text-sm font-mono bg-black/40 p-3 rounded mb-4">
                            {this.state.error?.toString()}
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded text-sm font-medium"
                        >
                            Reload Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
