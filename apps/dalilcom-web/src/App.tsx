/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AdsProvider } from './context/AdsContext';
import { Layout } from './components/Layout';
import { PageLoader } from './components/organisms/PageLoader';
import {
  AdminDashboard, AdsListPage, BrandModelsPage, CalculatorsPage, CarBrandsPage,
  CreateAdPage, FavoritesPage, FeaturedPage, HomePage, LoginPage,
  NotificationsPage, PriceIndexerPage, RealEstateSubcategoriesPage, MapPage
} from './routes/lazyPages';

function KeyboardShortcuts() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Ctrl + Q (or Meta + Q)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'q') {
        e.preventDefault();
        navigate('/admin');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <AdsProvider>
        <BrowserRouter>
          <KeyboardShortcuts />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="featured" element={<FeaturedPage />} />
                <Route path="notifications" element={<NotificationsPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="cars/brands" element={<CarBrandsPage />} />
                <Route path="cars/brands/:brandId" element={<BrandModelsPage />} />
                <Route path="real-estate/:categoryId" element={<RealEstateSubcategoriesPage />} />
                <Route path="ads" element={<AdsListPage />} />
                <Route path="create-ad" element={<CreateAdPage />} />
                <Route path="favorites" element={<FavoritesPage />} />
                <Route path="calculators" element={<CalculatorsPage />} />
                <Route path="price-index" element={<PriceIndexerPage />} />
                <Route path="map" element={<MapPage />} />
              </Route>
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AdsProvider>
    </AuthProvider>
  );
}
