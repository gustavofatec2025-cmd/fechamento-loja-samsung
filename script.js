let texto = "";
let tipo = document.getElementById('tipo');

let telaFechamento = document.getElementById("telaFechamento");
let telaAcessorios = document.getElementById("telaAcessorios");
let telaSeguro = document.getElementById("telaSeguro");
let telaQuantidade = document.getElementById("telaQuantidade");

tipo.innerHTML = "<h1>Fechamento</h1>"

window.addEventListener('keydown', function(event){
    if(event.key === 'Enter'){
        event.preventDefault(); 

        if(telaFechamento.classList.contains('ativa')){
            proximaTela('acessorios');
        }
        else if(telaAcessorios.classList.contains('ativa')){
            proximaTela('seguro');
        }
        else if(telaSeguro.classList.contains('ativa')){
            proximaTela('quantidade');
        }
        else if(telaQuantidade.classList.contains('ativa')){
            enviar();
        }
    }
})

function formatar(valor){

    let n;
    if(!valor)
    {
        return "R$0,00";
    }

    if(typeof valor === 'number'){
        n = valor
    }
    else{
        
        let valorFormatado = parseFloat(valor.toString().replace(/\./g, '').replace(',', '.'));
        
        n = valorFormatado
    }

    if (isNaN(n)) {
        return "R$ 0,00";
    }

    return n.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

function desformatar(valor) {
    if (!valor) return 0;

    let numeroLimpo = valor.toString().replace(/\./g, '').replace(',', '.');
    
    return parseFloat(numeroLimpo);
}

function erroMensagem(texto, mensagem){
    mensagem.style.visibility = 'visible'
    mensagem.innerHTML = `${texto}`;

    telaFechamento.addEventListener('input', function(){
        mensagem.style.visibility = 'hidden';
    })
}

function proximaTela(proxima){

    if(proxima === 'acessorios'){
        let m = document.getElementById('metaFechamento').value;
        let r = document.getElementById('realiFechamento').value;
        let c = document.getElementById('contFechamento').value;
        let mensagem = document.getElementById('mensagemFechamento');
        
        if(m.trim() === "" || r.trim() === "" || c.trim() === ""){
            erroMensagem("Preencha todos os campos!", mensagem);
            return;
        }
        
        let data = new Date();
        
        let dataFormatada = data.toLocaleString('pt-BR');
        
        let mF = desformatar(m);
        let rF = desformatar(r);
        let cF = desformatar(c);
        
        let t = rF + cF
        
        if(isNaN(mF) || isNaN(rF) || isNaN(cF)){
            erroMensagem("Apenas Números são permitidos!", mensagem);
            return
        }
        alert(`Realizado + Contingência = Total\n${formatar(rF)} + ${formatar(cF)} = ${formatar(t)}`)
        
        texto = `     *Fechamento Loja Campinas Shopping:*%0A%20%20%20%20%20%20%20%20%20%20%20%20*${dataFormatada}*%0A--------------------------------------------------------------------------------%0A*Aparelhos:*%0A    *Meta:* ${formatar(mF)}%0A` +
        `    *Realizado:* ${formatar(rF)}%0A    *Contingência:* ${formatar(cF)}%0A    *Total no dia:* ${formatar(t)}%0A--------------------------------------------------------------------------------%0A`; 
        
        tipo.innerHTML = "<h1>Acessórios</h1>"
        document.getElementById("telaFechamento").classList.remove("ativa");
        document.getElementById("telaAcessorios").classList.add("ativa");
    }
    else if(proxima === 'seguro'){
        let mA = document.getElementById('metaAcessorios').value;
        let rA = document.getElementById('realiAcessorios').value;
        let cA = document.getElementById('contAcessorios').value;
        let mensagem = document.getElementById('mensagemAcessorios');

        if(mA.trim() === "" || rA.trim() === "" || cA.trim() === ""){
            erroMensagem("Preencha todos os campos!", mensagem);
            return;
        }
        
        let mAF = desformatar(mA);
        let rAF = desformatar(rA);
        let cAF = desformatar(cA);
        
        if(isNaN(mAF) || isNaN(rAF) || isNaN(cAF)){
            erroMensagem("Apenas Números são permitidos!", mensagem);
            return
        }

        
        texto += `*Acessórios*:%0A    *Meta Fat:* ${formatar(mAF)}%0A` +
        `    *Realizado Dia:* ${formatar(rAF)}%0A    *Acumulado:* ${formatar(cAF)}%0A--------------------------------------------------------------------------------%0A`; 
        
        tipo.innerHTML = "<h1>Seguros</h1>"
        document.getElementById("telaAcessorios").classList.remove("ativa");
        document.getElementById("telaSeguro").classList.add("ativa");
    }
    else if(proxima === 'quantidade'){
        let mS = document.getElementById('metaSeguro').value;
        let rS = document.getElementById('realiSeguro').value;
        let cS = document.getElementById('contSeguro').value;
        let mensagem = document.getElementById('mensagemSeguro');

        if(mS.trim() === "" || rS.trim() === "" || cS.trim() === ""){
            erroMensagem("Preencha todos os campos!", mensagem);
            return;
        }

        let mSF = desformatar(mS);
        let rSF = desformatar(rS);
        let cSF = desformatar(cS);
        
        if(isNaN(mSF) || isNaN(rSF) || isNaN(cSF)){
            erroMensagem("Apenas Números são permitidos!", mensagem);
            return
        }
        
        texto += `*Seguros*:%0A    *Meta Fat:* ${formatar(mSF)}%0A` +
        `    *Seguro Dia:* ${formatar(rSF)}%0A    *Acumulado:* ${formatar(cSF)}%0A--------------------------------------------------------------------------------%0A`; 
        
        tipo.innerHTML = "<h1>Quantidade de Itens</h1>"
        document.getElementById("telaSeguro").classList.remove("ativa");
        document.getElementById("telaQuantidade").classList.add("ativa");
    }
}

function enviar(){
    let aparelho = document.getElementById('aparelho').value;
    let pelicula = document.getElementById('pelicula').value;
    let mensagem = document.getElementById('mensagemQuantidade');

    if(aparelho.trim() === "" || pelicula.trim() === ""){
        erroMensagem("Preencha todos os campos!", mensagem);
        return;
    }

    let aparelhoF = desformatar(aparelho);
    let peliculaF = desformatar(pelicula);
    
    if(isNaN(aparelhoF) || isNaN(peliculaF)){
        erroMensagem("Apenas Números são permitidos!", mensagem);
        return
    }

    texto += `*Itens Vendidos:*%0A    *Aparelhos:* ${aparelho}%0A    *Películas:* ${pelicula}`;

    let telefone = "+5519992961108";

    alert(`Enviando para ${telefone}\nRedirecionando ao Whatsapp`);

    window.open(`https://wa.me/${telefone}?text=${texto}`);
}

function reiniciar(){
    texto = "";
    window.location = "index.html";
}