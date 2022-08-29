<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Models\Incidents;
use App\Models\Incidents as ModelsIncidents;

class ApiIncidentsController extends Controller
{

    //Obter todos os incidentes
    public function getAllIncidents(){
        $incidents = ModelsIncidents::get()->toJson(JSON_PRETTY_PRINT);
        return response($incidents, 200);
        
    }

    //Criar um incidente Novo
    public function createIncident(Request $request) {

        $incident = new ModelsIncidents;
        $incident->title = $request->title;
        $incident->description = $request->description;
        $incident->criticality = $request->criticality;
        $incident->type = $request->type;
        $incident->status = $request->status;

        $incident->save();

        return response()->json([
            "id" => $incident->id,
            "message" => "Incident record created"
        ], 201);
        
      }

      public function getIncident($id) {

        if (ModelsIncidents::where('id', $id)->exists()) {
            $incident = ModelsIncidents::where('id',$id)->get()->toJson(JSON_PRETTY_PRINT);
            return response($incident, 200);
        } else{

            return response()->json([
                "message" => "Student not found"
              ], 404);
        }
      
    }
  
      public function updateIncident(Request $request, $id) {
        
        if (ModelsIncidents::where('id', $id)->exists()) {

            $incident = ModelsIncidents::find($id);
            $incident->title = is_null($request->title) ? $incident->title : $request->title;
            $incident->description = is_null($request->description) ? $incident->description : $request->description;
            $incident->type = is_null($request->type) ? $incident->type : $request->type;
            $incident->criticality = is_null($request->criticality) ? $incident->criticality : $request->criticality;
            $incident->status = is_null($request->status) ? $incident->status : $request->status;
            $incident->save();

            return response()->json([
                "message" => "records updated successfully"
            ], 200);
            } else {
            return response()->json([
                "message" => "Student not found"
            ], 404);
        }
    }
      
    public function deleteIncident($id) {
        
        if(ModelsIncidents::where('id',$id)->exists()){

            $incident = ModelsIncidents::find($id);
            $incident->delete();

            return response()->json([
                "message" => "records deleted"
              ], 202);
        
        }else {
            return response()->json([
              "message" => "Student not found"
            ], 404);
          }
        
      }
  

}
