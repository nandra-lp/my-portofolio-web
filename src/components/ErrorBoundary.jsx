import React from "react";
import { Link } from "react-router-dom";

/**
 * Menangkap error render di subtree-nya agar satu route yang gagal
 * (mis. lazy chunk gagal dimuat) tidak membuat seluruh aplikasi blank.
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    if (import.meta.env.DEV) {
      console.error("ErrorBoundary menangkap error:", error, info);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center"
        >
          <h2 className="heading-3">Ups, ada yang tidak beres.</h2>
          <p className="body max-w-md">
            Halaman gagal dimuat. Coba muat ulang, atau kembali ke beranda.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="btn-secondary"
            >
              Muat Ulang
            </button>
            <Link to="/" onClick={this.handleReset} className="btn-primary">
              Ke Beranda
            </Link>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
