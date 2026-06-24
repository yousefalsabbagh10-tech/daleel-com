import { lazy } from 'react';

export const HomePage = lazy(() => import('../pages/Home').then(m => ({ default: m.HomePage })));
export const FeaturedPage = lazy(() => import('../pages/Featured').then(m => ({ default: m.FeaturedPage })));
export const NotificationsPage = lazy(() => import('../pages/Notifications').then(m => ({ default: m.NotificationsPage })));
export const LoginPage = lazy(() => import('../pages/Login').then(m => ({ default: m.LoginPage })));
export const CarBrandsPage = lazy(() => import('../pages/CarBrands').then(m => ({ default: m.CarBrandsPage })));
export const BrandModelsPage = lazy(() => import('../pages/BrandModels').then(m => ({ default: m.BrandModelsPage })));
export const AdminDashboard = lazy(() => import('../pages/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
export const RealEstateSubcategoriesPage = lazy(() => import('../pages/RealEstateSubcategories').then(m => ({ default: m.RealEstateSubcategoriesPage })));
export const AdsListPage = lazy(() => import('../pages/AdsList').then(m => ({ default: m.AdsListPage })));
export const CreateAdPage = lazy(() => import('../pages/CreateAd').then(m => ({ default: m.CreateAdPage })));
export const FavoritesPage = lazy(() => import('../pages/Favorites').then(m => ({ default: m.FavoritesPage })));
export const CalculatorsPage = lazy(() => import('../pages/Calculators').then(m => ({ default: m.CalculatorsPage })));
export const PriceIndexerPage = lazy(() => import('../pages/PriceIndexer').then(m => ({ default: m.PriceIndexerPage })));
