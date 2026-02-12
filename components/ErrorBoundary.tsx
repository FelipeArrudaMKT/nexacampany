
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  // Made children optional to fix 'missing children' error in App.tsx when used in JSX.
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Extending React.Component explicitly ensure the TypeScript compiler correctly 
 * identifies inherited properties like 'props' and 'state', which can sometimes 
 * be misidentified when using destructured imports in certain environments.
 */
// Fix: Explicitly extending React.Component with generic Props and State ensures this.props is available.
// Adding an explicit constructor also helps stabilize inheritance metadata for TypeScript.
export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
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

    // Inherited from React.Component, this.props is now correctly recognized.
    return this.props.children;
  }
}
