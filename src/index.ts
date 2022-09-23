if (!localStorage.getItem('bancoDados')) {
    localStorage.setItem('bancoDados', JSON.stringify([]));
}
// ANIMACAO TELA DE LOGIN
const formContainer = document.querySelector('.form-container') as HTMLElement
const loginForm = document.querySelector('#sign-in-form') as HTMLElement
const registerFrom = document.querySelector('#sign-up-form') as HTMLElement
const switchForm = (form: any) => {
    if(form == 'cadastro'){
        if(window.innerWidth > 800){
            formContainer.style.left = `50%`;
        }
        loginForm.style.marginLeft = `-150%`;
        registerFrom.style.marginLeft = `-100%`;
    } else{
        if(window.innerWidth > 800){
            formContainer.style.left = `0%`;
        }
        loginForm.style.marginLeft = `0%`;
        registerFrom.style.marginLeft = `50%`;
    }
}
// PROCESSO DE CADASTRO
type Usuario = { id: number, nome: string, email: string, senha: string, recados: Recado[], }
let cad_nome = document.getElementById('cadastro-nome') as HTMLInputElement;
let cad_email = document.getElementById('cadastro-email') as HTMLInputElement;
let cad_senha1 = document.getElementById('cadastro-senha1') as HTMLInputElement;
let cad_senha2 = document.getElementById('cadastro-senha2') as HTMLInputElement;
let botaoCadastrar = document.getElementById('botao-cadastrar') as HTMLButtonElement;
let alertaSucesso = document.getElementById('alerta-success') as HTMLElement
botaoCadastrar.addEventListener('click', cadastrarUsuario)
function cadastrarUsuario(){
let bandoUsuarios = JSON.parse(localStorage.getItem('bancoDados')|| '[]');
if(!cad_nome.value || !cad_email.value || !cad_senha1.value || !cad_senha2.value){
    alertaBootstrap('Preencha todos os campos!','primary')
    return;
}
if(cad_senha1.value !== cad_senha2.value){
    alertaBootstrap('As senhas não conferem!','danger')
    return;
}
const usuarioExistente = bandoUsuarios.some((user: { email: string; }) => user.email === cad_email.value) 
if(usuarioExistente){
    alertaBootstrap('E-Mail já cadastrado!','warning')
    return;
}
const id = Math.floor(Math.random() * (1000 - 10)+10)
const criarUsuario:Usuario = {
    id,
    nome: cad_nome.value,
    email: cad_email.value,
    senha: cad_senha1.value,
    recados: [],
};
bandoUsuarios.push(criarUsuario);
localStorage.setItem('bancoDados', JSON.stringify(bandoUsuarios))
alertaBootstrap('Usuário cadastrado com sucesso!','success')
setTimeout(()=>{
    window.location.href='index.html'
    cad_nome.value= '';
    cad_email.value= '';
    cad_senha1.value = '';
    cad_senha2.value = '';
    },3700)
}
// PROCESSO DE LOGIN
type usuarioLogado = { id: number, email: string, recados: Recado[], }
let log_email = document.getElementById('login-email') as HTMLInputElement;
let log_senha = document.getElementById('login-senha') as HTMLInputElement;
let botaoLogin = document.getElementById('botao-login') as HTMLButtonElement;
let bancoUsuariosLogin: any[] = []
bancoUsuariosLogin = JSON.parse(localStorage.getItem('bancoDados') || "[]")
botaoLogin.addEventListener('click', (event) => {
    event.preventDefault();
    loginUsuario();
})
function loginUsuario(){
if(!log_email.value || !log_senha.value){
    alertaBootstrap('Preencha todos os campos!','primary')
    return;
}
const verificaCadastro = bancoUsuariosLogin.find((value) => value.email === log_email.value && value.senha === log_senha.value)
if (verificaCadastro===undefined){
    alertaBootstrap('E-Mail de usuario não cadastrado!','warning')
    return
}
const usuarioValidado:usuarioLogado = {
    id: verificaCadastro.id,
    email: verificaCadastro.email,
    recados: verificaCadastro.recados,
}
localStorage.setItem('usuarioLogado', JSON.stringify(usuarioValidado))
alertaBootstrap('Usuário logado com sucesso!','success')
setTimeout(()=>{
    window.location.href = 'recados.html'
    log_email.value= '';
    log_senha.value= '';
    },3700)
}