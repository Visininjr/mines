import React, { useState, useEffect } from 'react'
import { BOARDLENGTH, BOMBS } from './Game'

const MDLOW = new Audio('audio/mdlow.mp3');
const MDHIGH = new Audio('audio/mdhigh.mp3');

export default function MineBoard(props) {
    // start screen toggle
    const [start, updateStart] = useState(true)

    // toggle for each turn
    const [turn, updateTurn] = useState(0)
    const [switchScreen, updateSwitch] = useState(false)

    // end condition based on props.G, useState to render change
    const [winner, updateWinner] = useState(null)

    // boards
    const [tbody1, updateT1body] = useState([])
    const [tbody2, updateT2body] = useState([])
    const [tsolution, updateSolution] = useState([])

    // flag count
    const [flagC1, updateFlagC1] = useState(0)
    const [flagC2, updateFlagC2] = useState(0)

    // play low sound
    const playLow = () => {
        MDLOW.play();
    }

    const playHigh = () => {
        MDHIGH.play()
    }
    
    // stop low sound
    const stopLow = () => {
        MDLOW.pause();
        MDLOW.currentTime = 0;
    }

    // stop high sound
    const stopHigh = () => {
        MDHIGH.pause();
        MDHIGH.currentTime = 0;
    }

    const handleClick = id => {
        let parsedId = id.split(' ')
        let i = parseInt(parsedId[0])
        let j = parseInt(parsedId[1])

        handleStop()

        if (props.ctx.currentPlayer === '0') {
            let space = props.G.c1[i][j]
            if (space.open || space.flag) return
        }
        if (props.ctx.currentPlayer === '1') {
            let space = props.G.c2[i][j]
            if (space.open || space.flag) return
        }
        props.moves.clickCell(id)
        updateTurn((1 - turn))
        if (props.ctx.gamover) return
        // toggle boards
        updateSwitch(true)
        setTimeout(() => {
            updateSwitch(false)
        }, 2000)  
    }

    const handleRightClick = (e, id) => {
        e.preventDefault()
        handleStop()
        props.moves.rightClick(id)
        updateTurn(1 - turn)
        if (props.ctx.gamover) return
        updateSwitch(true)
        setTimeout(() => {
            updateSwitch(false)
        }, 2000)  
    }

    const handleEnter = (e, id) => {
        // get if mine, play appropriate sound
        let parsedId = id.split(' ')
        let i = parseInt(parsedId[0])
        let j = parseInt(parsedId[1])
        if (e.target.classList[0] === '0') {
            // 1 and 2 can only happen on p1's turn, 3 and 4 on p2's
            if (props.G.c1[i][j].audio === 1) {
                playHigh()
            } else if (props.G.c1[i][j].audio === 2) {
                playLow()
            }
        } else if (e.target.classList[0] === '1') {
            if (props.G.c2[i][j].audio === 3) {
                playHigh()
            } else if (props.G.c2[i][j].audio === 4) {
                playLow()
            }
        }   
    }

    const handleStop = () => {
        // stop all sounds
        stopLow()
        stopHigh()
    }

    const createTbody = (cboard, k) => {
        let tbody = []
        let flagCount = 0
        for (let i = 0; i < BOARDLENGTH; i++) {
            let cells = [];
            for (let j = 0; j < BOARDLENGTH; j++) {
                const id = i + ' ' + j
                cells.push(
                    <td style={{...styles.cell, ...{ backgroundColor: cboard[i][j].open && !cboard[i][j].neighborMineCount && !cboard[i][j].mine ? '#CDCDCD' : 'white' }}} key={id} className={k} onClick={() => handleClick(id)} onContextMenu={(e)=> handleRightClick(e, id)} onMouseEnter={(e) => handleEnter(e, id)} onMouseLeave={() => handleStop()}>
                        {cboard[i][j].open ? (cboard[i][j].mine ? '💣' : (cboard[i][j].neighborMineCount ? cboard[i][j].neighborMineCount : null)) : (cboard[i][j].flag ? '🚩' : null)} 
                    </td>
                );
                if (cboard[i][j].flag) flagCount++
            }
            tbody.push(<tr key={i}>{cells}</tr>);
        }
        if (k === 1) updateFlagC1(flagCount)
        else updateFlagC2(flagCount)
        return tbody
    }

    const createSolution = (cboard) => {
        let tbody = []
        for (let i = 0; i < BOARDLENGTH; i++) {
            let cells = [];
            for (let j = 0; j < BOARDLENGTH; j++) {
                const id = i + ' ' + j
                cells.push(
                    <td style={{...styles.cell, ...{ backgroundColor: !cboard[i][j].neighborMineCount && !cboard[i][j].mine ? '#CDCDCD' : 'white' }}} key={id}>
                        {(cboard[i][j].mine ? '💣' : (cboard[i][j].neighborMineCount ? cboard[i][j].neighborMineCount : null))} 
                    </td>
                );
            }
            tbody.push(<tr key={i}>{cells}</tr>);
        }
        return tbody
    }

    useEffect(() => { // load audio on mount, they loop by default
        MDLOW.load()
        MDHIGH.load()

        MDLOW.loop = true
        MDHIGH.loop = true

        let tsolution = createSolution(props.G.c1)
        updateSolution(tsolution)
        // eslint-disable-next-line
    }, [])
    

    useEffect(() => { // front end update each move
        let t1body = createTbody(props.G.c1, 0)
        let t2body = createTbody(props.G.c2, 1)
        
        updateT1body(t1body)
        updateT2body(t2body)
        // eslint-disable-next-line
    }, [props.G])

    useEffect(() => { // gameover
        if (props.ctx.gameover !== undefined) {
            updateWinner(props.ctx.gameover.winner);
        }
    }, [props.ctx.gameover])

    return(
        <div style={styles.container}>
            {
                start ?
                <div style={styles.container}>
                    <h1 style={{ fontSize: '80px' }}> Mines! </h1>
                    <button style={ styles.button } onClick={() => { updateStart(false) }}> Click to Start! </button>
                    <h5 style={{ paddingBottom: '50px' }}> Made by Josh </h5>
                    <div style={styles.htpcontain}>
                        <h2> How to play: </h2>
                        <p> 1. Decide who goes first </p>
                        <p> 2. Take turns solving your respective minesweeper boards </p>
                        <p> 3. Mouse over cells and use audio to help identify mines </p>
                        <p> 4. Left click to reveal an area. Right click to place/remove a flag </p>
                        <p> 5. Audio information is player unique, but boards are identical </p>
                        <p> 6. There are a lot of mines, so feel free to use the audio to work together, lie, or trade information </p>
                        <p> 7. The game ends when all mines are correctly flagged or someone opens a mine </p>
                        <p> 8. When the game is over, the two boards are placed side by side. Feel free to learn from them! </p>
                    </div>
                    <div style={styles.legend}>
                        <p style={{ fontSize: '20px', fontWeight: 'bold' }}> Mines! Quick Guide Table </p>
                        <table>
                            <tbody>
                                <tr>
                                    <td style={styles.c}>left click</td>
                                    <td style={styles.c}>open cell</td>
                                </tr>
                                <tr>
                                    <td style={styles.c}>flag (right click)</td>
                                    <td style={styles.c}>🚩</td>
                                </tr>
                                <tr>
                                    <td style={styles.c}>bomb</td>
                                    <td style={styles.c}>💣</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                :
                winner !== null ?
                <div>
                    <h1 style={styles.text}> Player {winner + 1} wins 🎉🎉</h1>
                    <button onClick={() => { window.location.reload() }} style={styles.playAgain}> PLAY AGAIN </button>
                    <h4> Player 1 </h4>
                    <table style={styles.table}>
                        <tbody>{tbody1}</tbody>
                    </table>
                    <h4> Player 2 </h4>
                    <table style={styles.table}>
                        <tbody>{tbody2}</tbody>
                    </table>
                    <h4> Solution </h4>
                    <table style={styles.table}>
                        <tbody>{tsolution}</tbody>
                    </table>
                </div>
                :
                switchScreen ?
                <div style={styles.switch}>
                    <h1>Switch Turns</h1>
                </div>
                :
                <div>
                    <h1 styles={styles.text}> Player {turn + 1}'s turn </h1>
                    <table id='board' style={styles.table}>
                        <tbody>{turn ? tbody2 : tbody1}</tbody>
                    </table>
                    <table style={styles.legend2}>
                        <tbody>
                            <tr>
                                <td style={styles.c}>🚩 / 💣</td>
                                <td style={styles.c}>{turn ? flagC1 : flagC2} / {BOMBS}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            }   
        </div>
    );
}

let styles = {
    button: {
        backgroundColor: '#04AA6D',
        border: 'none',
        color: 'white',
        padding: '20px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inlineBlock',
        fontSize: '16px',
        marginTop: '10px',
        marginBottom: '5px'
        
    },
    c : {
        padding: '10px',
        border: '1px solid black',
    },
    container: {
        paddingTop: '50px',
        margin: 'auto',
        width: '100%',
        height: '100%',
        textAlign: 'center',
        minHeight : '100vh'
    }, 
    htpcontain: {
        margin: 'auto',
        justifyContent: 'center',
        alignSelf: 'center',
        width: '50%',
        padding: '10px',
        border: '2px solid black',
    },
    cell: {
        border: '1px solid #555',
        width: '50px',
        height: '50px',
        lineHeight: '50px',
        textAlign: 'center',
    },
    legend: {
        position: 'absolute',
        left: '50px',
        top: '180px',
    },
    legend2: {
        position: 'absolute',
        right: '50px',
        top: '100px',
    },
    playAgain: {
        padding: 10,
        marginTop: 10,
        paddingTop: 15,
        paddingBottom: 15,
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 10,
        backgroundColor: '#00dddd',
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold'
    },
    switch: {
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -10%)',
        fontSize: '50px',
        backgroundColor: '#D22B2B',
        padding: 20,
        color: 'white',
        borderRadius: 10
    },
    text: {
        textAlign: 'center'
    },
    table: {
        marginLeft: 'auto',
        marginRight: 'auto',
    }

}