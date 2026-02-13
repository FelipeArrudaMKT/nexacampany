
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  // Made children optional to fix 'missing children' error in App.tsx when used in JSX.
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Standard React Error Boundary component.
 * Explicitly extending React.Component ensures that the state and props types are correctly inherited.
 */
// Fix: Use React.Component instead of just Component to ensure property inheritance for 'state' and 'props' is correctly resolved by the TypeScript compiler.
export class ErrorBoundary extends React.Component<Props, State> {
  // Fix: Declare state as a class property with an initializer to resolve 'Property state does not exist' errors and avoid 'this' context issues in the constructor.
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    // Fix: Access state property inherited from the React.Component base class.
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

    // Fix: Access props property inherited from the React.Component base class.
    return this.props.children;
  }
}
