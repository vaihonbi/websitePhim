import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'

export default class HomeController {
    public async index({ view }: HttpContextContract) {

        return view.render('upload_file');
    }
    public async store({ request }: HttpContextContract) {

        const avatar = request.file('avatar')
        if (!avatar) {
            return 'Please upload file'
        }

        await avatar.move(Application.tmpPath('uploads'))

        return 'File uploaded successfully';
    }

}
