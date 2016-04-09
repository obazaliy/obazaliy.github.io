$(document).ready(function () {
  var page = 0;
  var limit = 9;
  var offset = 9;
  var list = $('.main-content .pokemons-list');
  var pokemonInfo = $('.pokemon-info');

  var pokemons = [];
  var types = [];
  var moves = [];
  loadPokemons();
  pokemonInfo.hide();

  function loadPokemons() {
    var url = "http://pokeapi.co/api/v1/pokemon/?limit=" + limit + "&offset=" + (page++ * offset);

    $.getJSON(url, function (data) {
      generateAllpokemonsHTML(data.objects);
    });
  }

  function generateAllpokemonsHTML(pokemons) {
    pokemons.forEach(function (item) {
      item.types.forEach(function (type) {
        types.push(type.name);
      });
      list.append(Handlebars.compile($('#pokemons-template').html())({
        pokemon_id: item.national_id,
        name: item.name,
        image: 'http://pokeapi.co/media/img/' + item.national_id + '.png',
        types: types
      }));
      types = [];
    });

    list.find('button').on('click', function () {
      filterByType($(this).data('pokemon'));
    });

  }

  function filterByType(type) {
    $(list.find('li')).each(function () {
        if ($(this).data('pokemon-type').split(",").indexOf(type) == -1) {
          $(this).hide();
        }
      }
    )
  }

  function generatePokemonDescription(item) {
    moves = item.moves;
    item.types.forEach(function (type) {
      types.push(type.name);
    });


    $('.pokemon-info .pokemon-description-item').remove();
    pokemonInfo.show();
    pokemonInfo.append(Handlebars.compile($('#pokemons-description').html())({
      pokemon_id: formatId(item.national_id),
      image: 'http://pokeapi.co/media/img/' + item.national_id + '.png',
      name: item.name,
      attack: item.attack,
      defense: item.defense,
      hp: item.hp,
      sp_atk: item.sp_atk,
      sp_def: item.sp_def,
      speed: item.speed,
      weight: item.weight,
      count_moves: moves.length,
      types: types
    }));
    types = [];
  }

  function formatId(pokeId) {
    var lengthId = pokeId.toString().length;
    var formattedId;
    if (lengthId == 1) formattedId = "00".concat(pokeId);
    else if (lengthId == 2) formattedId = "0".concat(pokeId);
    else formattedId = pokeId;
    return formattedId;
  }

  $('.load-more').on('click', function () {
    list.find('li').show();
    loadPokemons();
  });

  list.delegate('li', 'click', function () {
    var id = $(this).data('pokemon-id');
    var url = 'http://pokeapi.co/api/v1/pokemon/' + id + '/';
    $.getJSON(url, function (data) {
      generatePokemonDescription(data);
    })
  });

});
