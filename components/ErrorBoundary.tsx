
import React, { ErrorInfo, ReactNode } from 'react';

interface Props {
  // Made children optional to fix 'missing children' error in App.tsx when used in JSX.
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Extending React.Component directly and using class properties for state initialization 
 * ensures that TypeScript correctly identifies inherited properties like 'props' and 'state'.
 */
// Fix: Explicitly extend React.Component to resolve property access issues in TypeScript.
export class ErrorBoundary extends React.Component<Props, State> {
  // Fix: Initialize state as a class property to ensure correct property inference on the instance.
  state: State = {
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
