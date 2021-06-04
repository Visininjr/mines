import { INVALID_MOVE } from 'boardgame.io/core';

export const BOARDLENGTH = 10 // boardsize is boardlength^2
export const BOMBS = 50

// by design the audio feature of mine detection is not perfect. For example, one neighboring mine to another mine may not play a sound 

export const MS = {
    setup: () => {
        let b = generateBoard(BOARDLENGTH, BOMBS)
        return ({ c1: b, c2:  b})
    },
  
    turn: { // turn based game
        moveLimit: 1,
    },

    moves: {
      clickCell: (G, ctx, id) => { // id is a string
        let splitId = id.split(' ')
        let i = splitId[0]
        let j = splitId[1]
        if (ctx.currentPlayer === '0') { // player 1
            handClick(G.c1, ctx, i, j)
        } else { // player 2
            handClick(G.c2, ctx, i, j)
        }
      },

      rightClick: (G, ctx, id) => {
        let splitId = id.split(' ')
        let i = splitId[0]
        let j = splitId[1]
        if (ctx.currentPlayer === '0') { // player 1
            let space = G.c1[i][j]
            if (space.open) {
                return INVALID_MOVE;
            }
            space.flag = !space.flag
        } else { // player 2
            let space = G.c2[i][j]
            if (space.open) {
                return INVALID_MOVE;
            }
            space.flag = !space.flag
        }
      }
    },

    endIf: (G, ctx) => {
        if (Win(G.c1)) {
            return { winner: 0 };
        }
        if (Win(G.c2)) {
            return { winner: 1 };
        }
        if (Lose(G.c1)) {
            return { winner: 1 };
        }
        if (Lose(G.c2)) {
            return { winner: 0 }; 
        }
    },

    onEnd: (G, ctx) => {
        console.log(ctx.gameover)
    }
};

const handClick = (board, ctx, i, j) => { // recursively handle and expand board upon click
    if (board[i][j].mine) { 
        board[i][j].open = 1
        return
    }
    let q = [] // queue cells to be revealed
    let neighbors = getNeighbors(i, j)
    q.push([i, j])
    while (q.length > 0) { // keep going until we're out of cells
        [i, j] = q.shift()
        let cell = board[i][j] // load first cell
        if (cell.open) continue // already seen
        if (cell.mine) continue // lose
        if (cell.flag) continue // don't reveal flagged locations
        cell.open = true
        if (cell.neighborMineCount) { // display number of neighbor bombs here

        } else { // blank spot, repeat for neighbors     
            neighbors = getNeighbors(i, j)
            neighbors.forEach(([x, y]) => {
                q.push([x, y])
            })
        } 
    }
}

const Win = cells => {
    var ret = 0
    cells.forEach(cell => {
        ret += cell.filter(c => (c.flag && c.mine)).length
    })
    return ret === BOMBS
}

const Lose = cells => { 
    var ret = 0
    cells.forEach(cell => {
        ret += cell.filter(c => (c.open && c.mine)).length // someone clicked on a mine
    })
    return ret 
}

const Cell = (open, flag, mine, neighborMineCount, audio) => {
    return {
        open: open,
        flag: flag,
        mine: mine,
        neighborMineCount: neighborMineCount,
        audio: audio
    }
}

const generateBoard = (size, mineCount) => {
    let b = [...Array(size)].map(e => Array(size)) // n x n array
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            b[i][j] = Cell(0, 0, 0, 0, 0) 
        }
    }
    b = assignMines(b, mineCount)
    return b
}

const assignMines = (b, n) => {
    let s = b.length
    let mc = []
    for (let i = 0; i < n; i++) { // generate n mines
        let rand = Math.floor(Math.random() * 3)
        let ri = Math.floor(Math.random() * s)
        let rj = Math.floor(Math.random() * s)
        let c = ri + ' ' + rj
        while (mc.includes(c)) { // guarentee generating new bomb
            ri = Math.floor(Math.random() * s)
            rj = Math.floor(Math.random() * s)
            c = ri + ' ' + rj
        }
        mc.push(c)
        b[ri][rj].mine = 1

        // audio output, only 2/3's of mines have audio capabilities
        if (rand === 1) b[ri][rj].audio = 1
        else if (rand === 2) b[ri][rj].audio = 3
        b = addOnetoNeighbors(b, ri, rj, rand)
    }
    return b
}

const addOnetoNeighbors = (b, i, j, rand) => {
    let neighbors = getNeighbors(i, j)
    neighbors.forEach(([x,y]) => {
        b[x][y].neighborMineCount += 1
        if (rand === 1 && !b[x][y].mine) b[x][y].audio = 2
        else if (rand === 2 && !b[x][y].mine) b[x][y].audio = 4
    })
    return b
}

const getNeighbors = (i, j) => {
    let ret = []
    let s = BOARDLENGTH
    for (let x = Math.max(0, i-1); x <= Math.min(i+1, s-1); x++) {
        for (let y = Math.max(0, j-1); y <= Math.min(j+1, s-1); y++) {
            if ((x !== i || y !== j)) {
                ret.push([x, y])
            }
        }
    }
    return ret
}