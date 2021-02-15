let carrinho = JSON.parse(sessionStorage["car"]), total = 10;

const qtd = document.querySelector('.count'), 
p = document.querySelector('.produtos'), 
totalEl = document.querySelector('.total > span > span'),
frete = document.querySelector('.frete');

function zera(){
    p.innerHTML = 'Não há produtos no carrinho.';
    frete.innerHTML = '';
    total = 0;
}

function removeCarr(){
    this.parentNode.parentNode.remove();

    carrinho.i -= carrinho.produtos[this.value].qtd;
    qtd.innerHTML = carrinho.i;

    total -= carrinho.produtos[this.value].preco * carrinho.produtos[this.value].qtd;
    delete carrinho.produtos[this.value];

    sessionStorage.setItem('car', JSON.stringify(carrinho));

    if(carrinho.i == 0) zera();

    totalEl.innerHTML = formataPreco.format(total);
}

function qtdCarr(){
    total -= carrinho.produtos[this.dataset.id].preco * carrinho.produtos[this.dataset.id].qtd;

    let np = carrinho.produtos[this.dataset.id].preco * this.value;

    total += np;
    totalEl.innerHTML = formataPreco.format(total);

    carrinho.i += - carrinho.produtos[this.dataset.id].qtd + Number(this.value);

    carrinho.produtos[this.dataset.id].qtd = this.value;

    sessionStorage.setItem('car', JSON.stringify(carrinho));

    qtd.innerHTML = carrinho.i;
    this.parentNode.parentNode.querySelector('.p-preco').innerHTML = formataPreco.format(np);
}

if(carrinho.i > 0) qtd.innerHTML = carrinho.i;
else zera(); // resto do código pode rodar, não fará nada

for (let chaveProduto in carrinho.produtos) {
    let prod = carrinho.produtos[chaveProduto], prect = prod.preco * prod.qtd;
    p.innerHTML += `<div class="produto"><div class="p-imagem" style="background-image: url(img/produtos/${chaveProduto}.jpg);"></div><div class="stats"><span class="p-nome">${prod.nome}</span><span class="p-categoria">Categoria: ${prod.categoria}</span><span class="p-qtd">Quantidade: <input type="number" data-id=${chaveProduto} value=${prod.qtd} min="1" max="50"></span><span class="p-preco">${formataPreco.format(prect)}</span><button type="button" class="btn-exclui" value=${chaveProduto}>REMOVER ITEM</button></div></div>`;
    total += prect;
}

// loops adicionais - melhor jeito que encontrei sem ser inline - tentar selecionar no loop anterior não deu certo
document.querySelectorAll('.produto > .stats > button').forEach(btn =>{
    btn.addEventListener('click', removeCarr);
});

document.querySelectorAll('input[type="number"]').forEach(i =>{
    i.addEventListener('input', qtdCarr);
});

totalEl.innerHTML = formataPreco.format(total);

/* 
Referências adicionais:
https://developer.mozilla.org/pt-BR/docs/Web/Guide/HTML/Using_data_attributes
https://stackoverflow.com/a/16233919
https://dillionmegida.com/p/inline-events-vs-add-event-listeners/
*/