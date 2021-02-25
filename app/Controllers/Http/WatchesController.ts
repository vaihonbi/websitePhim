import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import Config from '@ioc:Adonis/Core/Config'
import { google } from 'googleapis'
import axios from 'axios';

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

    public async forwardFile({ request, response }: HttpContextContract) {
        const url = 'http://103.27.236.37/phimle/thanhlongyennguyetdaovs.mp4';

        const file = await axios({
            method: 'GET',
            url,
            responseType: 'stream',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36',
                'Range': request.header('Range', '')
            },
        })

        console.log(file.headers)
        //onsole.log(file.request)
        //  file.data.pipe();

        response.header('content-type', file.headers['content-type']);
        response.header('content-range', file.headers['content-range']);
        response.stream(file.data);
    }

    public async sendFileM3u8({ params, response }: HttpContextContract) {//tra ve file m3u8 cho client
        response.download(Application.publicPath('/m3u8/1614007341484.m3u8'))
    }
    public async sendFileTS({ params, request, response }: HttpContextContract) {
        // const {
        //     client_id,
        //     client_secret,
        //     refresh_token,
        // } = require("credentials.json");

        const client = new google.auth.OAuth2({
            clientId: Config.get('google.client_id'),
            clientSecret: Config.get('google.client_secret'),
        });
        client.setCredentials({
            refresh_token: Config.get('google.refresh_token'),
        });
        //console.log(await client.getAccessToken());

        // console.log(Config.get('google.refresh_token'));

        const drive = google.drive({
            version: "v3",
            auth: client,
        });
        //
        const file = await drive.files.get({
            fileId: params.id,
            alt: "media",
        }, {
            responseType: "stream",
        });
        response.header('content-type', 'video/mp2t')
        response.stream(file.data);
    }
}
