/* FRONTEND */
const destaques = document.querySelector('.destaques > .p-destaque'), 
w = document.querySelector('#wrapper > .produtos'), 
sel = document.querySelector('.sel'),
carr = document.querySelector('.carrinho > div');
let categorias = new Array(), carrinho = {produtos:{}, i:0}, data;

function geraProduto(index, p, bloco){
    return `<div class="p-imagem" style="background-image: url(img/produtos/${index}.jpg);"></div>${bloco ? '<div class="stats">' : ''} <span class="p-nome">${p.nome}</span><span class="p-categoria">Categoria: ${p.categoria}</span><span class="p-preco">${formataPreco.format(p.preco)}</span><button type="button" class="btn-compra" value="${index}">COMPRAR</button>${bloco ? '</div>' : ''}`;
}

function seleciona(){
    this.classList.toggle('sel-active')

    if(this.classList.contains('sel-active')){
        categorias.push(this.innerHTML);
    }
    else{
        categorias.splice(categorias.indexOf(this.innerHTML), 1);
    }

    for(let i = 0; i < data.length; i++){
        if(categorias.includes(data[i].categoria) || categorias.length == 0){ //se nada estiver selecionado, mostrar tudo
            document.querySelector(`.produto:nth-of-type(${i+1})`).classList.remove('esconde');
        }
        else{
            document.querySelector(`.produto:nth-of-type(${i+1})`).classList.add('esconde');
        }
    }
}

function updateCarr(val){
    sessionStorage.setItem('car', JSON.stringify(carrinho));
    return carr.innerHTML = val;
}

function addCarr(){
    if(carrinho.i + 1 > 50){ //se for passar de 50 itens
        return alert('Carrinho cheio! (máx. 50 itens)')
    }

    if(!carrinho.produtos[this.value]){
        carrinho.produtos[this.value] = data[this.value];
        carrinho.produtos[this.value]["qtd"] = 1;
    }
    else carrinho.produtos[this.value]["qtd"]++;
    updateCarr(++carrinho.i);
}

function initCar(){
    let c = sessionStorage.getItem('car');
    if(c){ // se o carrinho existir
        try{ // se for um JSON válido (não é exatamente necessário, mas evita bugs)
            c = JSON.parse(c);
        }catch(err){
            return false;
        }
        // existe um carrinho válido
        carrinho = c;
        carr.innerHTML = carrinho.i;
        return true;
    }
}

function init(){
    let i;
    for(i = 0; i < 5; i++){
        destaques.innerHTML+= geraProduto(i, data[i], false);
    }

    for(i = 0; i < data.length; i++){
        if(!categorias.includes(data[i].categoria)){
            sel.innerHTML += `<div>${data[i].categoria}</div>`;
            categorias.push(data[i].categoria);
        }
        w.innerHTML += `<div class="produto">${geraProduto(i, data[i], true)}</div>`;
    }

    document.querySelectorAll('.sel > div').forEach(el =>{
        el.addEventListener('click', seleciona, el);
    });

    document.querySelectorAll('.btn-compra').forEach(btn =>{
        btn.addEventListener('click', addCarr);
    });

    categorias = []; //limpa o array para ser usado depois

    if(!initCar()) sessionStorage.setItem('car', JSON.stringify(carrinho)); //para caso o usuário clique no carrinho com 0 itens

    document.querySelectorAll('.esconde').forEach(el => { //exibe, pois agora a página pode ser usada
        el.classList.remove('esconde');
    });
}

fetch('https://cdn.statically.io/gist/Salies/3e32ac3cf2629d8a9386e8730c6f7532/raw/91e2f24cf133b2f11ae6e0763e4e1689e1a16ac3/data.json')
.then((res) => {
    return res.json();
})
.then(fres => {
    data = fres;
    return init();
});