'use client';

import { Component, ErrorInfo, ReactNode } from 'react';
import { Z_INDEX, COLORS, FONTS, SPACING } from './constants';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: undefined,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Lab Page Error:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: COLORS.slate[950],
            zIndex: Z_INDEX.introOverlay,
            fontFamily: FONTS.mono,
            color: COLORS.slate[50],
            textAlign: 'center',
            padding: SPACING['2xl'],
          }}
        >
          <div>
            <h2
              style={{
                fontSize: '18px',
                fontWeight: 700,
                marginBottom: SPACING.md,
                color: COLORS.amber[400],
              }}
            >
              Lab Experience Unavailable
            </h2>
            <p
              style={{
                fontSize: '11px',
                color: COLORS.alpha.textNormal,
                marginBottom: SPACING.lg,
                lineHeight: 1.6,
              }}
            >
              The Three.js wormhole tunnel encountered an error.<br />
              This may be due to browser compatibility or WebGL support.
            </p>
            <button
              onClick={this.handleRetry}
              style={{
                background: COLORS.amber[400],
                color: COLORS.slate[900],
                border: 'none',
                padding: `${SPACING.sm} ${SPACING.xl}`,
                fontFamily: FONTS.mono,
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                cursor: 'pointer',
                transition: 'all 200ms ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.9';
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              RETRY
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
