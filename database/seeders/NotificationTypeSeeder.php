<?php

namespace Database\Seeders;

use App\Models\NotificationType;
use DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NotificationTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        NotificationType::truncate();
        $path   = base_path('public/sql/notification_type.sql');
        $sql    = file_get_contents($path);
        DB::unprepared($sql);
    }
}
