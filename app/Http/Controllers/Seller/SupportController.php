<?php

namespace App\Http\Controllers\Seller;

use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Resources\TicketResource;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\URL;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Support;
use App\Models\Ticket;
use App\Models\TicketReplay;

class SupportController extends Controller
{
    public function support_ticket(Request $request)
    {
        $tickets = TicketResource::collection(Ticket::where('user_type', 'seller')->where('user_id', auth('seller')->user()->id)->latest()->paginate(10));
        return Inertia::render('Seller/SupportTicket/SupportTicket', [
            'tickets' => $tickets
        ]);
    }

    public function create()
    {
        return Inertia::render('Seller/SupportTicket/Create');
    }

    public function support_ticket_store(Request $request)
    {
        $request->validate([
            'subject' => 'required',
            'details' => 'required',
        ]);
        $images = array();
        if ($files = $request->file('files')) {
            foreach ($files as $file) {
                $name = $file->getClientOriginalName();
                $file->storeAs('uploads/ticket_images', $name, 'public');
                $url =  $name;
                $images[] = $url;
            }
        }
        $ticket = new Ticket();
        $ticket->user_id = auth('seller')->user()->id;
        $ticket->user_type = auth('seller')->user()->user_type;
        $ticket->code = auth('seller')->user()->id . time();
        $ticket->subject = $request->subject;
        $ticket->details = $request->details;
        $ticket->files = implode(',', $images);
        $ticket->save();
        return redirect()->route('seller.support_ticket')->with('success', 'Ticket created successfully!');
    }

    public function support_ticket_details($id)
    {
        $ticket_details = new TicketResource(Ticket::find($id));
        return Inertia::render('Seller/SupportTicket/TicketDetails', [
            'ticket_details' => $ticket_details
        ]);
    }

    public function ticket_replay_store(Request $request)
    {
        // return $request->all();
        $request->validate([
            'replay' => 'required',
        ]);
        $images = array();
        if ($files = $request->file('files')) {
            foreach ($files as $file) {
                $name = $file->getClientOriginalName();
                $file->storeAs('uploads/ticket_images', $name, 'public');
                $url =  $name;
                $images[] = $url;
            }
        }
        $ticket_replay = new TicketReplay();
        $ticket_replay->user_id = auth('seller')->user()->id;
        $ticket_replay->user_type = auth('seller')->user()->user_type;
        $ticket_replay->ticket_id = $request->ticket_id;
        $ticket_replay->replay = $request->replay;
        $ticket_replay->files = implode(',', $images);
        $ticket_replay->ticket->viewed = '0';
        $ticket_replay->ticket->client_viewed = '1';
        $ticket_replay->ticket->save();
        $ticket_replay->save();
        return back()->with('success', 'Replay sent!');
    }

    // protected $title = "Support";
    // protected $model;

    // public function __construct()
    // {
    //     $this->model = new Support();
    // }

    // public function index(Request $request)
    // {
    //     return Inertia::render('Admin/Support/Index');
    // }


    // public function contact_messages(Request $request)
    // {
    //     return Inertia::render('Admin/Support/ProductConversations');
    // }

    // public function create()
    // {
    //     return Inertia::render('Admin/Support/Create');
    // }

    // public function store(Request $request) {}

    // public function show($id)
    // {
    //     return Inertia::render('Admin/Support/Show');
    // }

    // public function edit($id)
    // {
    //     return Inertia::render('Admin/Support/Edit');
    // }

    // public function ticket_replay(Request $request, $id)
    // {
    //     return Inertia::render('Admin/Support/TicketReplay');
    // }

    // public function update_replay($id)
    // {
    //     return Inertia::render('Admin/Support/Edit');
    // }

    // public function update(Request $request, $id) {}

    // public function destroy($id) {}
}
