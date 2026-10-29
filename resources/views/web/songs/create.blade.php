@extends('layouts.app')

@section('content')

<div class="container">
    <div class="row justify-content-center">
    	<div class="col-md-8">
            <br><br><br>

			@if($exist)
				<h2>Ya has subido tu canción del día. Mañana podrás subir otra.</h2>

			@else

	            <h2>Subir canción</h2>
	            <br><br>

	            <form method="POST" action="{{ route('upload') }}">
	                @csrf

	                <div class="form-group row">
	                    <label for="link" class="col-12">URL del video YouTube *</label>

	                    <div class="col-md-12">
	                        <input id="link" type="text" class="form-control" name="link" value="{{ old('link') }}" required autofocus>

	                        @error('link')
	                            <span class="invalid-feedback" role="alert">
	                                <strong>{{ $message }}</strong>
	                            </span>
	                        @enderror
	                    </div>
	                </div>

	                <div class="form-group row mb-0">
	                    <div class="col-12">
	                        <input type="submit" class="btn btn-primary" name="submit_save" value="Guardar">
	                    </div>
	                </div>
	            </form>

	        @endif
        </div>
    </div>
</div>

@endsection