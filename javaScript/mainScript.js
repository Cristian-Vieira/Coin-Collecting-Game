window.addEventListener("keydown", function (e) { // bloco que remove a função de rolagem de pagina para as setas do teclado
    if ([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

window.onload = function () {   

    window.requestAnimationFrame(draw); // start no desenho 
    window.scrollTo(0, document.body.scrollHeight)// função para rolar a pagina até o final

    const AREA_DO_CANVAS = document.getElementById("canvas"); // obtem o elemento conm id AREA_DO_CANVAS para a variavel AREA_DO_CANVAS
    const DRAW_METHODS_2d = AREA_DO_CANVAS.getContext("2d"); //obtem os metodos de desenho em 2d para a variavel AREA_DO_CANVAS
    let x = 285; // posição do quadrado no eixo x
    let y = 185;// posição do quadrado no eixo y
    let coinx = Math.random() * (600 - 15); // gera uma posição aletoria para coin no eixo x
    let coiny = Math.random() * (400 - 15);// gera uma posição aletoria para coin no eixo y

    let t = Date.now(); // Varivel para medir o tempo de execução de um trecho de código ou para obter uma marca de tempo que possa ser usada para calcular o tempo decorrido entre dois pontos em um programa
    let speed = 350; // define a velocidade de animação para 
    let dir = 0; // varival que define a direção do quadrado e ira ser manipulada para delimitar até onde ele pode ir
    let score = 0; //variavel que recebera os pontos quando o quadrado pegar uma moeda

    up.onmousedown = function () { dir = 4; up.classList.add('botao_em_foco'); } // quando o mouse é precionado sobre o botão com o id up
    down.onmousedown = function () { dir = 3; down.classList.add('botao_em_foco'); } // quando o mouse é precionado sobre o botão com o id down
    left.onmousedown = function () { dir = 2; left.classList.add('botao_em_foco'); } // quando o mouse é precionado sobre o botão com o id left
    right.onmousedown = function () { dir = 1; right.classList.add('botao_em_foco'); } // quando o mouse é precionado sobre o botão com o id right

    up.onmouseup = function () { dir = 0; up.classList.remove('botao_em_foco'); } // quando o botão do mouse é solto
    down.onmouseup = function () { dir = 0; down.classList.remove('botao_em_foco'); }
    left.onmouseup = function () { dir = 0; left.classList.remove('botao_em_foco'); }
    right.onmouseup = function () { dir = 0; right.classList.remove('botao_em_foco'); }

    document.addEventListener('keydown', function (event) { //ouvinte para o evento de pressionar as teclas
        switch (event.keyCode) {
            case 37: // seta para esquerda
                dir = 2;
                left.classList.add('botao_em_foco');// adiciona a classe_css botão em foco alterando o CSS
                break;
            case 38: // seta para cima
                dir = 4;
                up.classList.add('botao_em_foco');// adiciona a classe_css botão em foco alterando o CSS
                break;
            case 39: // seta para direita
                dir = 1;
                right.classList.add('botao_em_foco');// adiciona a classe_css botão em foco alterando o CSS
                break;
            case 40: // seta para baixo
                dir = 3;
                down.classList.add('botao_em_foco');// adiciona a classe_css botão em foco alterando o CSS
                break;
        }
    });

    document.addEventListener('keyup', function (event) {//ouvinte para o evento de soltar as teclas
        switch (event.keyCode) {
            case 37:left.classList.remove('botao_em_foco');dir = 0;// remove a classe_css do botão ← em foco // seta para esquerda
               break;
            case 38:up.classList.remove('botao_em_foco');dir = 0;// remove a classe_css do botão ↑ em foco alterando o CSS // seta para cima
                break;
            case 39:right.classList.remove('botao_em_foco');dir = 0;// remove a classe_css do botão → em foco // seta para direita
                break;
            case 40:down.classList.remove('botao_em_foco');dir = 0;// remove a classe_css do botão ↓ em foco // seta para baixo
                break;
        }
    });

    function draw() { // função principal de denho no AREA_DO_CANVAS

        let timePassed = (Date.now() - t) / 1000; // variavel que rece o valor do tempo passado des do começo da execução
        t = Date.now();// redefine a variavel t
        let fps = Math.round(1 / timePassed);//variavel que calcula o fps arredondando o valor para o numero inteiro mais proximo

        DRAW_METHODS_2d.clearRect(0, 0, 600, 400); // limpa a tela/AREA_DO_CANVAS inteira

        DRAW_METHODS_2d.font = '15px Arial'; //indica o começo dobloco que exibe a contagem de FPS nas coordenadas especificdas pelo metodo fillText
        DRAW_METHODS_2d.fillStyle = 'black';
        DRAW_METHODS_2d.fillText("FPS: " + fps, 10, 30);

        DRAW_METHODS_2d.beginPath();//indica o começo do bloco que exibe a contagem de moedas nas coordenadas especificdas pelo metodo fillText
        DRAW_METHODS_2d.font = '15px Arial';
        DRAW_METHODS_2d.fillStyle = 'black';
        DRAW_METHODS_2d.fillText("Moedas: " + score, 100, 30);

        DRAW_METHODS_2d.beginPath();//indica o começo do bloco de desenha o quadrado principal
        DRAW_METHODS_2d.rect(x, y, 30, 30);
        DRAW_METHODS_2d.fillStyle = "red";
        DRAW_METHODS_2d.fill();
       
        
        DRAW_METHODS_2d.beginPath();//indica o começo do bloco que desenha a moeda
        DRAW_METHODS_2d.arc(coinx, coiny, 7, 0, 6.3);
        DRAW_METHODS_2d.fillStyle = "#e3c228";
        DRAW_METHODS_2d.fill();

        if (dir == 1) { // caso a direção for 1 quadrado se move para a direita
            if (x + 30 < 600) {
                x += (speed * timePassed); // Move e quadrado para direita incrementando do valor do eixo x usando velocidade multiplicada pelo tempo passado 
            }
        }
        else if (dir == 2) {// caso a direção for 2 quadrado se move para a esquerda
            if (x > 0) {
                x -= (speed * timePassed);// Move e quadrado para esquerda decrementando valor do eixo x usando velocidade multiplicada pelo tempo passado 
            }
        }
        else if (dir == 3) { // caso a direção for 3 quadrado se move para baixo
            if (y + 30 < 400) {
                y += (speed * timePassed);// Move e quadrado para cima incrementando do valor do eixo y usando velocidade multiplicada pelo tempo passado 
            }
        }
        else if (dir == 4) {// caso a direção for 4 quadrado se move para cima
            if (y > 0) {
                y -= (speed * timePassed);// Move e quadrado para cima decrementando valor do eixo y usando velocidade multiplicada pelo tempo passado 
            }
        }

        if (coinx <= x + 30 && x <= coinx + 10 && coiny <= y + 28 && y <= coiny + 10) { // condição que representa a colisão do quadrado com a moeda
            score++; 
            coinx = Math.random() * (600 - 15); //gera uma nova posição para a moeda no eixo x
            coiny = Math.random() * (400 - 15); //gera uma nova posição para a moeda no eixo y
        }
        window.requestAnimationFrame(draw); // usa o metodo requestAnimationFrame para a função de desenho usar os recursos disponiveis do navegador para usar as funções de desenho e animação
    }
    
}
