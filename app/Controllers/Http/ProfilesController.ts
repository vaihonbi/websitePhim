// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import Profile from 'App/Models/Profile'
import Login from 'App/Controllers/Http/LoginController'
import User from 'App/Models/User'
export default class ProfilesController {
    public async addProfile() {

        const user = await User.query().select('*').where('id', 1).preload('profile');

        return user;
    }
}
