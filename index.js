/* 
TODO
- usuario inserir limite de tempo
- mostrar marcacoes
*/

function main(){
    const btnStop = document.getElementById("btnStop");
    btnStop.addEventListener("click", stop);
    
    const btnStart = document.getElementById("btnStart");
    btnStart.addEventListener("click", start);
    
    const btnReset = document.getElementById("btnReset");
    btnReset.addEventListener("click", reset);
    
    const btnContinue = document.getElementById("btnContinue");
    btnContinue.addEventListener("click", continuar);
    
    const btnMark = document.getElementById("btnMark");
    btnMark.addEventListener("click", marcar);
}
let idCronometro = null;//ponteiro
let lastUpdate = new Date().setHours(0,0,0,0);
let lastPause;
const cronometro = function () {
    let idIncrementoMs = setInterval(
        () =>{
            updateElement(formataTexto(lastUpdate));
            
            lastUpdate = new Date(lastUpdate);
            lastPause = new Date(lastUpdate);
            if(lastUpdate.getHours() === 99){
                stop();
                window.clearInterval(idIncrementoMs);
            }
            lastUpdate.setMilliseconds(lastUpdate.getMilliseconds() + 10);
        },10
    );
    return idIncrementoMs;
}
/*  */
function formataTexto(t){//formata e devolve
    let tempo = new Date(t);
    console.log(tempo.getHours()
        +":"+ tempo.getMinutes()
        +":"+tempo.getSeconds()
        +":"+tempo.getMilliseconds().toString().substring(0, 2));
    return `${formataUnidade(tempo.getHours())}:${formataUnidade(tempo.getMinutes())}:${formataUnidade(tempo.getSeconds())}:${tempo.getMilliseconds().toString().substring(0, 2)}`;
}

function start({target}){//seta 00:00 e dispara interval
    idCronometro = cronometro();
    displayButtons(["btnStop"], ["btnStart", "btnContinue", "btnReset", "btnMark"]);
}
function stop(){//atualiza ultimo tempo
    console.log(idCronometro);
    window.clearInterval(idCronometro);
    displayButtons(["btnReset", "btnMark", "btnContinue"], ["btnStart", "btnStop"]);
}
function reset(){//seta pra 00:00
    lastUpdate = new Date().setHours(0,0,0,0);
    updateElement(formataTexto(lastUpdate));
    displayButtons(["btnStart"], ["btnContinue", "btnStop", "btnReset", "btnMark"]);
}
function continuar(){//novo disparo do interval com o ultimo tempo
    idCronometro = cronometro();
    displayButtons(["btnStop"], ["btnStart", "btnContinue", "btnReset", "btnMark"]);
}
function marcar(){//marca o tempo de pause
    console.log(`*******************************${formataTexto(lastPause)}********************`);
}
function updateElement(t){
    let tempo = document.getElementById("tempo");
    tempo.innerText = formataTexto(lastUpdate);
}
function formataUnidade(parteDoTempo){
    return parteDoTempo < 10 ? "0"+ parteDoTempo : parteDoTempo;
}
function displayButtons(display = [], hidden = []){//
    display.forEach(
        e => {
            let btnX = document.getElementById(e);
            btnX.style.display = "inline-block";
        }
    );
    hidden.forEach(
        e => {
            let btnX = document.getElementById(e);
            btnX.style.display = "none";
        }
    );
}