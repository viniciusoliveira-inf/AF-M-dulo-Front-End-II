type Recado ={ id: number, recado: string, descricao: string,
}

let usuarioLogado: usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado')|| '[]')

preencherTabela()

if (!usuarioLogado) {
    sair();
}

let form = document.getElementById('formulario') as HTMLFormElement;
let recado = document.getElementById('recado_descricao') as HTMLInputElement;
let descricao = document.getElementById('recado_detalhamento') as HTMLInputElement;
let botaoSalvar = document.getElementById('botao_salvar') as HTMLButtonElement;
let botaoSair = document.getElementById('botao_sair') as HTMLButtonElement

botaoSair.addEventListener('click', () => {

    const usuarios:Usuario[] = JSON.parse(localStorage.getItem('bancoDados')|| '[]');
    
    const indice = usuarios.findIndex((usuario) => usuario.id === usuarioLogado.id);

    usuarios[indice].recados = usuarioLogado.recados;

    localStorage.setItem('bancoDados', JSON.stringify(usuarios));

    localStorage.removeItem('usuarioLogado');
    
    sair();

});

botaoSalvar.addEventListener('click', (event) =>{
    event.preventDefault();
    gravarRecado();
})

function sair() {
    return (window.location.href = 'index.html');
}

function gravarRecado() {
    if(!recado.value || !descricao.value){
        alertaBootstrap('Preencha todos os campos!','primary')
        return;
    }

    const id = Math.floor(Math.random() * (1000 - 10) + 10);
    const novoRecado = {
        id,
        recado: recado.value,
        descricao: descricao.value
    }

    usuarioLogado.recados.push(novoRecado)
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado))
    alertaBootstrap('Recado salvo com sucesso!','success')
    recado.value= '';
    descricao.value= '';
    preencherTabela()
}

function preencherTabela() {
    let tabela = document.getElementById('recados') as HTMLTableElement;
    tabela.innerHTML = '';

    for(let i in usuarioLogado.recados) {
        const index = Number(i)+1
        let tr = tabela.insertRow();
    
        let td_id = tr.insertCell();
        let td_recado = tr.insertCell();
        let td_descricao = tr.insertCell();
        let td_acao = tr.insertCell(); 

        td_id.innerHTML= String(index);
        td_recado.innerHTML = usuarioLogado.recados[i].recado;
        td_descricao.innerHTML = usuarioLogado.recados[i].descricao;
        let btnEditar = document.createElement("button")  
        btnEditar.textContent = 'Editar';
        btnEditar.setAttribute('class','btn btn-success')
        btnEditar.setAttribute('data-bs-toggle',"modal")
        btnEditar.setAttribute('data-bs-target', '#modalEditar')
        btnEditar.addEventListener('click', () => editarRecado(usuarioLogado.recados[i].id));
        let btnExcluir = document.createElement("button")  
        btnExcluir.textContent = 'Excluir';
        btnExcluir.setAttribute('class','btn btn-danger')
        btnExcluir.setAttribute('data-bs-toggle',"modal")
        btnExcluir.setAttribute('data-bs-target', '#modalApagar')
        btnExcluir.addEventListener('click', () => deletarRecado(usuarioLogado.recados[i].id));
        td_acao.appendChild(btnEditar)
        td_acao.appendChild(btnExcluir)
        tabela.appendChild(tr)
       
    }

}
 
function editarRecado(msg: number){
    let recado = (document.getElementById('modalRecado') as HTMLInputElement);
    let descricao = (document.getElementById('modalDescricao') as HTMLInputElement);
    const procuraRecado = usuarioLogado.recados.findIndex((recado) => recado.id === msg);
    if(procuraRecado !== -1){
        recado.value = usuarioLogado.recados[procuraRecado].recado
        descricao.value = usuarioLogado.recados[procuraRecado].descricao
        const confirmSave = document.getElementById('confirm-save') as HTMLButtonElement;
        confirmSave.onclick = ()=>{
            usuarioLogado.recados[procuraRecado].recado = recado.value
            usuarioLogado.recados[procuraRecado].descricao = descricao.value
            localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado))
            alertaBootstrap('Recado editado com sucesso!','success')
            preencherTabela()
        }
    }
}
function deletarRecado(id: number){
    const confirmApagar = document.getElementById('confirm-delete') as HTMLButtonElement;
    confirmApagar.onclick = ()=>{
        const deletarRecados = usuarioLogado.recados.filter((recado: { id: number; }) => recado.id !== id);
        usuarioLogado.recados = deletarRecados
        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado))
        alertaBootstrap('Recado excluido com sucesso!','info')
        preencherTabela();
    }
}

