<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Lib\Imagedownloader\Line;
use App\Stpack;

class StpacksController extends Controller
{
    public function getStpack(Request $request, $stpack_id){
        $stpack_model = Stpack::where('id', $stpack_id);
        $return_code  = 200;

        if (!$stpack_model->exists()) {
            $downloader = new Line();
            $download   = $downloader->download($stpack_id);

            if ($download['error']) {
                return response()->json([
                    'error' => $download['error'],
                    'error_description' => $download['error_description']
                ], 500);
            };
        }

        $stpack_model = Stpack::where('id', $stpack_id)->first();
        $stpack       = $stpack_model::with('stickers')->first();

        return response()->json($stpack, $return_code ?: 500);
    }
}
