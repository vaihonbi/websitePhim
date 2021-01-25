import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Users from 'App/Models/User'
export default class UserSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await Users.create({
      email: 'admin@gmail.com',
      password: '123456'
    })
  }
}
