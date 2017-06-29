import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../interfaces/pokemon.interface';
import { PokemonService } from '../../services/pokemon.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styles: []
})
export class PokemonComponent implements OnInit {
  id: string;
  pokemon: Pokemon = {
    nombre: '',
    bio: '',
    url: 'http://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png',
    tipo: '',
    id: '',
  };

  constructor(private _pokemonService: PokemonService, private _router: Router, private _activatedRoute: ActivatedRoute) {
    this._activatedRoute.params
      .subscribe(
        parametros => {
          this.id = parametros['id'];
          console.log('Id es: ');
          console.log(this.id);
          if (this.id !== 'nuevo') {
            this._pokemonService.getPokemon(this.id)
              .subscribe(
                resultado => {
                  this.pokemon = resultado;
                }
              );
          }
        }
      );
  }

  ngOnInit() {
  }

  guardar() {
    console.log(this.pokemon);

    if (this.id === 'nuevo') {
      // region Firebase
      // // Guardar un pokemon nuevo
      // this._pokemonService.nuevoPokemon(this.pokemon)
      //   .subscribe(
      //     resultado => {
      //       // console.log(resultado.name);
      //       this._router.navigate(['/pokemon', resultado.name]);
      //     },
      //     error => {
      //       console.log(error);
      //     }
      //   );
      // endregion

      // Guardar un pokemon nuevo
      this._pokemonService.nuevoPokemonSails(this.pokemon)
        .subscribe(
          resultado => {
            console.dir(resultado);
            // this._router.navigate(['/pokemon', resultado.name]);
            this._router.navigate(['/pokemon', this.pokemon.id]);
          },
          error => {
            console.log(error);
          }
        );
    } else {
      // region Firebase
      // Modificar al Pokemon
      // this._pokemonService.editarPokemon(this.pokemon, this.id)
      //   .subscribe(
      //     resultado => {
      //       this._router.navigate(['/pokedex']);
      //     },
      //     error => {
      //       console.log(error);
      //     }
      //   );
      // endregion

      // Modificar al Pokemon
      this._pokemonService.editarPokemon(this.pokemon, this.pokemon.id)
        .subscribe(
          resultado => {
            this._router.navigate(['/pokedex']);
          },
          error => {
            console.log(error);
          }
        );
    }
  }
}
