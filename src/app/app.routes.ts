/**
 * Created by jh0n4 on 15/6/17.
 */
import { RouterModule, Routes} from '@angular/router';
import { PokemonComponent } from './components/pokemon/pokemon.component';
import { PokemonesComponent } from './components/pokemones/pokemones.component';

const APP_ROUTES: Routes = [
  { path: 'pokemon/:id', component: PokemonComponent },
  { path: 'pokedex', component: PokemonesComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'pokedex' },
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
