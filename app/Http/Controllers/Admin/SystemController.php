<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SystemController extends Controller
{

    public function server_status(Request $request)
    {
        $results = DB::select('select version()');
        $mysql_version =  $results[0]->{'version()'};

        $required_paths = [];
        $paths = ['.env', 'public', 'app/Providers', 'app/Http/Controllers', 'storage', 'resources/views'];
        foreach ($paths as $path) {
            $required_paths[] = ['name' => $path, 'value' => is_writable(base_path($path))];
        }
        Inertia::share('php_version', phpversion());
        Inertia::share('mysql_version', $mysql_version);
        Inertia::share('file_uploads', ini_get('file_uploads'));
        Inertia::share('max_file_uploads', ini_get('max_file_uploads'));
        Inertia::share('upload_max_filesize', $this->formatBytes($this->return_bytes(ini_get('upload_max_filesize'))));
        Inertia::share('post_max_size', $this->formatBytes($this->return_bytes(ini_get('post_max_size'))));
        Inertia::share('allow_url_fopen', ini_get('allow_url_fopen'));
        Inertia::share('max_execution_time', ini_get('max_execution_time'));
        Inertia::share('max_input_time', ini_get('max_input_time'));
        Inertia::share('max_input_vars', ini_get('max_input_vars'));
        Inertia::share('memory_limit', $this->formatBytes($this->return_bytes(ini_get('memory_limit'))));
        Inertia::share('get_loaded_extensions', get_loaded_extensions());
        Inertia::share('required_paths', $required_paths);

        return Inertia::render('Admin/System/ServerStatus');
    }

    public function return_bytes($val)
    {
        $value = substr($val, 0, -1);
        $suffix = strtolower($val[strlen($val) - 1]);
        switch ($suffix) {
            case 'g':
                $value *= 1024;
            case 'm':
                $value *= 1024;
            case 'k':
                $value *= 1024;
        }
        return $value;
    }

    public function formatBytes($bytes, $precision = 2)
    {
        $kilobyte = 1024;
        $megabyte = $kilobyte * 1024;
        return round($bytes / $megabyte, $precision);
    }


    public function update_system(Request $request)
    {
        return Inertia::render('Admin/System/UpdateSystem');
    }
}
