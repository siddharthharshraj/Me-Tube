import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import Body from "./components/Body";
import Head from "./components/Head";
import store from "./utils/store";
import { Provider } from "react-redux";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import LoadingSpinner from "./components/LoadingSpinner";
import Footer from "./components/Footer";

// Lazy load components for code splitting
const WatchPage = lazy(() => import("./components/WatchPage"));
const MetricsPage = lazy(() => import("./components/MetricsPage"));

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200 flex flex-col">
        <Head />
        <div className="flex-1">
          <Suspense fallback={<LoadingSpinner text="Loading..." />}>
            <Body />
          </Suspense>
        </div>
        <Footer />
      </div>
    ),
  },
  {
    path: "/watch",
    element: (
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200 flex flex-col">
        <Head />
        <div className="flex-1">
          <Suspense fallback={<LoadingSpinner text="Loading video..." />}>
            <WatchPage />
          </Suspense>
        </div>
        <Footer />
      </div>
    ),
  },
  {
    path: "/metrics",
    element: (
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200 flex flex-col">
        <Suspense fallback={<LoadingSpinner text="Loading metrics..." />}>
          <MetricsPage />
        </Suspense>
      </div>
    ),
  },
]);
function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ErrorBoundary>
          <RouterProvider router={appRouter} />
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
