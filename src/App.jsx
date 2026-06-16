import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import AppLayout from '@/components/layout/AppLayout';
import Home from '@/pages/Home';
import Listings from '@/pages/Listings';
import PropertyDetail from '@/pages/PropertyDetail';
import ListProperty from '@/pages/ListProperty';
import Favorites from '@/pages/Favorites';
import { getFirebaseConfigError, isFirebaseConfigured } from '@/lib/firebase';

function ConfigMissingError({ message }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
      <div className="max-w-md text-center space-y-4">
        <h1 className="text-xl font-semibold text-slate-800">Configuration required</h1>
        <p className="text-slate-600 text-sm leading-relaxed">{message}</p>
        <p className="text-slate-500 text-xs">
          Copy <code className="bg-slate-100 px-1 rounded">src/.env.example</code> to{' '}
          <code className="bg-slate-100 px-1 rounded">src/.env</code> and add your Firebase web app config.
          See <code className="bg-slate-100 px-1 rounded">firebase/README.md</code> for setup steps.
        </p>
      </div>
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
        <Route path="/list-property" element={<ListProperty />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}

function App() {
  if (!isFirebaseConfigured()) {
    return <ConfigMissingError message={getFirebaseConfigError()} />;
  }

  return (
    <QueryClientProvider client={queryClientInstance}>
      <Router>
        <AppRoutes />
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App
