'use strict';

//Selecting Elements - Seleciona os elementos
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

// STARTING CONDITIONS - Condições iniciais
const init = function(){
    // Starting conditions
    scores = [0, 0]
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    
    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');

    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}
init();

const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

// Rolling dice function - função de jogar o dado
btnRoll.addEventListener('click', function(){
    if(playing){
    // Generate a random dice - gera um numero de dado aleatório
    const dice = Math.trunc(Math.random()* 6 ) + 1;
    // display dice - Mostra o dado
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`
    // Check for rolled 1: if true, switch to next player - checa se o  numedo do dado é 1, se SIM muda para o outro jogador
    if(dice !== 1){
    // add dice to score - adiciona o valor do dado ao Score
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else{
    // the current player score if dice = 1 - Mantém o Score do player da jogada caso o valor do dado seja 1
        switchPlayer();
    }
    }
});

btnHold.addEventListener('click', function(){
    if(playing){
    // add current score to active player's score - Adiciona e soma o Score atual ao player da jogada
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    // check if player score is >= 100 - Checa se o Score é >= 100
    if(scores[activePlayer] >= 100){
        // finish the game - Finaliza o jogo
        playing = false;
        diceEl.classList.add('hidden');
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    } else {
    // switch to next player - Muda para o outro jogador
        switchPlayer();
    }
}
});

btnNew.addEventListener('click', init)