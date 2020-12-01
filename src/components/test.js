function reverseMyName(str) {


    return str.split("").reverse().join("")
}

const Test = () => console.log(reverseMyName(""));

function warnTheSheep(queue) {
    const wolfPosition = queue.reverse().indexOf('wolf');
    if (wolfPosition === 0) {
        return "Please go away and stop eating my sheep"
    } else {
        return `Oi! Sheep number ${wolfPosition}! You are about to be eaten by a wolf!`
    }
}