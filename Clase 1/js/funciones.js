const btnEnviar = document.getElementById("btnEnviar")
const nombre = document.getElementById("nombre");

/* 

Forma 1
let txt = ""

nombre.addEventListener("change", (e) => {
    txt = e.target.value
})

btnEnviar.addEventListener("click", (e) => {
    e.preventDefault()
    console.log(txt)
})

*/

/*
Forma 2
const frmNombre = document.getElementById("formNombre")

frmNombre.addEventListener("submit", (e) => {
    e.preventDefault()
    const fields = new FormData(e.target)
    const nombre = fields.get("nombre")
    console.log(nombre)
}) */

/* Forma 3 */
function mostrarNombre() {
    console.log(nombre.value)
}