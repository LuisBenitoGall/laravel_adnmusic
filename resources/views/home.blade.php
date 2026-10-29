@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-12">
            <p style="font-size: 18px; text-align: justify;">
                Sube 1 canción cada día. Copia la url de un video de YouTube, vota el resto de las canciones y a ver quien es el DJ del día.
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

                        @if(Auth::user())

                            @php
                            $points = $row->getUserPoints($row->id);
                            @endphp

                            <div class="video-rating">
                                <span class="star @if($points >= 1) selected @endif" data-points="1" data-id="{{ $row->id }}"><i class="fa fa-star"></i></span>
                                <span class="star @if($points >= 2) selected @endif" data-points="2" data-id="{{ $row->id }}"><i class="fa fa-star"></i></span>
                                <span class="star @if($points >= 3) selected @endif" data-points="3" data-id="{{ $row->id }}"><i class="fa fa-star"></i></span>
                                <span class="star @if($points >= 4) selected @endif" data-points="4" data-id="{{ $row->id }}"><i class="fa fa-star"></i></span>
                                <span class="star @if($points >= 5) selected @endif" data-points="5" data-id="{{ $row->id }}"><i class="fa fa-star"></i></span>
                            </div>
                        @endif
                    </div>
                </div> 
            </div>     
        @endforeach
    </div>
</div>

@if(Auth::user())
    @push('scripts')
    <script>
    $(document).ready(function(){
        $('.star').on('click', function(){
            var points = $(this).data('points');
            var id = $(this).data('id');
            var selector = $('*[data-id="'+id+'"]');

            $(selector).each(function(){
                var valor = $(this).data('points');
                if(valor <= points){
                    $(this).addClass('selected');
                }else{
                    $(this).removeClass('selected');
                }
            });

            $.get("/add-points/"+id+"/"+points);
        });
    });
    </script>
    @endpush
@endif

@endsection
