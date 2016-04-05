/**
 * Created by ndyumin on 02.04.2016.
 */

const Rx = require('rxjs');
const {store} = require('rstore');
const {just, none, maybe, either} = require('./util');

const getClickStream = selector => Rx.Observable.fromEvent(
    document.getElementById(selector),
    'click',
    e => +e.target.getAttribute('data-stream-index'));

const spotClicks1$ = getClickStream('player1');
const spotClicks2$ = getClickStream('player2');
const opClicks$ = Rx.Observable.fromEvent(
    document.getElementById('operators'),
    'click',
    e => e.target.id
);
store({
    spot: none(),
    player1Streams: [],
    player2Streams: []
}).plug(
    spotClicks1$, (s, u) => Object.assign({}, s, {spot: [1, maybe(u)]}),
    spotClicks2$, (s, u) => Object.assign({}, s, {spot: [2, maybe(u)]}),
    opClicks$, (s, u) => Object.assign({}, s, {spot: [2, maybe(u)]})
).subscribe(render);

function render(model) {
    console.log(JSON.stringify(model));
}

//console.log(either(just(1).value, maybe(234).value).value);
//console.log(either(just(2).value, maybe(null).value).value);
//console.log(either(just(3).value, none().value).value);
