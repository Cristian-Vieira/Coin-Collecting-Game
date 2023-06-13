// bloco que remove a função de rolagem de pagina para as setas do teclado
window.addEventListener("keydown", function (e) { 
    if ([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

window.onload = function () {

    window.requestAnimationFrame(draw); // Start no desenho 
    window.scrollTo(0, document.body.scrollHeight) // função para rolar a pagina até o final

    const AREA_DO_CANVAS = document.getElementById("canvas"); // obtem o elemento conm id AREA_DO_CANVAS para a variavel AREA_DO_CANVAS
    const DRAW_METHODS_2d = AREA_DO_CANVAS.getContext("2d"); //obtem os metodos de desenho em 2d para a variavel AREA_DO_CANVAS
    let x = 285; 
    let y = 185; 
    let coinx = Math.random() * (600 - 15); // gera uma posição aletoria para coin no eixo x
    let coiny = Math.random() * (400 - 15); // gera uma posição aletoria para coin no eixo y

    let t = Date.now(); // Variavel para manipular o tempo
    let speed = 350; // define a velocidade e distancia de um step do coletor
    let dir = 0; // varival receberá a direção de onde o coletor vai
    let score = 0; // variavel que receberá os pontos 

     // Eventos para mover o coletor clicando diretamente nos botões do mouse
    up.onmousedown = function () { dir = 4; up.classList.add('botao_em_foco'); } 
    down.onmousedown = function () { dir = 3; down.classList.add('botao_em_foco'); } 
    left.onmousedown = function () { dir = 2; left.classList.add('botao_em_foco'); } 
    right.onmousedown = function () { dir = 1; right.classList.add('botao_em_foco'); } 
     // Eventos para parar o movimento quando o mouse é solto
    up.onmouseup = function () { dir = 0; up.classList.remove('botao_em_foco'); } 
    down.onmouseup = function () { dir = 0; down.classList.remove('botao_em_foco'); }
    left.onmouseup = function () { dir = 0; left.classList.remove('botao_em_foco'); }
    right.onmouseup = function () { dir = 0; right.classList.remove('botao_em_foco'); }

     // Ouvinte para mover o coletor pelas setas do teclado
    document.addEventListener('keydown', function (event) { 
        switch (event.keyCode) {
            case 37: // seta para esquerda
                dir = 2;
                left.classList.add('botao_em_foco');// adiciona a classe_css botão em foco 
                break;
            case 38: // seta para cima
                dir = 4;
                up.classList.add('botao_em_foco');// adiciona a classe_css botão em foco 
                break;
            case 39: // seta para direita
                dir = 1;
                right.classList.add('botao_em_foco');// adiciona a classe_css botão em foco 
                break;
            case 40: // seta para baixo
                dir = 3;
                down.classList.add('botao_em_foco');// adiciona a classe_css botão em foco 
                break;
        }
    });

     // Ouvinte para parar o movimento ao soltar as teclas
    document.addEventListener('keyup', function (event) {
        switch (event.keyCode) {
            case 37:left.classList.remove('botao_em_foco'); dir = 0; // Remove a classe_css do botão ← em foco // seta para esquerda
               break;
            case 38:up.classList.remove('botao_em_foco'); dir = 0; // Remove a classe_css do botão ↑ em foco alterando o CSS // seta para cima
                break;
            case 39:right.classList.remove('botao_em_foco'); dir = 0; // Remove a classe_css do botão → em foco // seta para direita
                break;
            case 40:down.classList.remove('botao_em_foco'); dir = 0; // Remove a classe_css do botão ↓ em foco // seta para baixo
                break;
        }
    });

     // função principal de desenho no canvas
    function draw() { 
        
        let timePassed = (Date.now() - t) / 1000; // Variavel manipuladora do tempo passado durante uma volta do loop
        t = Date.now(); // Redefine a variavel 't' para medir o proximo loop
        let fps = Math.round(1 / timePassed); // Variavel que recebe o calculo do fps

         // Adicionando as imagens
        let img = new Image(); 
        img.src = './images/saco.png';
        let img2 = new Image();
        img2.src = './images/moeda.png';

        DRAW_METHODS_2d.clearRect(0, 0, 600, 400); // Limpa a tela/AREA_DO_CANVAS inteira
        
         // Bloco da exibição do FPS
        DRAW_METHODS_2d.font = '15px Arial'; 
        DRAW_METHODS_2d.fillStyle = 'white';
        DRAW_METHODS_2d.fillText("FPS: " + fps, 10, 30);

        DRAW_METHODS_2d.beginPath();

        // Bloco da contagem do score
        DRAW_METHODS_2d.font = '15px Arial';
        DRAW_METHODS_2d.fillStyle = 'white';
        DRAW_METHODS_2d.fillText("Moedas: " + score, 100, 30);

        DRAW_METHODS_2d.beginPath();

         // Desenha o coletor
        DRAW_METHODS_2d.drawImage(img, x-12, y-18, 50, 50)

        DRAW_METHODS_2d.beginPath();
        
         // Desenha as moedas
        DRAW_METHODS_2d.drawImage(img2, coinx-12, coiny-12, 25, 25)

        if (dir == 1) { // caso a direção for 1 quadrado se move para a direita
            if (x + 30 < 600) {
                x += (speed * timePassed); // Move e quadrado para direita incrementando do valor do eixo x usando velocidade multiplicada pelo tempo passado 
            }
        }
        else if (dir == 2)  {// Caso a direção for 2 quadrado se move para a esquerda
            if (x > 0) {
                x -= (speed * timePassed);// Move e quadrado para esquerda decrementando valor do eixo x usando velocidade multiplicada pelo tempo passado 
            }
        }
        else if (dir == 3) { // Caso a direção for 3 quadrado se move para baixo
            if (y + 30 < 400) {
                y += (speed * timePassed);// Move e quadrado para cima incrementando do valor do eixo y usando velocidade multiplicada pelo tempo passado 
            }
        }
        else if (dir == 4) {// Caso a direção for 4 quadrado se move para cima
            if (y > 0) {
                y -= (speed * timePassed);// Move e quadrado para cima decrementando valor do eixo y usando velocidade multiplicada pelo tempo passado 
            }
        }
         
         // condição que representa a colisão do quadrado com a moeda
        if (coinx <= x + 30 && x <= coinx + 10 && coiny <= y + 28 && y <= coiny + 10) {
            score++; 
            coinx = Math.random() * (600 - 15); // Gera uma nova posição para a moeda no eixo x
            coiny = Math.random() * (400 - 15); // Gera uma nova posição para a moeda no eixo y
        }

        window.requestAnimationFrame(draw); // Chama a função "draw" reiniciando o loop

    }
    
}
