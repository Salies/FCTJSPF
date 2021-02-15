function tempoFrete(){
    let n = Math.floor(Math.random() * 3) + 1; //gera um número aleatório entre 1 e 3
    return `${n} a ${n + 2} dias`;
}

let carrinho = JSON.parse(sessionStorage.getItem('car')), params = new URLSearchParams(location.search);
const p = document.querySelector('.produtos'), en = document.querySelector('.entrega');

document.querySelector('.total > span').innerHTML = carrinho.i;

for(let chaveProduto in carrinho.produtos){
    let prod = carrinho.produtos[chaveProduto];
    p.innerHTML += `
    <div class="produto">
    <div class="p-imagem" style="background-image: url(img/produtos/${chaveProduto}.jpg);"></div>
    <div class="stats">
        <span class="p-nome">${prod.nome}</span>
        <span class="p-categoria">Categoria: ${prod.categoria}</span>
        <span class="p-qtd">Quantidade: <span>${prod.qtd}</span></span>
        <span class="p-preco">${formataPreco.format(prod.preco * prod.qtd)}</span>
    </div>
</div>
    `;
}

en.innerHTML = `
<p><b>Destinatário:</b> ${params.get('nome')}</p>
<p><b>Endereço de entrega:</b> ${params.get('endereco')} - ${params.get('cidade')}/${params.get('estado')} (${params.get('cep')})</p>
<p><b>Tempo de entrega:</b> ${tempoFrete()}</p>
`;

document.querySelector('button').addEventListener('click', ()=>{
    sessionStorage.clear();
});