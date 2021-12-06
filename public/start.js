'use strict'

document.onload = async () => {
    const res = await fetch('/csrf')
    const csrf = await res.json()
    const inputs = document.getElementsByName('_csrf')
    for (let input of inputs) {
        input.values = csrf.token
    }
}