import PropTypes from "prop-types"
import { Component } from "react"

// Catches render errors so one broken component doesn't blank the whole app.
class ErrorBoundary extends Component {
    state = { hasError: false }

    static getDerivedStateFromError() {
        return { hasError: true }
    }

    componentDidCatch(error, info) {
        console.error(error, info.componentStack)
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-[80vh] flex flex-col gap-6 justify-center items-center px-4 text-center">
                    <h1 className="text-2xl md:text-4xl text-[#c12e5b] font-bold">Something went wrong.</h1>
                    <button
                        type="button"
                        onClick={() => window.location.reload()}
                        className="text-white px-6 py-2 rounded-full bg-linear-to-r from-[#FD8E28] to-[#CD1563]"
                    >
                        Reload page
                    </button>
                </div>
            )
        }
        return this.props.children
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.node,
}

export default ErrorBoundary
