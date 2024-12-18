<?php

namespace App\Providers;

use App\Models\Addon;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\ServiceProvider;

class AddonCheckServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        Blade::directive('addons', function () {
            /**@disregard */
            $activeAddon = Addon::active()->pluck('unique_identifier')->toJson();
            return "<!-- Addons -->
            <script type='text/javascript'>
            const activeAddon = $activeAddon;
            function isAddonActive(addon) {
                return activeAddon.indexOf(addon) !== -1;
            }
            </script>";
        });
    }
}
