const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const playerOne = {
    name: '',
    rounds: 0,
    point: 0
}

const playerTwo = {
    name: '',
    rounds: 0,
    point: 0
}

const opciones = ["0", "1", "2", "3", "4"]

const puntoScore = {
    ["0"]: 0,
    ["1"]: 15,
    ["2"]: 30,
    ["3"]: 40,
    ["4"]: "ventaja",
}

/////////////   MENU  ///////////////////
function showMainMenu() {
    console.log("\nMenú:");
    console.log("1. Configurar nombres de jugadores");
    console.log("2. Empezar el juego");
    console.log("3. Salir");
    rl.question("Elija una opción: ", (option) => {
        switch (option) {
            case "1":
                configurePlayerNames();
                break;
            case "2":
                startGame();
                break;
            case "3":
                endGame();
                break
            case "":
                rl.close();
                break;
            default:
                console.log("Opción inválida. Elija de nuevo.");
                showMainMenu();
        }
    });
}

//player configurations
function configurePlayerNames() {
    console.log("Configuración de nombres de jugadores:");
    rl.question("Nombre del jugador 1: ", (name1) => {
        playerOne.name = name1;
        rl.question("Nombre del jugador 2: ", (name2) => {
            playerTwo.name = name2;
            console.log(`Los nombres de los jugadores han sido configurados: ${playerOne.name} vs ${playerTwo.name}`);
            showMainMenu();
        });
    });
}

//START GAME
function startGame() {
    if (playerOne.name == "" || playerTwo.name == "") {
        console.log("Los nombres de los jugadores no han sido configurados aún.");
        showMainMenu();
    } else {
        console.log(`¡Comienza el juego entre ${playerOne.name} y ${playerTwo.name}!`);
        iniciarJuego()
    }

}

async function iniciarJuego() {
    let numSets = 0
    while (numSets < 8) {
        await partido();
        numSets += 1;
    }
    validarGanadorFinal()
}



async function partido() {
    console.log("\nPartido:");
    console.log(`1.${playerOne.name}`);
    console.log(`2.${playerTwo.name}`);
    playerOne.point = 0
    playerTwo.point = 0

    const namePlayer = await preguntar("quien gano el punto: ")

    if (namePlayer == "1") {
        playerOne.point = await puntos()
    } else if (namePlayer == "2") {
        playerTwo.point = await puntos()
    }

    marcador()
    validarGanador()
}

function validarGanador() {
    if (playerOne.point > playerTwo.point) {
        playerOne.rounds += 1;
    } else if (playerTwo.point > playerOne.point) {
        playerTwo.rounds += 1;
    } else {
        console.log('Empatados!')
    }
}

function validarGanadorFinal() {

    if (playerOne.rounds >= 7 && playerOne.rounds > playerTwo.rounds + 2) {
        console.log(`has ganado ${playerOne.name}`)

    } else if (playerTwo.rounds >= 7 && playerTwo.rounds > playerOne.rounds + 2) {
        console.log(`has ganado ${playerTwo.name}`)
    }

    rl.close()

}
function marcador() {
    console.log('\nMarcador de los juegos actual')
    console.log(`${playerOne.name} [${playerOne.rounds}] - [${playerTwo.rounds}] ${playerTwo.name} `)
    console.log('\nMarcador de los puntos')
    console.log(`${playerOne.name} [${playerOne.point}] - [${playerTwo.point}] ${playerTwo.name} `)
}
async function puntos() {
    let next = true
    let point = 0
    do {
        point = await preguntar('Que punto anoto? : ');

        if (opciones.includes(point)) {
            next = false;
        } else {
            console.log('opcion no valida');
        }

    } while (next)
    return puntoScore[point];
}


async function preguntar(texto) {
    return new Promise(resolve => {
        rl.question(texto, resolve);
    });
}

function endGame() {
    console.log('Fin del juego, adios')
    rl.close();
}


showMainMenu();