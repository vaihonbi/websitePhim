import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Users from 'App/Models/User'
import Category from 'App/Models/Category'
import Classify from 'App/Models/Classify'
import Film from 'App/Models/Film'
import Infor from 'App/Models/Information'
import { DateTime } from 'luxon'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await Users.create({
      email: 'admin@gmail.com',
      password: '1234qwer'
    })

    const classify = await Classify.createMany([
      { name: 'Phim bộ' },
      { name: 'Phim lẻ' },
      { name: 'Phim chiếu rạp' },
      { name: 'Phim Việt' }
    ])

    const category = await Category.createMany(
      [
        { name: 'Phim hành động' },
        { name: 'Phim khoa học viễn tưởng ' },
        { name: 'Phim ma' },
        { name: 'Phim kinh dị' },
        { name: 'Phim võ thuật' },
        { name: 'Phim hài' },
        { name: 'Phim tình cảm' },
        { name: 'Phim cổ trang' },
        { name: 'Phim 18+' }
      ])

    // const information = await Infor.create()

    const film = await Film.create({ name: 'Siêu Chiến Binh – Guardians', thumb: '1615048526362.jpg' })
    await film.related('category').associate(category[1]);
    await film.related('classify').associate(classify[2]);
    await film.related('information').create({ directors: 'truong', nation: 'việt nam', long: 120, description: 'khong co' });
    await film.related('serverStorage').create({ typeVideo: 'iframe', episode: 1, link: '<iframe __idm_frm__="360" allowfullscreen="true" class="resizevideo" frameborder="0" height="450" scrolling="no" src="https://playhydrax.com/?v=UqPt2V4wc" width="100%"></iframe>' })
  }
}
