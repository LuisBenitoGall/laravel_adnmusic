@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-12">
            <p style="font-size: 18px; text-align: justify;">
                TOP 50 de las canciones más votadas
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
                        <h5>{{ $row->User }}</h5>

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
