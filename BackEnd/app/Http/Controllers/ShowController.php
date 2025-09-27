<?php

namespace App\Http\Controllers;

use App\Models\Show;
use App\Models\ShowSchedule;
use Illuminate\Http\Request;
use App\Http\Resources\ShowResource;

class ShowController extends Controller
{
    // Get all shows with schedules
    public function index()
    {
        return ShowResource::collection(
            Show::with('schedules')->get()
        );
    }

    // Create a new show
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'posterUrl' => 'nullable|string',
            'schedules' => 'nullable|array',
            'schedules.*.date' => 'required_with:schedules|date',
            'schedules.*.time' => 'required_with:schedules',
        ]);

        $show = Show::create($validated);

        if (isset($validated['schedules'])) {
            foreach ($validated['schedules'] as $schedule) {
                $show->schedules()->create($schedule);
            }
        }

        return new ShowResource($show->load('schedules'));
    }

    // Get single show
    public function show($id)
    {
        $show = Show::with('schedules')->find($id);

        if (!$show) {
            return response()->json(['message' => 'Show not found'], 404);
        }

        return new ShowResource($show);
    }

    // Update show
    public function update(Request $request, $id)
    {
        $show = Show::find($id);

        if (!$show) {
            return response()->json(['message' => 'Show not found'], 404);
        }

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'price' => 'sometimes|numeric',
            'posterUrl' => 'nullable|string',
            'schedules' => 'nullable|array',
            'schedules.*.id' => 'sometimes|exists:show_schedules,id',
            'schedules.*.date' => 'required_with:schedules|date',
            'schedules.*.time' => 'required_with:schedules',
        ]);

        $show->update($validated);

        if (isset($validated['schedules'])) {
            foreach ($validated['schedules'] as $schedule) {
                if (isset($schedule['id'])) {
                    $existing = ShowSchedule::find($schedule['id']);
                    $existing->update($schedule);
                } else {
                    $show->schedules()->create($schedule);
                }
            }
        }

        return new ShowResource($show->load('schedules'));
    }

    // Delete show
    public function destroy($id)
    {
        $show = Show::find($id);

        if (!$show) {
            return response()->json(['message' => 'Show not found'], 404);
        }

        $show->delete();

        return response()->json(['message' => 'Show deleted successfully'], 200);
    }
}
