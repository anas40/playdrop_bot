// in create, case 25, line around 9030
if (_?.item?.length) {
    if (!window.items) window.items = []
    window.items = window.items.concat(JSON.parse(JSON.stringify(_.item)))
}

// in destroy, case 30 line around 9050  
if (_.item) {
    if (!window.destroy) window.destroy = []
    window.destroy = window.destroy.concat(JSON.parse(JSON.stringify(_.item)))
}

// handlePostion, case 19, line around 9000
if (!window.myGotchi) window.myGotchi = "0"
const myPlayer = _.player.find(p => p.id == window.myGotchi)
if (myPlayer) window.player = myPlayer

//line 7970  
//below these function definitions

// function p(e) {
//     u += 1,
//         b[e].isPressed = !0,
//         b[e].pressSequence = u
// }
// function g(e) {
//     b[e].isPressed = !1,
//         b[e].pressSequence = 0
// }
window.button_down = p 
window.button_up = g 
    