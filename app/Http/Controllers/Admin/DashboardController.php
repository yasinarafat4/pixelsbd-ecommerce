<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Addon;
use App\Models\Admin as Staff;
use App\Models\Admin;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Carbon\Carbon;
use Date;
use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Jackiedo\DotenvEditor\Facades\DotenvEditor;
use Laraeast\LaravelSettings\Facades\Settings;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        // return $activeAddon = Addon::active()->pluck('unique_identifier')->toJson();
        $admin = Admin::find(1);
        $admin->assignRole(['Super Admin']);
        // $root_categories = Category::where('level', 0)->get();
        $data['total_customers'] = User::count();
        $data['top_customers'] = User::select('users.id', 'users.name', 'users.image', DB::raw('SUM(grand_total) as total'))
            ->join('orders', 'orders.user_id', '=', 'users.id')
            ->groupBy('orders.user_id')
            ->orderBy('total', 'desc')
            ->limit(6)
            ->get();
        $data['total_products'] = Product::isApprovedPublished()->count();
        $data['total_inhouse_products'] = Product::isApprovedPublished()->where('added_by', 'admin')->count();
        $data['total_sellers_products'] = Product::isApprovedPublished()->where('added_by', '!=', 'admin')->count();
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
            // ->where('products.brand_id', '!=', 0)
            ->whereRaw('products.brand_id != 0 or products.brand_id != null')
            ->groupBy('brands.id')
            ->orderBy('total', 'desc')
            ->limit(3)
            ->get();

        $data['total_sale'] = Order::where('delivery_status', 'delivered')->sum('grand_total');
        $data['sale_this_month'] = Order::where('delivery_status', 'delivered')->whereMonth('created_at', Carbon::now()->month)->sum('grand_total');
        $data['admin_sale_this_month'] = Order::select(DB::raw('COALESCE(SUM(grand_total), 0) as total_sale'))
            ->leftJoin('admins', 'orders.seller_id', '=', 'admins.id')
            ->where('orders.seller_type', 'admin')
            ->where('delivery_status', 'delivered')
            ->whereMonth('orders.created_at', Carbon::now()->month)
            ->first();
        $data['seller_sale_this_month'] = Order::select(DB::raw('COALESCE(SUM(grand_total), 0) as total_sale'))
            ->leftJoin('sellers', 'orders.seller_id', '=', 'sellers.id')
            ->where('orders.seller_type', 'seller')
            ->where('delivery_status', 'delivered')
            ->whereMonth('orders.created_at', Carbon::now()->month)
            ->first();

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

        $data['total_order'] = Order::count();
        $data['total_placed_order'] = Order::where('delivery_status', '!=', 'cancelled')->count();
        $data['total_pending_order'] = Order::where('delivery_status', 'pending')->count();
        $data['total_confirmed_order'] = Order::where('delivery_status', 'confirmed')->count();
        $data['total_picked_up_order'] = Order::where('delivery_status', 'picked_up')->count();
        $data['total_shipped_order'] = Order::where('delivery_status', 'on_the_way')->count();

        $data['total_inhouse_sale'] = Order::where("seller_type", "admin")->where('delivery_status', 'delivered')->sum('grand_total');
        $data['payment_type_wise_inhouse_sale'] = Order::select(DB::raw('case
                                                    when payment_type in ("wallet") then "wallet"
                                                    when payment_type NOT in ("cash_on_delivery") then "others"
                                                    else cast(payment_type as char)
                                                    end as payment_type, SUM(grand_total)  as total_amount'),)
            ->where("user_id", '!=', null)
            ->where("seller_type", "admin")
            ->groupBy(DB::raw('1'))
            ->get();
        $data['inhouse_product_rating'] = Product::where('added_by', 'admin')->where('rating', '!=', 0)->avg('rating');
        $data['total_inhouse_order'] = Order::where("seller_type", "admin")->count();
        $data['total_inhouse_pending_order'] = Order::where("seller_type", "admin")->where('delivery_status', 'pending')->count();

        $data['env_data'] = DotenvEditor::getKeys(['MAIL_USERNAME', 'MAIL_PASSWORD']);

        return Inertia::render('Admin/Dashboard/Index', $data);
    }

    public function inhouse_top_categories(Request $request)
    {
        $inhouse_top_category_query = Order::query();
        $inhouse_top_category_query->select('categories.id', 'categories.name', 'categories.icon', DB::raw('SUM(grand_total) as total'))
            ->leftJoin('order_details', 'orders.id', '=', 'order_details.order_id')
            ->leftJoin('products', 'order_details.product_id', '=', 'products.id')
            ->leftJoin('categories', 'products.category_id', '=', 'categories.id')
            ->where('orders.delivery_status', '=', 'delivered')
            ->whereRaw('products.added_by = "admin"');
        if ($request->interval_type != 'all') {
            $inhouse_top_category_query->where('orders.created_at', '>=', DB::raw('DATE_SUB(NOW(), INTERVAL 1 ' . $request->interval_type . ')'));
        }
        $inhouse_top_categories = $inhouse_top_category_query->groupBy('categories.name')
            ->orderBy('total', 'desc')
            ->limit(4)
            ->get();

        return $inhouse_top_categories;
    }

    public function inhouse_top_brands(Request $request)
    {
        $inhouse_top_brand_query = Order::query();
        $inhouse_top_brand_query->select('brands.id', 'brands.name', 'brands.logo', DB::raw('SUM(grand_total) as total'))
            ->leftJoin('order_details', 'orders.id', '=', 'order_details.order_id')
            ->leftJoin('products', 'order_details.product_id', '=', 'products.id')
            ->leftJoin('brands', 'products.brand_id', '=', 'brands.id')
            ->where('orders.delivery_status', '=', 'delivered')
            // ->where('products.brand_id', '!=', 0)
            ->whereRaw('products.brand_id != 0 or products.brand_id != null')
            ->whereRaw('products.added_by = "admin"');
        if ($request->interval_type != 'all') {
            $inhouse_top_brand_query->where('orders.created_at', '>=', DB::raw('DATE_SUB(NOW(), INTERVAL 1 ' . $request->interval_type . ')'));
        }
        $inhouse_top_brands = $inhouse_top_brand_query->groupBy('brands.name')
            ->orderBy('total', 'desc')
            ->limit(4)
            ->get();
        return $inhouse_top_brands;
    }

    public function top_sellers_products_section(Request $request)
    {
        $top_sellers_query = Order::query();
        $top_sellers_query = Order::select('shops.seller_id AS shop_id', 'shops.name AS shop_name', 'shops.logo', DB::raw('SUM(grand_total) AS sale'))
            ->join('shops', 'orders.seller_id', '=', 'shops.seller_id')
            ->where('orders.delivery_status', 'delivered')
            ->groupBy('orders.seller_id')
            ->orderBy('sale', 'desc');
        if ($request->interval_type != 'all') {
            $top_sellers_query->where('orders.created_at', '>=', DB::raw('DATE_SUB(NOW(), INTERVAL 1 ' . $request->interval_type . ')'));
        }

        $top_sellers = $top_sellers_query->get();

        foreach ($top_sellers as $key => $row) {
            $products_query = Product::query();
            $products_query->select('products.id AS product_id', 'products.name', 'products.slug AS product_slug', 'products.thumbnail_image', DB::raw('SUM(quantity) AS total_quantity, SUM(price * quantity) AS sale'))
                ->join('order_details', 'order_details.product_id', '=', 'products.id')
                ->where("seller_id", $row->shop_id)
                ->where('order_details.delivery_status', 'delivered')
                ->where('products.approved', 1)
                ->where('products.published', 1);
            if ($request->interval_type != 'all') {
                $products_query->where('order_details.created_at', '>=', DB::raw('DATE_SUB(NOW(), INTERVAL 1 ' . $request->interval_type . ')'));
            }
            $products_query->groupBy('product_id')
                ->orderBy('sale', 'desc')
                ->limit(3);
            $row->products = $products_query->get();
        }
        return $top_sellers;
    }

    public function admin_profile()
    {
        return Inertia::render('Admin/Dashboard/AdminProfile');
    }

    public function admin_profile_update(Request $request, $id)
    {
        DB::beginTransaction();
        $staff = Staff::find($id);
        try {
            $staff->name = $request->name;
            $staff->email = $request->email;
            $staff->phone = $request->phone;
            $staff->image = $request->image;
            if ($request->password) {
                $staff->password = Hash::make($request->password);
            }
            $staff->save();
            DB::commit();
            return back()->with('success', 'Profile updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Something went wrong!!!' . $e);
        }
    }


    public function password_update(Request $request)
    {
        $admin = Staff::find(auth('admin')->user()->id);
        if (Hash::check($request->old_password, $admin->password)) {
            $admin->update(['password' => Hash::make($request->new_password)]);
            return back()->with('success', 'Password updated Successfully!');
        } else {
            return back()->with('error', 'Old password did not matched!');
        }
    }

    public function last_check(Request $request)
    {
        Settings::set('last_check', Carbon::now());
    }
}
