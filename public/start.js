'use strict'

document.body.onload = async () => {
    const res = await fetch('/csrf')
    const csrf = await res.json()
    const inputs = document.getElementsByName('_csrf')
    for (let input of inputs) {
        input.value = csrf.token
    }
}