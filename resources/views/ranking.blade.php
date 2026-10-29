@extends('layouts.app')

@section('content')

<div class="container">
	<br><br>
    <div class="row">
		<div class="col-md-4">
			<h2>Ranking final {!! $ayer !!}</h2>
			<br>

			<table class="table">
				<thead>
					<tr>
						<th>Usuario</th>
						<th class="text-center">Puntos</th>
					</tr>
				</thead>

				<tbody>
					@php
					$i = 1;
					@endphp

					@foreach($prevRanking as $pr)
						<tr>
							<td class="@if($i <= 3) winner @endif">
								@if($i <= 3) {{ $i }}. @endif
								{{ $pr->User }}
							</td>
							<td class="text-right @if($i <= 3) winner @endif">{{ $pr->Points }}</td>
						</tr>

						@php
						$i++;
						@endphp
					@endforeach	
				</tbody>
			</table>
		</div>

		<div class="col-md-4">
			<h2>Ranking día {!! date('d/m/Y') !!}</h2>
			<br>

			<table class="table">
				<thead>
					<tr>
						<th>Usuario</th>
						<th class="text-center">Puntos</th>
					</tr>
				</thead>

				<tbody>
					@foreach($dailyRanking as $dr)
						<tr>
							<td>{{ $dr->User }}</td>
							<td class="text-right">{{ $dr->Points }}</td>
						</tr>
					@endforeach	
				</tbody>
			</table>
		</div>

		<div class="col-md-4">
			<h2>Ranking absoluto</h2>
			<br>

			<table class="table">
				<thead>
					<tr>
						<th>Usuario</th>
						<th class="text-center">Puntos</th>
					</tr>
				</thead>

				<tbody>
					@foreach($absoluteRanking as $ar)
						<tr>
							<td>{{ $ar->User }}</td>
							<td class="text-right">{{ $ar->Points }}</td>
						</tr>
					@endforeach	
				</tbody>
			</table>
		</div>
    </div>
</div>

@endsection