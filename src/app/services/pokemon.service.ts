import { Injectable } from '@angular/core';
import { Pokemon } from '../interfaces/pokemon.interface';
import { Http, Headers } from '@angular/http';
import 'rxjs/RX';

@Injectable()
export class PokemonService {
  pokedexURL = 'https://pokeapi-bf63e.firebaseio.com/pokeapi.json';
  pokemonURL = 'https://pokeapi-bf63e.firebaseio.com/pokeapi'; // -Kmhffump8iD9MnpJWIi

  pokedexSails = 'http://port-1337.pokemon-zsa9008547567.codeanyapp.com/pokemon';
  pokemonSails = 'http://port-1337.pokemon-zsa9008547567.codeanyapp.com/pokemon';

  pokemonAPI = 'http://pokeapi.co/api/v2/pokemon';

  constructor(private _http: Http) { }

  pokedexAPI() {
    return this._http.get(this.pokemonAPI)
      .map(
        res => {
          // console.log( res.json() );
          return res.json();
        }
      );
  }

  nuevoPokemonSails(pokemon: Pokemon) {
    const body = JSON.stringify(pokemon);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this._http.post(this.pokedexSails, body, { headers: headers })
      .map(
        res => {
          console.log( res.json() );  // nunca se ejecuta si es que no pongo subscribe
          return res.json;
        }
      );
  }

  nuevoPokemon(pokedexURL: Pokemon) {
    const body = JSON.stringify(pokedexURL);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this._http.post(this.pokedexURL, body, { headers: headers })
      .map(
        res => {
          console.log( res.json() );  // nunca se ejecuta si es que no pongo subscribe
          return res.json;
        }
      );
  }

  // region Firebase
  // getPokemon(indice: string) {
  //   const url = `${this.pokemonURL}/${ indice}.json`;
  //
  //   return this._http.get(url)
  //     .map(
  //       res => {
  //         return res.json();   // return  res.json();   return res;   return res.json;
  //       }
  //     );
  // }
  // endregion

  getPokemon(indice: string) {
    const url = `${this.pokemonSails}/${ indice} `;

    return this._http.get(url)
      .map(
        res => {
          return res.json();   // return  res.json();   return res;   return res.json;
        }
      );
  }

  getPokemonAPI(indice: number) {
    const url = `${this.pokemonAPI}/${indice} `;

    return this._http.get(url)
      .map(
        res => {
          return res.json();   // return  res.json();   return res;   return res.json;
        }
      );
  }

  consultarPokeDex() {

    return this._http.get(this.pokedexSails)
      .map(
        res => {
          console.log( res.json() );
          return res.json();
        }
      );
  }

  editarPokemon(pokemon: Pokemon, id: string) {
    const body = JSON.stringify(pokemon);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    // const url = `${ this.pokemonURL }/${ id }.json`;
    const url = `${ this.pokemonSails }/${ id }`;

    return this._http.put( url, body, { headers: headers } )
      .map(
        res => {
          console.log( res.json() );  // nunca se ejecuta si es que no pongo subscribe
          return res.json();
        }
      );
  }

  eliminarPokemon(id: string) {
    // const url = `${ this.pokemonURL }/${ id }.json`;

    const url = `${ this.pokemonSails }/${ id }`;
    console.log(url);

    return this._http.delete(url)
      // .map(
      //   resultado => {
      //     console.log('Estas ahi?');
      //     return resultado.json();
      //   }
      // );

      .map((res) => res.json());
  }

}
