import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../interfaces/pokemon.interface';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemones',
  templateUrl: './pokemones.component.html',
  styles: []
})
export class PokemonesComponent implements OnInit {
  pokeDex: Pokemon[] = [];
  pokeDexAPI: Pokemon[] = [];

  constructor(private _pokemonService: PokemonService) {

    this._pokemonService.consultarPokeDex()
      .subscribe(
        resultados => {
          this.pokeDex = resultados;

          // region Firebase
          // for ( const key$ in resultados ) {
          //   console.log(resultados[key$]);
          //   const pokemonNew = resultados[key$];
          //   pokemonNew.id = key$ + 1;
          //   this.pokeDex.push(pokemonNew);
          // }
          // this.pokeDex = resultados;
          // endregion
        }
      );

    this._pokemonService.pokedexAPI()
      .subscribe(
        res => {
          console.log(res.results[0].name);
          let counter: number = 1;
          for (const id in res.results) {
            const pokemonAPIN = res.results[id];
            pokemonAPIN.nombre = res.results[id].name;
            pokemonAPIN.id = id;
            pokemonAPIN.url = `${'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon'}/${counter}.png`;
            this.pokeDexAPI.push(pokemonAPIN);
            counter++;

            this._pokemonService.getPokemonAPI(counter)
              .subscribe(
                result => {
                  console.log(result);
                  pokemonAPIN.bio = result.abilities[0].ability.name;
                },
                error => {
                  console.error(res);
                }
              );
          }
        },
        error => {
          console.error(error);
        }
      );
  }

  ngOnInit() {
  }

  eliminar(id: string, posicion) {
    console.log('Se elimino el id: ' + id + ' con indice: ' + posicion);

    this._pokemonService.eliminarPokemon(id)
      .subscribe(
        resultado => {
          console.log('Se elimino el id: ' + id + ' con indice: ' + posicion);
          this.pokeDex.splice(posicion, 1);
        }
      );
  }
}
