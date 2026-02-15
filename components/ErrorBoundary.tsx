
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  /**
   * Children components to be wrapped by the error boundary.
   */
  children?: ReactNode;
}

interface State {
  /**
   * Whether an error has been captured by the boundary.
   */
  hasError: boolean;
}

/**
 * Standard React Error Boundary component.
 * Captures JavaScript errors anywhere in their child component tree,
 * logs those errors, and displays a fallback UI instead of the component tree that crashed.
 */
export class ErrorBoundary extends Component<Props, State> {
  // Fix: Explicitly initialize state and props in the constructor to ensure property inheritance (this.props and this.state) 
  // is correctly resolved by the TypeScript compiler when extending React components.
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  /**
   * Static method to update state when an error occurs.
   */
  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  /**
   * Lifecycle method to catch errors and log them.
   */
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  /**
   * Renders the fallback UI if an error occurred, otherwise renders children.
   */
  public render() {
    // Fix: Access state property inherited from the base Component class.
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
          <div className="text-center max-w-md">
            <h1 className="text-3xl font-bold mb-4">Ops! Algo deu errado.</h1>
            <p className="mb-6">Ocorreu um erro inesperado na aplicação. Por favor, tente recarregar a página.</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-bold transition-all"
            >
              Recarregar Página
            </button>
          </div>
        </div>
      );
    }

    // Fix: Access props property inherited from the base Component class to resolve 'Property props does not exist' error.
    return this.props.children;
  }
}
