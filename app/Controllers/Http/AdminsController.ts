import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AdminsController {
    public async dashboard({ view }: HttpContextContract) {
        return view.render('admin.pages.dashboard')
    }

}
