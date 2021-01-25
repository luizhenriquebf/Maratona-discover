const Modal = {
    // Abrir modal
    open(){
        document.querySelector(".modal-overlay").classList.add("active")
    }
    ,
    // Fechar modal 
    close(){
        document.querySelector(".modal-overlay").classList.remove("active")
    }
}