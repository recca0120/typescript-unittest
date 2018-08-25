import {Facebook} from './facebook';
import {HttpClient} from './httpclient';

export class Auth
{
    constructor(private facebook: Facebook, private client: HttpClient) {}

    async login() {
        this.client.post(await this.facebook.login());
    }
}