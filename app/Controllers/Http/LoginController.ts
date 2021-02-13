import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LoginController {
    public async showLogin({ view }: HttpContextContract) {
        return view.render('login')
    }
    public async login({ view, request, auth, response }: HttpContextContract) {
        const email = request.input('email')
        const password = request.input('password')
        const rememberUser = true;
        await auth.attempt(email, password, rememberUser)
        return response.redirect().toRoute('/')

    }
    public async logout({ auth, response }: HttpContextContract) {
        await auth.logout();
        return response.redirect().toRoute('/login')
    }

}
