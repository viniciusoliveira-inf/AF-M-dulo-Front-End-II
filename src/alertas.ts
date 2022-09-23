
const alertaBootstrap = (message:string, type:string) => {
    const alertPlaceholder = document.querySelector('.alert') as HTMLDivElement;
    alertPlaceholder.style.display = 'block'
    alertPlaceholder.classList.add(`alert-${type}`)
    alertPlaceholder.innerText = message
    setTimeout(() => {
        alertPlaceholder.style.display = 'none'
    }, 3500);
}