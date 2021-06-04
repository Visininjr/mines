import { Client } from 'boardgame.io/react';
import { MS } from './Game';
import Board from './Board'

const App = Client({ 
    game: MS,
    board: Board,
    debug: false
});


export default App;