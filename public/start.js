'use strict'

document.body.onload = async () => {
    const state = await fetch('/state')
    const { token, email } = await state.json()
    const inputs = document.getElementsByName('_csrf')
    for (const input of inputs) {
        input.value = token
    }
    document.getElementById('user').value = email
    if (!document.getElementById('user').value) {
        document.getElementById('login').classList.remove('invisible')
    } else {
        document.getElementById('logout').classList.remove('invisible')
    }
}