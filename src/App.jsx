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
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:font-medium focus:text-white"
      >
        Lewati ke konten utama
      </a>
      <ScrollToTop />
      <div id="main-content" className="min-h-screen bg-background text-text">
        <ErrorBoundary>
          <Suspense
            fallback={
              <div
                role="status"
                className="flex h-screen w-full items-center justify-center text-muted animate-pulse"
              >
                Memuat…
              </div>
            }
          >
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
