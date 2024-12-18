import BestSellingAndTopRated from '@/Components/BestSellingAndTopRated/BestSellingAndTopRated';
import CategoryAndSlider from '@/Components/CategoryAndSlider/CategoryAndSlider';
import CategoryItemLazyLoadedComponentWithSkeleton from '@/Components/Skeletons/CategoryItemLazyLoadedComponentWithSkeleton';
import FeaturedCategoriesLazyLoadedComponentWithSkeleton from '@/Components/Skeletons/FeaturedCategoriesLazyLoadedComponentWithSkeleton';
import FeaturedFlashDealLazyLoadedComponentWithSkeleton from '@/Components/Skeletons/FeaturedFlashDealLazyLoadedComponentWithSkeleton';
import FeaturedProductsLoadedComponentWithSkeleton from '@/Components/Skeletons/FeaturedProductsLoadedComponentWithSkeleton';
import HomeBenefitsLazyLoadedComponentWithSkeleton from '@/Components/Skeletons/HomeBenefitsLazyLoadedComponentWithSkeleton';
import NewArrivalsLazyLoadedComponentWithSkeleton from '@/Components/Skeletons/NewArrivalsLazyLoadedComponentWithSkeleton';
import OfferBannerOneLazyLoadedComponentWithSkeleton from '@/Components/Skeletons/OfferBannerOneLazyLoadedComponentWithSkeleton';
import OfferBannerThreeLazyLoadedComponentWithSkeleton from '@/Components/Skeletons/OfferBannerThreeLazyLoadedComponentWithSkeleton';
import OfferBannerTwoLazyLoadedComponentWithSkeleton from '@/Components/Skeletons/OfferBannerTwoLazyLoadedComponentWithSkeleton';
import TodaysDealLazyLoadedComponentWithSkeleton from '@/Components/Skeletons/TodaysDealLazyLoadedComponentWithSkeleton';
import TopBrandsLazyLoadedComponentWithSkeleton from '@/Components/Skeletons/TopBrandsLazyLoadedComponentWithSkeleton';
import TopSellersLazyLoadedComponentWithSkeleton from '@/Components/Skeletons/TopSellersLazyLoadedComponentWithSkeleton';
import DefaultThemeLayout from '@/Layouts/DefaultThemeLayout';
import { Head, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { useCart } from 'react-use-cart';


export default function Home() {
    const { carts, benefits, featuredFlashDealCount, featuredCategoriesCount, todaysDealCount,featuredProductsCount, offerBannerOneCount, offerBannerTwoCount, offerBannerThreeCount, topSellersCount } = usePage().props

    const { setItems, emptyCart } = useCart();

    useEffect(() => {
        if (carts?.length > 0) {
            setItems(carts)
        } else {
            emptyCart()
        }
    }, [])


    return (
        <DefaultThemeLayout>
            <div className='space-y-3'>
                <Head title="Home" />
                {/* Category And Slider */}
                <CategoryAndSlider />

                {/* Benifits Tab For Small Devices */}
                <div className='hidden lg:block'><HomeBenefitsLazyLoadedComponentWithSkeleton benefits={benefits} /></div>

                {/* Featured FlashDeal*/}
                {featuredFlashDealCount > 0 && <FeaturedFlashDealLazyLoadedComponentWithSkeleton />}

                {/* Featured Categories*/}
                {featuredCategoriesCount > 0 && <FeaturedCategoriesLazyLoadedComponentWithSkeleton />}

                {/* Todays Deal*/}
                {todaysDealCount > 0 && <TodaysDealLazyLoadedComponentWithSkeleton />}

                {/* Offer Banner One*/}
                {offerBannerOneCount > 0 && <OfferBannerOneLazyLoadedComponentWithSkeleton />}

                {/* Featured Products*/}
                {featuredProductsCount> 0 && <FeaturedProductsLoadedComponentWithSkeleton />}

                {/* New Arrivals*/}
                {<NewArrivalsLazyLoadedComponentWithSkeleton />}

                {/* BestSelling & TopRated*/}
                <BestSellingAndTopRated />

                {/* Offer Banner Two*/}
                {offerBannerTwoCount > 0 && <OfferBannerTwoLazyLoadedComponentWithSkeleton />}

                {/* Category Item*/}
                <CategoryItemLazyLoadedComponentWithSkeleton />

                {/* Top Sellers*/}
                {topSellersCount > 0 && <TopSellersLazyLoadedComponentWithSkeleton />}

                {/* Offer Banner Three*/}
                {offerBannerThreeCount > 0 && <OfferBannerThreeLazyLoadedComponentWithSkeleton />}

                {/* Top Brands*/}
                <TopBrandsLazyLoadedComponentWithSkeleton />

                {/* Benifits Tab For Small Devices */}
                <div className='lg:hidden'><HomeBenefitsLazyLoadedComponentWithSkeleton benefits={benefits} /></div>
            </div>
        </DefaultThemeLayout >
    )
}
