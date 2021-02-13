import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Users from 'App/Models/User'
import Category from 'App/Models/Category'
import Classify from 'App/Models/Classify'
import Film from 'App/Models/Film'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await Users.create({
      email: 'admin@gmail.com',
      password: '123456'
    })

    const classify = await Classify.createMany([
      { name: 'Phim bộ' },
      { name: 'Phim lẻ' },
      { name: 'Phim chiếu rạp' }
    ])

    const category = await Category.createMany([{ name: 'Phim hành động' }, { name: 'Phim khoa học viễn tưởng ' }])

    const film = await Film.create({ name: 'Phim01' })
    await film.related('category').associate(category[0]);
    await film.related('classify').associate(classify[0]);
  }
}
