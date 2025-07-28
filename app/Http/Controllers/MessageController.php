<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;

class MessageController extends Controller
{
    public function index(): Response
    {

        return Inertia::render('Chats/Chat');
    }
}
