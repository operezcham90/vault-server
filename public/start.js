'use strict'

document.onload = async () => {
    const res = await fetch('/csrf')
    const csrf = await res.json()
    const inputs = document.getElementsByName('_csrf')
    inputs.values = csrf.token
}