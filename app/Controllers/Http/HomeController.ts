import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import Application from '@ioc:Adonis/Core/Application'
import Film from 'App/Models/Film'
// import { file } from 'googleapis/build/src/apis/file'

export default class HomeController {
    public async index({ view }: HttpContextContract) {

        const film =await Film.query().select('*').limit(6).preload('information')
        const film_viet=await Film.query().where('classify_id',4).limit(6).preload('information');
        const film_kinhdi= await Film.query().where('category_id',4).limit(6).preload('information');
        const film_hd= await Film.query().where('category_id',1).limit(6).preload('information');
        return view.render('welcome',{film:film,film_viet,film_kinhdi,film_hd});
        // return film;
    }

}
