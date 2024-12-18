<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\CommissionHistoryResource;
use App\Http\Resources\Admin\ParentCategoryResource;
use App\Models\Brand;
use App\Models\Category;
use App\Models\CommissionHistory;
use App\Models\Order;
use App\Models\Payment;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Reports;
use App\Models\Seller;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

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
        $seller_id = null;
        $date_range = null;

        if (Auth::user()->user_type == 'seller') {
            $seller_id = Auth::user()->id;
        }
        if ($request->seller_id) {
            $seller_id = $request->seller_id;
        }

        $commission_history = CommissionHistory::orderBy('created_at', 'desc');

        if ($request->date_range) {
            $date_range = $request->date_range;
            $date_range1 = explode(" / ", $request->date_range);
            $commission_history = $commission_history->where('created_at', '>=', $date_range1[0]);
            $commission_history = $commission_history->where('created_at', '<=', $date_range1[1]);
        }
        if ($seller_id) {

            $commission_history = $commission_history->where('seller_id', '=', $seller_id);
        }

        $commission_history = CommissionHistoryResource::collection($commission_history->paginate(15));
        $sellers = Seller::get();
        return Inertia::render('Admin/Reports/CommissionHistory', [
            'sellers' => $sellers,
            'commission_history' => $commission_history
        ]);
    }

    public function earning_report(Request $request)
    {
        $data['total_sale'] = Order::where('delivery_status', 'delivered')->sum('grand_total');
        $data['sale_this_month'] = Order::where('delivery_status', 'delivered')->whereMonth('created_at', Carbon::now()->month)->sum('grand_total');

        $this_year_sales_raw = DB::table('orders')
            ->select(
                DB::raw('DATE_FORMAT(created_at, "%b") as month'),
                DB::raw('SUM(grand_total) as total_sale')
            )
            ->whereYear('created_at', Carbon::now()->year)
            ->where('delivery_status', 'delivered')
            ->groupBy(DB::raw('DATE_FORMAT(created_at, "%b")'))
            ->orderBy(DB::raw('MONTH(created_at)'))
            ->get();

        $data['this_year_sales'] = get_sales_data_by_month($this_year_sales_raw);

        $previous_year_sales_raw = DB::table('orders')
            ->select(
                DB::raw('DATE_FORMAT(created_at, "%b") as month'),
                DB::raw('SUM(grand_total) as total_sale')
            )
            ->whereYear('created_at', Carbon::now()->subYear()->year)
            ->where('delivery_status', 'delivered')
            ->groupBy(DB::raw('DATE_FORMAT(created_at, "%b")'))
            ->orderBy(DB::raw('MONTH(created_at)'))
            ->get();

        $data['previous_year_sales'] = get_sales_data_by_month($previous_year_sales_raw);

        $data['total_payouts_amount'] = Payment::where('payment_method', '!=', 'Seller paid to admin')->sum('amount');
        $data['payouts_this_month'] = Payment::where('payment_method', '!=', 'Seller paid to admin')->whereMonth('created_at', Carbon::now()->month)->sum('amount');

        $this_year_payouts_raw = DB::table('payments')
            ->select(
                DB::raw('DATE_FORMAT(created_at, "%b") as month'),
                DB::raw('SUM(amount) as total')
            )
            ->whereYear('created_at', Carbon::now()->year)
            ->where('payment_method', '!=', 'Seller paid to admin')
            ->groupBy(DB::raw('DATE_FORMAT(created_at, "%b")'))
            ->orderBy(DB::raw('MONTH(created_at)'))
            ->get();

        $data['this_year_payouts'] = get_sales_data_by_month($this_year_payouts_raw);

        $previous_year_payouts_raw = DB::table('payments')
            ->select(
                DB::raw('DATE_FORMAT(created_at, "%b") as month'),
                DB::raw('SUM(amount) as total')
            )
            ->whereYear('created_at', Carbon::now()->subYear()->year)
            ->where('payment_method', '!=', 'Seller paid to admin')
            ->groupBy(DB::raw('DATE_FORMAT(created_at, "%b")'))
            ->orderBy(DB::raw('MONTH(created_at)'))
            ->get();

        $data['previous_year_payouts'] = get_sales_data_by_month($previous_year_payouts_raw);

        $data['total_categories'] = Category::count();
        $data['top_categories'] = Product::select('categories.name', 'categories.id', DB::raw('SUM(grand_total) as total'))
            ->leftJoin('order_details', 'order_details.product_id', '=', 'products.id')
            ->leftJoin('orders', 'orders.id', '=', 'order_details.order_id')
            ->leftJoin('categories', 'products.category_id', '=', 'categories.id')
            ->where('orders.delivery_status', 'delivered')
            ->groupBy('categories.id')
            ->orderBy('total', 'desc')
            ->limit(3)
            ->get();

        $data['total_brands'] = Brand::count();
        $data['top_brands'] = Product::select('brands.name', 'brands.id', DB::raw('SUM(grand_total) as total'))
            ->leftJoin('order_details', 'order_details.product_id', '=', 'products.id')
            ->leftJoin('orders', 'orders.id', '=', 'order_details.order_id')
            ->leftJoin('brands', 'products.brand_id', '=', 'brands.id')
            ->where('orders.delivery_status', 'delivered')
            ->groupBy('brands.id')
            ->orderBy('total', 'desc')
            ->limit(3)
            ->get();

        return Inertia::render('Admin/Reports/EarningReport', $data);
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
