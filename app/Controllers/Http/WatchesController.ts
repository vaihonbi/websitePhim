import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class WatchesController {
    public async detail({ params, view }: HttpContextContract) {
        return view.render('user.detail', {
            id: params.id
        })
    }
    public async watch({ params, view }: HttpContextContract) {

        return view.render('user.watch', {
            id: params.id
        })
    }
}
