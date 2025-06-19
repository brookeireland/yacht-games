import * as React from "react";

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  { hasError: boolean }
> {
  constructor(props: {}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: unknown) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: unknown) {
    console.log(error, info, React.captureOwnerStack());
  }

  render() {
    if (this.state.hasError) {
      return (
        <pre
          onClick={() => {
            this.setState({ hasError: false });
          }}
        >
          ERROR
        </pre>
      );
    }

    return this.props.children;
  }
}
