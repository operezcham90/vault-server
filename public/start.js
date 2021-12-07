'use strict'

document.body.onload = async () => {
    const state = await fetch('/state')
    const { token, email } = await state.json()
    const inputs = document.getElementsByName('_csrf')
    for (let input of inputs) {
        input.value = token
    }
    document.getElementById('user').value = email
}