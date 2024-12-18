<?php

namespace App\Http\Controllers\Seller;

use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Resources\ParentCategoryResource;
use App\Models\Category;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\URL;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Reports;
use App\Models\Seller;
use App\Models\User;

class ReportsController extends Controller
{
    protected $title = "Reports";
    protected $model;

    public function __construct()
    {
        $this->model = new Reports();
    }

    public function index(Request $request)
    {
        return Inertia::render('Admin/Reports/Index');
    }

    public function create()
    {
        return Inertia::render('Admin/Reports/Create');
    }

    public function store(Request $request) {}
    public function show($id)
    {
        return Inertia::render('Admin/Reports/Show');
    }
    public function edit($id)
    {
        return Inertia::render('Admin/Reports/Edit');
    }
    public function update(Request $request, $id) {}
    public function destroy($id) {}


    public function commission_history(Request $request)
    {
        $sellers = Seller::get();
        return Inertia::render('Admin/Reports/CommissionHistory', [
            'sellers' => $sellers
        ]);
    }

    public function earning_report(Request $request)
    {
        return Inertia::render('Admin/Reports/EarningReport');
    }

    public function inhouse_product_sale(Request $request)
    {
        $categories = ParentCategoryResource::collection(Category::where('parent_id', 0)->where('digital', 0)->with(['childrenCategories', 'childrenCategories.categories'])->get());
        return Inertia::render('Admin/Reports/InhouseProductsale', [
            'categories' => $categories
        ]);
    }

    public function products_stock(Request $request)
    {
        $categories = ParentCategoryResource::collection(Category::where('parent_id', 0)->where('digital', 0)->with(['childrenCategories', 'childrenCategories.categories'])->get());
        return Inertia::render('Admin/Reports/ProductsStock', [
            'categories' => $categories
        ]);
    }

    public function products_wishlist(Request $request)
    {
        $categories = ParentCategoryResource::collection(Category::where('parent_id', 0)->where('digital', 0)->with(['childrenCategories', 'childrenCategories.categories'])->get());
        return Inertia::render('Admin/Reports/ProductsWishlist', [
            'categories' => $categories
        ]);
    }

    public function seller_product_sale(Request $request)
    {
        return Inertia::render('Admin/Reports/SellerProductsale');
    }

    public function user_searches(Request $request)
    {
        return Inertia::render('Admin/Reports/UserSearches');
    }

    public function wallet_recharge_history(Request $request)
    {
        $users = User::get();
        return Inertia::render('Admin/Reports/WalletRechargeHistory', [
            'users' => $users
        ]);
    }
}
