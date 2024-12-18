<?php

namespace Database\Seeders;

use App\Models\Admin;
use DB;
use Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // DB::table('admins')->delete();
        // $admin = Admin::create([
        //     'name' => 'Super Admin',
        //     'email'    => 'superadmin@gmail.com',
        //     'phone'    => '880178239224',
        //     'password' => Hash::make('password'),
        // ]);
        $admin = Admin::where('email', 'superadmin@gmail.com')->first();
        DB::table('roles')->delete();
        $superAdmin = Role::create(['name' => 'Super Admin', 'guard_name' => 'admin']);
        $admin->assignRole('Super Admin');

        DB::table('permissions')->delete();
        $permissionsData = [
            [
                'name' => 'Dashboard',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Products',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'All Products',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'In House Products',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Seller Products',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Bulk Import',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Bulk Export',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Create Product',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Edit Product',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Clone Product',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Delete Product',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Categories',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Create Category',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Edit Category',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Delete Category',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Category Based Discount',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Brands',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Create Brand',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Edit Brand',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Delete Brand',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Colors',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Create Colors',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Edit Colors',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Delete Colors',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Attributes',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Create Attribute',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Edit Attribute',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Delete Attribute',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Attribute Values',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Create Attribute Values',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Edit Attribute Values',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Delete Attribute Values',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Product Reviews',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Orders',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'All Orders',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Inhouse Orders',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Seller Orders',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Edit Order',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Delete Order',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Delivery Boy',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'All Delivery Boys',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Payment Histories',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Collected Histories',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Delivery Boy Cancel Request',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Delivery Boy Configuration',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Customers',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'All Customers',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Create Customer',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Edit Customer',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Delete Customer',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Sellers',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'All Sellers',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Create Seller',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Edit Seller',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Delete Seller',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Seller Payouts',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Seller Payout Requests',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Seller Commission',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Seller Verification Form',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Reports',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Earning Report',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Inhouse Productsale',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Seller Productsale',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Products Stock',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Products Wishlist',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'User Searches',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Commission History',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Wallet Recharge History',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Blogs',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'All Blogs',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Blog Categories',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Staffs',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'All Staffs',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Role',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Flash Deals',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Dynamic Pop-up',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Custom Alerts',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Newsletters',
                'guard_name' => 'admin'
            ],

            [
                'name' => 'Notifications',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Notification Settings',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Notification Types',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Custom Notification',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Custom Notification History',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Bulk SMS',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Subscribers',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Coupons',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Support',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Support Tickets',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Product Conversations',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Product Queries',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Contact Messages',
                'guard_name' => 'admin'
            ],

            [
                'name' => 'OTP System',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'OTP Configuration',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'SMS Templates',
                'guard_name' => 'admin'
            ],

            [
                'name' => 'Website Setup',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Appearance',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Homepage Settings',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Select Theme',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Website Pages',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Website Header',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Website Footer',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Benefits',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Website Contact',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Setup Configurations',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Features Activation',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Language',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Currency',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'SMTP Settings',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Payment Methods',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Social Media Logins',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Facebook',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Google',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Pusher',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Shipping',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Shipping Configuration',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Shipping Countries',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Shipping States',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Shipping Cities',
                'guard_name' => 'admin'
            ],

            [
                'name' => 'System',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Update',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Server Status',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Addon Manager',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Uploaded Files',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Marketing',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Installed Addons',
                'guard_name' => 'admin'
            ],
            [
                'name' => 'Available Addons',
                'guard_name' => 'admin'
            ],
        ];

        Permission::insert($permissionsData);
        $superAdmin->givePermissionTo(Permission::all());
    }
}
