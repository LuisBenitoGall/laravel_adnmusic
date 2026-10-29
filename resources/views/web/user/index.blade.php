@extends('layouts.app')

<?php 
function convertFecha($fecha, $hora = false){
    $partes = explode(' ', $fecha);
    $p = explode('-', $partes[0]);

    $newfecha = $p[2].'-'.$p[1].'-'.$p[0];
    if($hora){
        $newfecha .= ' '.$partes[1];
    }
    return $newfecha; 
}  
?>

@section('content')
<div class="container">
    <div class="row">
        <div class="col-12">
            <p style="font-size: 18px; text-align: justify;">
                Tus canciones
            </p>
        </div>
    </div>
    <br>

    <div class="row">
        @foreach($songs as $row)
            <div class="col-sm-6 col-md-4 col-lg-3 sinpadding">
                <div class="video">
                    <div class="video-link">
                        <iframe src="https://www.youtube.com/embed/{{ $row->link }}" frameborder="0" allowfullscreen="allowfullscreen"></iframe>
                    </div>

                    <div class="video-data">
                        <h5>{{ convertFecha($row->created_at) }}</h5>

                        <span class="puntos">
                            {{ $row->Puntos }} pts.
                        </span>
                    </div>
                </div> 
            </div>     
        @endforeach
    </div>
</div>

@endsection
