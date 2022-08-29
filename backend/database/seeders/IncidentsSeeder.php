<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\DB; 
//Importing Facades/DB, Without it our seeder doesn't run


class IncidentsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    
        DB::table('incidents')->insert(
        ['title' => 'Incident_One', 'description' => 'This incident occurred this afternoon when an elevator crashed',
        'criticality' => 'Average','type' => 'Incident','status' => 'active']);

        DB::table('incidents')->insert(
        ['title' => 'Incidente Dois', 'description' => 'Este incidente aconteceu em portuges nativo',
        'criticality' => 'Baixo','type' => 'Alarme','status' => 'desativado']);

        DB::table('incidents')->insert(
        ['title' => 'Incident_Tres', 'description' => 'Este incidente também é brasileiro',
        'criticality' => 'Alta','type' => 'Alarme','status' => 'ativo']);
    
        DB::table('incidents')->insert(
        ['title' => 'Fire', 'description' => 'A building next door caught fire',
        'criticality' => 'High','type' => 'Incident','status' => 'inactive']);
            
    
    }
}
