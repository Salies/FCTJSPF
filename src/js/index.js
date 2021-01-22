/* FRONTEND */
const destaques = document.querySelector('.destaques > .p-destaque'), 
w = document.querySelector('#wrapper > .produtos'), 
sel = document.querySelector('.sel'),
carr = document.querySelector('.carrinho > div');
let categorias = new Array(), carrinho = {i:0}, data;

function formataPreco(val){ /*TODO: passar função pra main.js*/
    let int = Math.floor(val), sint = String(int);

    if(sint.length > 3){
        for(let i = sint.length - 3; i > 0; i -= 3){
            sint = sint.substr(0, i) + '.' + sint.substr(i, sint.length);
        }
    }

    return `${sint},${(val - int).toFixed(2) * 100}`;
}

function geraProduto(index, p, bloco){
    return `<div class="p-imagem" style="background-image: url(img/produtos/${index}.jpg);"></div>${bloco ? '<div class="stats">' : ''} <span class="p-nome">${p.nome}</span><span class="p-categoria">Categoria: ${p.categoria}</span><span class="p-preco">R$${formataPreco(p.preco)}</span><button type="button" class="btn-compra" value="${index}">COMPRAR</button>${bloco ? '</div>' : ''}`;
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
    return carr.innerHTML = val;
}

function addCarr(){
    carrinho[this.value] = data[this.value];
    if(!carrinho[this.value]["qtd"]) carrinho[this.value]["qtd"] = 1;
    else carrinho[this.value]["qtd"]++;
    updateCarr(++carrinho.i);
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

    document.querySelectorAll('.btn-compra').forEach(btt =>{
        btt.addEventListener('click', addCarr);
    });

    categorias = []; //limpa o array para ser usado depois

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