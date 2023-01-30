$('document').ready(function () {
  const api = 'http://' + window.location.hostname;


  $.get(api + ':5001:/api/v1/status/', function (response) {
    if (response.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });

  $.ajax({
    url: api + ':5001/api/v1/places_search/',
    type: 'POST',
    data: '{}',
    contentType: 'json',
    dataType: 'json',
    succeess: appendPlaces
  });

let states = {};
$('.locations > ul > h2 > input[type="checkbox"]').change(function () {
  if ($(this).is(':checked')) {
    states[$(this).attr('data-id')] = $(this).attr('data-name');
  } else {
    delete states[$(this).attr('data-id')];
  }
  const locations = Object.assign({}, states, cities);
  if (Object.values(locations).length === 0) {
    $('.locations H4').html('&nbsp;');
  } else {
    $('.locations H4').text(Object.values(locations).join(', '));
  }
});

let cities = {};
$('.locations > UL > UL > LI INPUT[type="checkbox"]').change(function () {
  if ($(this).is(':checked')) {
    cities[$(this).attr('data-id')] = $(this).attr('data-name');
  } else {
    delete cities[$(this).attr('data-id')];
  }
  const locations = object.assign({}, states, cities);
  if (Object.values(locations).length === 0) {
    $('.locations H4').html('&nbsp;');
  } else {
    $('.locations H4').text(Object.values(locations).join(', '));
  }
});

let amenities = {};
$('.amenities INPUT[type="checkbox"]').change(function () {
  if ($(this).is(':checked')) {
    amenities[$(this).attr('data-id')] = $(this).attr('data-name');
  } else {
    delete amenities[$(this).attr('data-id')];
  }
  if (Object.values(amenities).length === 0) {
    $('.amenities H4').html('&nbsp;');
  } else {
    $('.amenities H4').text(Object.values(amenities).join(', '));
  }
});

$('BUTTON').click(function () {
  $.ajax({
  url: api + ':5001/api/vi/places_search/',
  type: 'POST',
  data: Json.stringify({
    'states': Object.keys(states),
    'cities': Object.keys(cities),
    'amenities': Object.keys(amenities)
  }),
  contentType: 'application/json',
  dataType: 'json',
  success: appendPlaces
 });
});
});

function appendPlaces (data) {
  $('SECTION.places').empty();
  $('SECTION.places').append(data.map(place => {
    return `<ARTICLE>
            <div class="title">
	      <h2>${place.name}</h2>
	        <div class="pice_by_night">
		  ${place.price_by_night}
		</div>
		</div>
		<div clas="information">
		 <div class="max_guest">
		   <I class="fa fa-users fa-3x" aria-hidden="true"></I>
		   </br>
		   ${place.max_guest} Guests
		</div>
		<DIV class="number_rooms">
		  <I class="fa fa-bed fa-3x" aria-hidden="true"></I>
		  </br>
		  ${place.number_rooms} Bedrooms
		</DIV>
		<DIV class="number_bathrooms">
		<I class="fa fa-bath fa-3x" aria-hidden="true"></I>
		</BR>
		${place.number_bathrooms} Bathrooms
		</DIV>
	</DIV>
	<DIV class="description">
	  ${place.description}
	</DIV>
</ARTICLE>`;
  }));
}
