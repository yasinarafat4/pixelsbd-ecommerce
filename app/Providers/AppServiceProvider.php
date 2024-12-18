<?php

namespace App\Providers;

use App\Console\Commands\MVCGenerator;
use App\Models\Admin;
use Gate;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        if (App::runningInConsole()) {
            $this->registerCommand();
        }

        $loader = \Illuminate\Foundation\AliasLoader::getInstance();
        $loader->alias('Debugbar', \Barryvdh\Debugbar\Facades\Debugbar::class);
    }

    private function registerCommand()
    {
        $this->commands([
            MVCGenerator::class
        ]);
    }
    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Schema::defaultStringLength(191);
        JsonResource::withoutWrapping();
        // Gate::before(function ($user, $ability) {
        //     return $user->hasRole('Super Admin') ? true : null;
        // });
    }
}
