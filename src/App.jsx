import React, { Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";

const Home = React.lazy(() => import("./pages/Home"));
const Project = React.lazy(() => import("./pages/Project"));
const Playground = React.lazy(() => import("./pages/Playground"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-amber-500 focus:px-4 focus:py-2 focus:font-medium focus:text-black"
      >
        Lewati ke konten utama
      </a>
      <ScrollToTop />
      <div
        id="main-content"
        className="min-h-screen bg-linear-to-b from-slate-950 via-black to-slate-950 text-white"
      >
        {/* Background texture */}
        <div
          aria-hidden="true"
          className="fixed inset-0 bg-[url('data:image/svg+xml;base64,...')] opacity-5 pointer-events-none"
        />

        <ErrorBoundary>
          <Suspense fallback={<div className="flex h-screen w-full items-center justify-center text-slate-400 animate-pulse">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/project" element={<Project />} />
              <Route path="/playground" element={<Playground />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </div>
    </BrowserRouter>
  );
}
