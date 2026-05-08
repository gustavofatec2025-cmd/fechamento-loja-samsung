let texto = "";
let tipo = document.getElementById('tipo');
tipo.innerHTML = "<h1>Fechamento</h1>"

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

function proximaTela(proxima){

    if(proxima === 'acessorios'){
        let m = document.getElementById('metaFechamento').value;
        let r = document.getElementById('realiFechamento').value;
        let c = document.getElementById('contFechamento').value;
        
        if(m.trim() === "" || r.trim() === "" || c.trim() === ""){
            alert("Todos os campos devem ser preenchidos!");
            return;
        }
        
        let data = new Date();
        
        let dataFormatada = data.toLocaleString('pt-BR');
        
        let mF = desformatar(m);
        let rF = desformatar(r);
        let cF = desformatar(c);
        
        let t = rF + cF
        
        if(isNaN(mF) || isNaN(rF) || isNaN(cF)){
            alert("Erro!\nTente novamente!");
            return
        }
        alert(`Realizado + Contingência = Total\n${formatar(rF)} + ${formatar(cF)} = ${formatar(t)}`)
        
        texto += `     *Fechamento Loja Campinas Shopping:*%0A%20%20%20%20%20%20%20%20%20%20%20%20*${dataFormatada}*%0A--------------------------------------------------------------------------------%0A*Aparelhos:*%0A    *Meta:* ${formatar(mF)}%0A` +
        `    *Realizado:* ${formatar(rF)}%0A    *Contingência:* ${formatar(cF)}%0A    *Total no dia:* ${formatar(t)}%0A--------------------------------------------------------------------------------%0A`; 
        
        tipo.innerHTML = "<h1>Acessórios</h1>"
        document.getElementById("telaFechamento").classList.remove("ativa");
        document.getElementById("telaAcessorios").classList.add("ativa");
    }
    else if(proxima === 'seguro'){
        let mA = document.getElementById('metaAcessorios').value;
        let rA = document.getElementById('realiAcessorios').value;
        let cA = document.getElementById('contAcessorios').value;

        if(mA.trim() === "" || rA.trim() === "" || cA.trim() === ""){
            alert("Todos os campos devem ser preenchidos!");
            return;
        }
        
        let mAF = desformatar(mA);
        let rAF = desformatar(rA);
        let cAF = desformatar(cA);
        
        if(isNaN(mAF) || isNaN(rAF) || isNaN(cAF)){
            alert("Erro!\nTente novamente!");
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

        if(mS.trim() === "" || rS.trim() === "" || cS.trim() === ""){
            alert("Todos os campos devem ser preenchidos!");
            return;
        }

        let mSF = desformatar(mS);
        let rSF = desformatar(rS);
        let cSF = desformatar(cS);
        
        if(isNaN(mSF) || isNaN(rSF) || isNaN(cSF)){
            alert("Erro!\nTente novamente!");
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
    let pelicula = document.getElementById('pelicula').value;
    let aparelho = document.getElementById('aparelho').value;

    texto += `*Itens Vendidos:*%0A    *Películas:* ${pelicula}%0A    *Aparelhos:* ${aparelho}`;

    let telefone = "+5519992961108";

    window.open(`https://wa.me/${telefone}?text=${texto}`);


}

function reiniciar(){
    texto = "";
    window.location = "index.html";
}
