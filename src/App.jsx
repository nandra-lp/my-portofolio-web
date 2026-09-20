import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

const Project = React.lazy(() => import("./pages/Project"));
const Playground = React.lazy(() => import("./pages/Playground"));

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-linear-to-b from-gray-950 via-black to-gray-950 text-white">
        {/* Background texture */}
        <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,...')] opacity-5 pointer-events-none" />

        <Suspense fallback={<div className="flex h-screen w-full items-center justify-center text-zinc-400 animate-pulse">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project" element={<Project />} />
            <Route path="/playground" element={<Playground />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}
