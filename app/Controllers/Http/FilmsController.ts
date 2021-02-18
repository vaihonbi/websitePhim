import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import Film from 'App/Models/Film'
// import formidable from 'formidable'
// import fs from 'fs'
import Category from 'App/Models/Category'
import Classify from 'App/Models/Classify'
import Application from '@ioc:Adonis/Core/Application'
import Information from 'App/Models/Information'
import Film from 'App/Models/Film'
import server from 'App/Models/ServerStorage'
// import View from '@ioc:Adonis/Core/View'

export default class FilmsController {
    // public async index({ view }: HttpContextContract) {
    //     return view.render('admin.pages.film.index')
    // }
    public async create({ view }: HttpContextContract) {
        const category = await Category.all()
        const classify = await Classify.all()

        return view.render('admin.pages.film.create', { category, classify });
        // return { category, classify }
    }
    public async store({ view, request }: HttpContextContract) {
        // const data = request.only(['name'])
        const phim = request.only(['name', 'thumb'])
        const information = request.only(['releaseDate', 'directors', 'nation', 'long', 'description'])
        const category = request.input('category');
        const classify = request.input('classify');
        const thumb = request.file('thumb', {
            size: '2mb',
            extnames: ['jpg', 'png', 'jpeg'],
        })

        // lưu hình
        phim.thumb = await this.saveFile(thumb, 'images')// dữ liệu trả ra tên file hình ảnh đã dc lưu


        //thêm 1 phim mới
        const data = await Film.create(phim);
        //thêm thông tin 
        const information_save = await Information.create(information);
        if (information_save) {
            //liên kết phim với bảng thông tin phim
            await data.related('information').associate(information_save);
        }

        //liên kết phim với thể loại và phân loại
        const category_save = await Category.find(category);
        if (category_save) { await data.related('category').associate(category_save) }
        const classify_save = await Classify.find(classify);
        if (classify_save) { await data.related('classify').associate(classify_save) }

        return view.render('admin.pages.film.server', { data })


    }
    public async m3u8({ view }: HttpContextContract) {
        return view.render('admin.pages.film.server', { data: { id: 1 } })
    }

    // public async m3u8({ view }: HttpContextContract) {
    //     return view.render('admin.pages.film.server')
    // }
    public async addM3u8({ response, request, params }: HttpContextContract) {

        const film = await Film.find(params.id);
        const type = request.input('type');
        if (type == 'link') {
            const link = request.input('link')
            await film?.related('serverStorage').create({ link: link });
        } else if (type == 'm3u8') {
            const m3u8File = request.file('m3u8', {
                extnames: ['m3u8']
            })

            const m3u8 = await this.saveFile(m3u8File, 'm3u8');

            await film?.related('serverStorage').create({ link: m3u8?.toString() });
        }
        return response.redirect().toRoute('/admin/phim');
    }


    //lưu file
    // public async saveFile(thumb) {
    //     if (!thumb) {
    //         return null;
    //     }
    //     const name = `${new Date().getTime()}.${thumb.extname}`

    //     await thumb.move(Application.tmpPath('uploads'), {//lưu vào thư mục uploads
    //         name: name,
    //     })

    //     return name;//trả về tên của file
    // }
    public async saveFile(thumb, folder: string) {
        if (!thumb) {
            return null;
        }
        const name = `${new Date().getTime()}.${thumb.extname}`

        await thumb.move(Application.publicPath(folder), {
            name: name,
        })

        return name;//trả về tên của file
    }
}
