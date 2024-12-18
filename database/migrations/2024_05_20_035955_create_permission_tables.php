<?php

use App\Models\Admin;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $teams = config('permission.teams');
        $tableNames = config('permission.table_names');
        $columnNames = config('permission.column_names');
        $pivotRole = $columnNames['role_pivot_key'] ?? 'role_id';
        $pivotPermission = $columnNames['permission_pivot_key'] ?? 'permission_id';

        if (empty($tableNames)) {
            throw new \Exception('Error: config/permission.php not loaded. Run [php artisan config:clear] and try again.');
        }
        if ($teams && empty($columnNames['team_foreign_key'] ?? null)) {
            throw new \Exception('Error: team_foreign_key on config/permission.php not loaded. Run [php artisan config:clear] and try again.');
        }

        Schema::create($tableNames['permissions'], function (Blueprint $table) {
            $table->bigIncrements('id'); // permission id
            $table->string('name');       // For MySQL 8.0 use string('name', 125);
            $table->string('guard_name'); // For MySQL 8.0 use string('guard_name', 125);
            $table->timestamps();

            $table->unique(['name', 'guard_name']);
        });

        Schema::create($tableNames['roles'], function (Blueprint $table) use ($teams, $columnNames) {
            $table->bigIncrements('id'); // role id
            if ($teams || config('permission.testing')) { // permission.testing is a fix for sqlite testing
                $table->unsignedBigInteger($columnNames['team_foreign_key'])->nullable();
                $table->index($columnNames['team_foreign_key'], 'roles_team_foreign_key_index');
            }
            $table->string('name');       // For MySQL 8.0 use string('name', 125);
            $table->string('guard_name'); // For MySQL 8.0 use string('guard_name', 125);
            $table->timestamps();
            if ($teams || config('permission.testing')) {
                $table->unique([$columnNames['team_foreign_key'], 'name', 'guard_name']);
            } else {
                $table->unique(['name', 'guard_name']);
            }
        });

        Schema::create($tableNames['model_has_permissions'], function (Blueprint $table) use ($tableNames, $columnNames, $pivotPermission, $teams) {
            $table->unsignedBigInteger($pivotPermission);

            $table->string('model_type');
            $table->unsignedBigInteger($columnNames['model_morph_key']);
            $table->index([$columnNames['model_morph_key'], 'model_type'], 'model_has_permissions_model_id_model_type_index');

            $table->foreign($pivotPermission)
                ->references('id') // permission id
                ->on($tableNames['permissions'])
                ->onDelete('cascade');
            if ($teams) {
                $table->unsignedBigInteger($columnNames['team_foreign_key']);
                $table->index($columnNames['team_foreign_key'], 'model_has_permissions_team_foreign_key_index');

                $table->primary(
                    [$columnNames['team_foreign_key'], $pivotPermission, $columnNames['model_morph_key'], 'model_type'],
                    'model_has_permissions_permission_model_type_primary'
                );
            } else {
                $table->primary(
                    [$pivotPermission, $columnNames['model_morph_key'], 'model_type'],
                    'model_has_permissions_permission_model_type_primary'
                );
            }
        });

        Schema::create($tableNames['model_has_roles'], function (Blueprint $table) use ($tableNames, $columnNames, $pivotRole, $teams) {
            $table->unsignedBigInteger($pivotRole);

            $table->string('model_type');
            $table->unsignedBigInteger($columnNames['model_morph_key']);
            $table->index([$columnNames['model_morph_key'], 'model_type'], 'model_has_roles_model_id_model_type_index');

            $table->foreign($pivotRole)
                ->references('id') // role id
                ->on($tableNames['roles'])
                ->onDelete('cascade');
            if ($teams) {
                $table->unsignedBigInteger($columnNames['team_foreign_key']);
                $table->index($columnNames['team_foreign_key'], 'model_has_roles_team_foreign_key_index');

                $table->primary(
                    [$columnNames['team_foreign_key'], $pivotRole, $columnNames['model_morph_key'], 'model_type'],
                    'model_has_roles_role_model_type_primary'
                );
            } else {
                $table->primary(
                    [$pivotRole, $columnNames['model_morph_key'], 'model_type'],
                    'model_has_roles_role_model_type_primary'
                );
            }
        });

        Schema::create($tableNames['role_has_permissions'], function (Blueprint $table) use ($tableNames, $pivotRole, $pivotPermission) {
            $table->unsignedBigInteger($pivotPermission);
            $table->unsignedBigInteger($pivotRole);

            $table->foreign($pivotPermission)
                ->references('id') // permission id
                ->on($tableNames['permissions'])
                ->onDelete('cascade');

            $table->foreign($pivotRole)
                ->references('id') // role id
                ->on($tableNames['roles'])
                ->onDelete('cascade');

            $table->primary([$pivotPermission, $pivotRole], 'role_has_permissions_permission_id_role_id_primary');
        });

        app('cache')
            ->store(config('permission.cache.store') != 'default' ? config('permission.cache.store') : null)
            ->forget(config('permission.cache.key'));

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


        $superAdminRole = Role::create(['name' => 'Super Admin', 'guard_name' => 'admin']);
        $superAdminRole->givePermissionTo(Permission::all());
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $tableNames = config('permission.table_names');

        if (empty($tableNames)) {
            throw new \Exception('Error: config/permission.php not found and defaults could not be merged. Please publish the package configuration before proceeding, or drop the tables manually.');
        }

        Schema::drop($tableNames['role_has_permissions']);
        Schema::drop($tableNames['model_has_roles']);
        Schema::drop($tableNames['model_has_permissions']);
        Schema::drop($tableNames['roles']);
        Schema::drop($tableNames['permissions']);
    }
};
