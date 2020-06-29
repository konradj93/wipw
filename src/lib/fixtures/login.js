export const registerRequest = {
    email: 'disajam487@inbov03.com',
    password: 'Zaq12wsx!@#',
    fullName: 'Adam Oramus'
}

export const confirmRequest = {
    username: registerRequest.email,
    confirmationCode: '321429'
}

export const loginRequest = {
    username: registerRequest.email,
    password: registerRequest.password
}
