import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import Classify from 'App/Models/Classify'
import Application from '@ioc:Adonis/Core/Application'
import Information from 'App/Models/Information'
import Film from 'App/Models/Film'
// import server from 'App/Models/ServerStorage'
// import View from '@ioc:Adonis/Core/View'
// import View from '@ioc:Adonis/Core/View'

export default class FilmsController {
    public async create({ view }: HttpContextContract) {
        const category = await Category.all()
        const classify = await Classify.all()

        return view.render('admin.pages.film.create', { category, classify });
    }

    public async index({view}:HttpContextContract){
        const film= await Film.all();
        return view.render('admin.pages.film.index',{films:film})
        // return film
    }

    public async search({view,params,request}:HttpContextContract){
        const key=params.key;
        const value=params.value;

        const data=request.input('keyword')//nhan gia tri form tim kiem

        switch(key){
            case 'keyword':
                // console.log('keyword'+data)
                const film= await Film.query().where('name','ILIKE',`%${data}%`).preload('information')
                const title =`Kết quả tìm kiếm cho từ khóa "${data}"`
                // return view.render('user.search',{title:title,film:film})
                return film;
                break;
            case 'classify':
                const film2=await Film.query().where('classify_id',value).preload('information').preload('classify')
                if(film2){
                    const title2=film2[0].classify.name
                    return view.render('user.search',{title:title2,film:film2})
                } 
                break;
            default:
                return null;
        }
        
    }

    public async store({ view, request }: HttpContextContract) {
        const phim = request.only(['name', 'thumb'])
        const information = request.only(['releaseDate', 'directors', 'nation', 'long', 'description'])
        const category = request.input('category');
        const classify = request.input('classify');
        const thumb = request.file('thumb', {
            size: '2mb',
            extnames: ['jpg', 'png', 'jpeg','webp'],
        })

        // lưu hình
        phim.thumb = await this.saveFile(thumb, 'images')// dữ liệu trả ra tên file hình ảnh đã dc lưu

        //thêm 1 phim mới
        const data = await Film.create(phim);
        //thêm thông tin 
        
        //liên kết phim với bảng thông tin phim
        await data.related('information').create(information);
        
        //liên kết phim với thể loại và phân loại
        const category_save = await Category.find(category);
        if (category_save) { await data.related('category').associate(category_save) }
        const classify_save = await Classify.find(classify);
        if (classify_save) { await data.related('classify').associate(classify_save) }

        return view.render('admin.pages.film.server', { data })

    }
    
    public async m3u8({ view }: HttpContextContract) {//trả về form thêm file m3u8 hoặc nhập link film
        return view.render('admin.pages.film.server', { data: { id: 1 } })
    }

    public async addM3u8({ response, request, params }: HttpContextContract) {//them server storage

        const film = await Film.find(params.id);
        const type = request.input('type');

        switch(type){
            case "link"://neu la link 
            const link = request.input('link')
            // const type_video = 'link'
            await film?.related('serverStorage').create({ link: link, typeVideo: type });
            break;

            case "m3u8"://neu la m3u8
            const m3u8File = request.file('m3u8', {
                extnames: ['m3u8']
            })
            const m3u8 = await this.saveFile(m3u8File, 'm3u8');
            await film?.related('serverStorage').create({ link: m3u8?.toString(), typeVideo: type });
            break;

            case "iframe"://neu la iframe
            const iframe=request.input('iframe')
            await film?.related('serverStorage').create({link:iframe,typeVideo:type})
        }
        return response.redirect().toRoute('/admin/phim');
    }


    public async saveFile(thumb, folder: string) {//luu file
        if (!thumb) {
            return null;
        }
        const name = `${new Date().getTime()}.${thumb.extname}`

        await thumb.move(Application.publicPath(folder), {
            name: name,
        })

        return name;//trả về tên của file
    }

    public async delete({params}){

        const film= await Film.find(params.id);
        if(film){
            await film.delete()
            return {success: true};
        }else{
            return {success: false};
        }
       
    }
}
