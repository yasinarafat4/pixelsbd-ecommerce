<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Str;

class MVCGenerator extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'bmvc:create {table_name}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate Model, Controller, Route, and View';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $name = $this->argument('table_name');
        $nameCamel = Str::camel($name);
        $nameLower = strtolower($nameCamel);
        $modelName = ucfirst($nameCamel);
        $controllerName = $modelName . "Controller";
        //Controller
        $ControllerRoot = app_path('Http\Controllers\Admin');
        $controllersDir = $ControllerRoot;
        if (!is_dir($controllersDir)) {
            mkdir($controllersDir);
        }

        $controllerFilePath = $controllersDir . "/" . $modelName . "Controller.php";
        $stubFile = __DIR__ . "/../Stubs/Controller.php.stub";
        $stub = file_get_contents($stubFile);

        $stub = str_replace("{{modelName}}", $modelName, $stub);
        file_put_contents($controllerFilePath, $stub);
        //Model
        \Artisan::call('make:model ' . $modelName . ' --migration');

        //Routes
        $marker = '// auto-routes: admin';
        $new_route = 'Route::resource("' . $nameLower . '", ' . $controllerName . '::class);';
        $routes = file_get_contents('routes/admin.php');
        $routes = str_replace($marker, $marker . PHP_EOL . $new_route, $routes);
        file_put_contents('routes/admin.php', $routes);

        //Jsx file
        $viewRootDir = resource_path('js\Pages\Admin');
        $viewRootDir = $viewRootDir;
        if (!is_dir($viewRootDir)) {
            mkdir($viewRootDir);
        }

        $viewDir = $viewRootDir . "/" . $modelName;
        if (!is_dir($viewDir)) {
            mkdir($viewDir);
        }

        $indexView = $viewDir . "/Index.jsx";
        $indexViewStub = __DIR__ . "/../Stubs/Inertia/Index.jsx.stub";
        $stub = file_get_contents($indexViewStub);
        file_put_contents($indexView, $stub);

        // $showView = $viewDir . "/Show.jsx";
        // $showViewStub =  __DIR__ . "/../Stubs/Inertia/Show.jsx.stub";
        // $stub = file_get_contents($showViewStub);
        // file_put_contents($showView, $stub);


        $editView = $viewDir . "/Edit.jsx";
        $editViewStub =  __DIR__ . "/../Stubs/Inertia/Edit.jsx.stub";
        $stub = file_get_contents($editViewStub);
        file_put_contents($editView, $stub);


        $createView = $viewDir . "/Create.jsx";
        $createViewStub =  __DIR__ . "/../Stubs/Inertia/Create.jsx.stub";
        $stub = file_get_contents($createViewStub);
        file_put_contents($createView, $stub);

        $this->info("$name MVC created!");
        return 0;
    }
}
