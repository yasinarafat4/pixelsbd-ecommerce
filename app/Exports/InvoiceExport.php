<?php

namespace App\Exports;

use App\Http\Resources\OrderResource;
use App\Models\Order;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;

class InvoiceExport implements FromView
{
    protected $order;
    public function __construct($order)
    {
        $this->order = $order;
    }

    public function view(): View
    {
        return view('exports.invoice', [
            'order' => $this->order
        ]);
    }
}
