<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Resources\TicketResource;
use App\Models\Contact;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\URL;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Support;
use App\Models\Ticket;
use App\Models\TicketReplay;
use Illuminate\Support\Facades\DB;

class SupportController extends Controller
{
    public function index(Request $request)
    {
        $tickets = TicketResource::collection(Ticket::latest()->paginate(10));
        return Inertia::render('Admin/Support/Ticket/Index', [
            'tickets' => $tickets,
        ]);
    }

    public function ticket(Request $request)
    {
        // $tickets = Ticket::get();
        return Inertia::render('Admin/Support/Ticket/Index');
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
        $ticket_replay->user_id = auth('admin')->user()->id;
        $ticket_replay->user_type = auth('admin')->user()->user_type;
        $ticket_replay->ticket_id = $request->ticket_id;
        $ticket_replay->replay = $request->replay;
        $ticket_replay->files = implode(',', $images);
        // return  $ticket_replay->ticket;
        $ticket_replay->ticket->viewed = '1';
        $ticket_replay->ticket->client_viewed = '0';
        $ticket_replay->ticket->save();
        $ticket_replay->save();
        return back()->with('success', 'Replay sent!');
    }


    public function ticket_status(Request $request, $id)
    {
        $ticket_replay = Ticket::find($id);
        $ticket_replay->status = $request->status;
        $ticket_replay->save();
        return back()->with('success', 'Status changed!');
    }

    public function ticket_replay(Request $request, $id)
    {
        $ticket = new TicketResource(Ticket::find($id));
        return Inertia::render('Admin/Support/Ticket/TicketReplay', [
            'ticket' => $ticket
        ]);
    }

    public function update_replay($id)
    {
        return Inertia::render('Admin/Support/Ticket/Edit');
    }

    public function contact_messages()
    {
        $contact_messages = Contact::latest()->paginate(10);
        return Inertia::render('Admin/Support/ContactMessages/ContactMessages', [
            'contact_messages' => $contact_messages
        ]);
    }

    public function contact_status(Request $request, $id)
    {
        $contact_message = Contact::find($id);
        if ($contact_message->status == 'pending') {
            $contact_message->status = 'replied';
        } else {
            $contact_message->status = 'pending';
        }
        $contact_message->save();
        return back()->with('success', 'Status changed!');
    }

    public function contact_messages_delete($id)
    {
        $contact_message = Contact::find($id);
        DB::table('contacts')->where('id', $contact_message->id)->delete();
        $contact_message->delete();
        flash_success(trans('Contact message deleted successfully'));
    }


    public function update(Request $request, $id) {}

    public function destroy($id) {}
}
