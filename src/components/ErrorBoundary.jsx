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
          <h2 className="text-2xl font-semibold text-white">
            Ups, ada yang tidak beres.
          </h2>
          <p className="max-w-md text-slate-400">
            Halaman gagal dimuat. Coba muat ulang, atau kembali ke beranda.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-xl border border-white/10 bg-white/10 px-6 py-3 font-medium text-white transition-all hover:border-amber-500/30 hover:bg-amber-500/10 hover:text-amber-400"
            >
              Muat Ulang
            </button>
            <Link
              to="/"
              onClick={this.handleReset}
              className="rounded-xl bg-amber-500 px-6 py-3 font-semibold text-black transition-all hover:bg-amber-400"
            >
              Ke Beranda
            </Link>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
