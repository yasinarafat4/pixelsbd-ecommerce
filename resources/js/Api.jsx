/* eslint-disable no-undef */
import axios from 'axios';

let debounceTimeout;
const debounce = (func, delay = 300) => {
    return (...args) => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            func(...args);
        }, delay);
    };
};

const api = axios.create({
    baseURL: '/api', // Set your API base URL
});

export const fetchCategoriesData = async () => {
    const { data } = await api.get('/categories');
    return data;
};

export const fetchSlidersData = async () => {
    const { data } = await api.get('/sliders');
    return data;
};

export const fetchFlashDealsData = async () => {
    const { data } = await api.get('/flash-deals');
    return data;
};

export const fetchFeaturedFlashDealData = async () => {
    const { data } = await api.get('/flash-deals/featured');
    return data;
};

export const fetchFeaturedCategoriesData = async () => {
    const { data } = await api.get('/categories/featured');
    return data;
};

export const fetchTodaysDealProductsData = async () => {
    const { data } = await api.get('/products/todays-deal');
    return data;
};


export const fetchFeaturedProductsData = async () => {
    const { data } = await api.get('/products/featured');
    return data;
};

export const fetchNewArrivalProductsData = async () => {
    const { data } = await api.get('/products/new-arrivals');
    return data;
};

export const fetchBestSellingProductsData = async () => {
    const { data } = await api.get('/products/best-seller');
    return data;
};

export const fetchTopRatedProductsData = async () => {
    const { data } = await api.get('/products/top-rated');
    return data;
};

export const fetchMoreStoreItemsData = async ({queryKey}) => {
    const [, product_id, user_id, user_type] = queryKey
    const { data } = await api.get(`/products/more-store-items/${product_id}/${user_id}/${user_type}`);
    return data;
};

export const fetchSimilarProductsData = async ({queryKey}) => {
    const [, product_id, category_id] = queryKey
    const { data } = await api.get(`/products/similar-products/${product_id}/${category_id}`);
    return data;
};

export const fetchHomeCategoriesData = async () => {
    const { data } = await api.get('/categories/home');
    return data;
};


export const fetchBannerOneData = async () => {
    const { data } = await api.get('/banners-one');
    return data;
};

export const fetchBannerTwoData = async () => {
    const { data } = await api.get('/banners-two');
    return data;
};

export const fetchBannerThreeData = async () => {
    const { data } = await api.get('/banners-three');
    return data;
};

export const fetchAllSellersData = async () => {
    const { data } = await api.get('/all-sellers');
    return data;
};

export const fetchTopSellersData = async () => {
    const { data } = await api.get('/seller/top');
    return data;
};

export const fetchAllBrandsData = async () => {
    const { data } = await api.get('/all-brands');
    return data;
};

export const fetchTopBrandsData = async () => {
    const { data } = await api.get('/brands/top');
    return data;
};

export const fetchCouponsData = async () => {
    const { data } = await api.get('/coupon');
    return data;
};





