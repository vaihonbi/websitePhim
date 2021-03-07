import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import Application from '@ioc:Adonis/Core/Application'
import Film from 'App/Models/Film'
// import { file } from 'googleapis/build/src/apis/file'

export default class HomeController {
    public async index({ view }: HttpContextContract) {

        const film =await Film.query().select('*').limit(6).preload('information')
        
        return view.render('welcome',{film:film});
        // return film;
    }

}
