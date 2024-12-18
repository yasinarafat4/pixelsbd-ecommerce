<?php

use App\Http\Controllers\Api\AddonController;
use App\Http\Controllers\Api\AddressController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BrandController;
use App\Http\Controllers\Api\BusinessSettingsController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ColorController;
use App\Http\Controllers\Api\CouponController;
use App\Http\Controllers\Api\CurrencyController;
use App\Http\Controllers\Api\FlashDealController;
use App\Http\Controllers\Api\PasswordResetController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\SellerController;
use App\Http\Controllers\Api\SliderController;
use App\Http\Controllers\Api\SubCategoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::group(['middleware' => ['throttle:100,1']], function () {
    Route::group(['prefix' => 'auth', 'middleware' => ['app_language']], function () {

        Route::post('info', [AuthController::class, 'getUserInfoByAccessToken']);
        Route::controller(AuthController::class)->group(function () {
            Route::post('login', 'login');
            Route::post('signup', 'signup');
            Route::post('social-login', 'socialLogin');
        });

        Route::middleware('auth:sanctum')->group(function () {
            Route::controller(AuthController::class)->group(function () {
                Route::get('logout', 'logout');
                Route::get('user', 'user');
                Route::get('account-deletion', 'account_deletion');
                Route::get('resend_code', 'resendCode');
                Route::post('confirm_code', 'confirmCode');
            });
        });
        Route::controller(PasswordResetController::class)->group(function () {
            Route::post('password/forget_request', 'forgetRequest');
            Route::post('password/confirm_reset', 'confirmReset');
            Route::post('password/resend_code', 'resendCode');
        });
    });

    Route::get('/business-settings', [BusinessSettingsController::class, 'business_settings']);
    Route::get('/colors', [ColorController::class, 'colors']);
    Route::get('/currencies', [CurrencyController::class, 'currencies']);
    Route::get('/addon-list', [AddonController::class, 'addon_list']);

    Route::get('/flash-deals/featured', [FlashDealController::class, 'featured_flash_deals']);
    Route::get('/flash-deals', [FlashDealController::class, 'flash_deals']);
    Route::get('flash-deals/info/{slug}', [FlashDealController::class, 'info']);
    Route::get('flash-deal-products/{id}', [FlashDealController::class, 'flash_deal_products']);

    Route::get('/sliders', [SliderController::class, 'sliders']);

    Route::get('/banners-one', [SliderController::class, 'bannerOne']);
    Route::get('/banners-two', [SliderController::class, 'bannerTwo']);
    Route::get('/banners-three', [SliderController::class, 'bannerThree']);


    Route::get('category/info/{slug}', [CategoryController::class, 'info']);
    Route::get('categories/featured', [CategoryController::class, 'featured']);
    Route::get('categories/home', [CategoryController::class, 'home']);
    Route::get('categories/top', [CategoryController::class, 'top']);
    Route::apiResource('categories', CategoryController::class)->only('index');
    Route::get('sub-categories/{id}', [SubCategoryController::class, 'index'])->name('subCategories.index');


    Route::get('products/inhouse', [ProductController::class, 'inhouse']);
    Route::get('products/seller/{id}', [ProductController::class, 'seller']);
    Route::get('products/category/{slug}', [ProductController::class, 'categoryProducts'])->name('api.products.category');
    Route::get('products/sub-category/{id}', [ProductController::class, 'subCategory'])->name('products.subCategory');
    Route::get('products/sub-sub-category/{id}', [ProductController::class, 'subSubCategory'])->name('products.subSubCategory');
    Route::get('products/brand/{slug}', [ProductController::class, 'brand'])->name('api.products.brand');
    Route::get('products/todays-deal', [ProductController::class, 'todaysDeal']);
    Route::get('products/featured', [ProductController::class, 'featured']);
    Route::get('products/new-arrivals', [ProductController::class, 'newArrivals']);
    Route::get('products/top-rated', [ProductController::class, 'topRated']);
    Route::get('products/best-seller', [ProductController::class, 'bestSeller']);
    Route::get('/products/more-store-items/{product_id}/{user_id}/{user_type}', [ProductController::class, 'more_store_items']);
    Route::get('/products/similar-products/{product_id}/{category_id}', [ProductController::class, 'similar_products']);
    Route::get('products/top-from-seller/{slug}', [ProductController::class, 'topFromSeller']);
    Route::get('products/frequently-bought/{slug}', [ProductController::class, 'frequentlyBought'])->name('products.frequently_bought');

    Route::get('products/featured-from-seller/{id}', [ProductController::class, 'newFromSeller'])->name('products.featuredromSeller');
    Route::get('products/search', [ProductController::class, 'search']);
    Route::post('products/variant/price', [ProductController::class, 'getPrice']);
    Route::get('products/digital', [ProductController::class, 'digital'])->name('products.digital');
    Route::apiResource('products', ProductController::class)->except(['store', 'update', 'destroy']);

    Route::get('products/{slug}/{user_id}',  [ProductController::class, 'product_details']);

    Route::get('seller/top', [SellerController::class, 'topSellers']);
    Route::get('all-sellers', [SellerController::class, 'getSellers'])->name('allSellers');

    Route::get('brands/top', [BrandController::class, 'top']);
    Route::get('all-brands', [BrandController::class, 'getBrands'])->name('allBrands');
    Route::apiResource('brands', BrandController::class)->only('index');

    Route::get('coupon', [CouponController::class, 'coupon'])->name('coupon');

    Route::get('cities', [AddressController::class, 'getCities']);
    Route::get('states', [AddressController::class, 'getStates']);
    Route::get('countries', [AddressController::class, 'getCountries']);

    Route::get('cities-by-state/{state_id}', [AddressController::class, 'getCitiesByState']);
    Route::get('states-by-country/{country_id}', [AddressController::class, 'getStatesByCountry']);

    // Route::post('/add-to-wish-list', [ProductController::class, 'add_to_wish_list'])->name('add_to_wish_list');
});
