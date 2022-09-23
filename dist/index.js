"use strict";
if (!localStorage.getItem('bancoDados')) {
    localStorage.setItem('bancoDados', JSON.stringify([]));
}
// ANIMACAO TELA DE LOGIN
const formContainer = document.querySelector('.form-container');
const loginForm = document.querySelector('#sign-in-form');
const registerFrom = document.querySelector('#sign-up-form');
const switchForm = (form) => {
    if (form == 'cadastro') {
        if (window.innerWidth > 800) {
            formContainer.style.left = `50%`;
        }
        loginForm.style.marginLeft = `-150%`;
        registerFrom.style.marginLeft = `-100%`;
    }
    else {
        if (window.innerWidth > 800) {
            formContainer.style.left = `0%`;
        }
        loginForm.style.marginLeft = `0%`;
        registerFrom.style.marginLeft = `50%`;
    }
};
let cad_nome = document.getElementById('cadastro-nome');
let cad_email = document.getElementById('cadastro-email');
let cad_senha1 = document.getElementById('cadastro-senha1');
let cad_senha2 = document.getElementById('cadastro-senha2');
let botaoCadastrar = document.getElementById('botao-cadastrar');
let alertaSucesso = document.getElementById('alerta-success');
botaoCadastrar.addEventListener('click', cadastrarUsuario);
function cadastrarUsuario() {
    let bandoUsuarios = JSON.parse(localStorage.getItem('bancoDados') || '[]');
    if (!cad_nome.value || !cad_email.value || !cad_senha1.value || !cad_senha2.value) {
        alertaBootstrap('Preencha todos os campos!', 'primary');
        return;
    }
    if (cad_senha1.value !== cad_senha2.value) {
        alertaBootstrap('As senhas não conferem!', 'danger');
        return;
    }
    const usuarioExistente = bandoUsuarios.some((user) => user.email === cad_email.value);
    if (usuarioExistente) {
        alertaBootstrap('E-Mail já cadastrado!', 'warning');
        return;
    }
    const id = Math.floor(Math.random() * (1000 - 10) + 10);
    const criarUsuario = {
        id,
        nome: cad_nome.value,
        email: cad_email.value,
        senha: cad_senha1.value,
        recados: [],
    };
    bandoUsuarios.push(criarUsuario);
    localStorage.setItem('bancoDados', JSON.stringify(bandoUsuarios));
    alertaBootstrap('Usuário cadastrado com sucesso!', 'success');
    setTimeout(() => {
        window.location.href = 'index.html';
        cad_nome.value = '';
        cad_email.value = '';
        cad_senha1.value = '';
        cad_senha2.value = '';
    }, 3700);
}
let log_email = document.getElementById('login-email');
let log_senha = document.getElementById('login-senha');
let botaoLogin = document.getElementById('botao-login');
let bancoUsuariosLogin = [];
bancoUsuariosLogin = JSON.parse(localStorage.getItem('bancoDados') || "[]");
botaoLogin.addEventListener('click', (event) => {
    event.preventDefault();
    loginUsuario();
});
function loginUsuario() {
    if (!log_email.value || !log_senha.value) {
        alertaBootstrap('Preencha todos os campos!', 'primary');
        return;
    }
    const verificaCadastro = bancoUsuariosLogin.find((value) => value.email === log_email.value && value.senha === log_senha.value);
    if (verificaCadastro === undefined) {
        alertaBootstrap('E-Mail de usuario não cadastrado!', 'warning');
        return;
    }
    const usuarioValidado = {
        id: verificaCadastro.id,
        email: verificaCadastro.email,
        recados: verificaCadastro.recados,
    };
    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioValidado));
    alertaBootstrap('Usuário logado com sucesso!', 'success');
    setTimeout(() => {
        window.location.href = 'recados.html';
        log_email.value = '';
        log_senha.value = '';
    }, 3700);
}
