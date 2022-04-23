function sleep(time) { return new Promise(resolve => setTimeout(resolve, time)) }


window.myGotchi = "####"
window.player = { x: 0, y: 0 }
let stopGame = false
const directions = ["UP", "DOWN", "LEFT", "RIGHT"]


function flush_data() {
    window.items = []
    window.destroy = []
}


function destroy_items(to_destroy, all_food_items) {
    //todo since destroyed == true is added then remove only those items from window.destroy
    for (const destroyed_food of to_destroy) {
        if (destroyed_food?.destroyed == true) {
            all_food_items = all_food_items.filter(food => food.id != destroyed_food.id)
        }
    }
    return all_food_items
}


function find_nearest_item(my_player, all_items) {
    let nearest_item = null
    let min_distance = 1_000_000_000

    for (const item of all_items) {
        const distance = Math.abs(my_player.x - item.x) + Math.abs(my_player.y - item.y)
        if (distance < min_distance) {
            nearest_item = item
            min_distance = distance
        }
    }

    return nearest_item
}


function move(direction, time) {
    return new Promise(resolve => {
        button_down(direction)
        setTimeout(() => {
            button_up(direction)
            resolve()
        }, time)
    })
}



init()
async function init() {
    
    while (!stopGame) {
        flush_data()

        const current_second = new Date().getSeconds()

        //if not correct time moving in random direction
        if (current_second != 30 && current_second != 0) {
            const idx = parseInt(Math.random() * 4)
            const direction = directions[idx]

            const time = current_second > 30 ? 60 - current_second : 30 - current_second

            await move(direction, time * 1000)
        }


        const startTime = Date.now()

        //reaction time
        const delay = 300
        await sleep(delay)

        //food arrives every 30 seconds and delay checks take 4 seconds, total running 28 seconds
        while (Date.now() < startTime + 24 * 1000) {

            window.items = destroy_items(window.destroy, window.items)
            window.destroy = []

            // read current position
            const my_position = window.player
            let all_food_items = window.items

            //Checking if food arrives with delay
            for (let i = 0; i < 40 && all_food_items.length == 0; i++) {
                await sleep(100)
                all_food_items = window.items || []
                if (all_food_items.length != 0) {
                    console.log("Delayed items");
                    break;
                }
            }

            //No items arrived or left
            if (all_food_items.length == 0) {
                console.log("No Items");
                break;
            }

            // read nearest gem position
            const nearest_food = find_nearest_item(my_position, all_food_items)
            const x_direction = nearest_food.x - my_position.x
            const y_direction = nearest_food.y - my_position.y

            //picking the direction with more distance to move
            const move_time = Math.random() * 150 + 50
            let move_direction = "LEFT"

            if (y_direction > 0) move_direction = "DOWN"
            else if (y_direction < 0) move_direction = "UP"

            if (Math.abs(x_direction) > Math.abs(y_direction)) {
                if (x_direction > 0) move_direction = "RIGHT"
                else if (x_direction < 0) move_direction = "LEFT"
            }

            await move(move_direction, move_time)

            //to simulate keypress delay
            await sleep(Math.random()*20+20)
        }
    }
}