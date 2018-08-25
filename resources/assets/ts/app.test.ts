import {Facebook} from './facebook';
import {Auth} from './auth';
import {HttpClient} from './httpclient';

class FakeFacebook extends Facebook {
    public response: any = {};
    setResponse(response: any) {
        this.response = response;
    }

    async login(): Promise<any> {
        return Promise.resolve(this.response);
    }
}

describe('Facebook Login', () => {
   it('Login', async () => {
        const response = {"authResponse":{"accessToken":"EAAELkXuSKiMBAOrIyq6wxZBRkJZBTReOL40ZBYyizMyZAw9ugZAjX9v1KYSD5W6nP2GSmDWzGdmJnYFFp2ZBuP8yfcj4fsI2BC5ud1Uo5YnavtmksONVP3d4Uz12S1FOe1vnoF2dCjuJpnmq5R1stiXWZArWSU5fTFuiEkn3De9ps2wk4YoPQFpSPjU5wusmtcOMooEXzdQaAZDZD","userID":"10156621735364181","expiresIn":4446,"signedRequest":"AyCTeWwPRlfKgIsjKc0gAM6MR3A6-pby6qGDQp-sO_s.eyJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImNvZGUiOiJBUUN6VG5OLXhIM0huOEFGWXVEUGRUNG1wdkFyMGVEVGVxNmVfNjBLWnFlRVlwOUthT2l2TlV4d0dKajZmNjBmMC13Y3ZCbXpWajhheUMtMWF4bWRUaVFEeFB3c3E5ZXFueXZoNGVfU2Zwd05INVdGT01ZNjc4dllVMjVSSktDdmg3cWtEQzlnbzhoU1hzcEkwMmtFYlFod2tBa3JIbmRDQjlCWGEwM0hNSU1CVnhEczlDVXFHUWxLOU1QbUhIV3NKYzRxRGZZTHJZVzlrWDlzMGJTQkJWLV9tZWg1SDZpVmQzcDVJaHFtS3RlM2tSc25PVFMzTnJ2QmpmOVA3YktWeGZJWF9salpHdkNLZF9RekJ4QWM3UG55YmV3ZjVUWWdXdjdOcTFqN2xHM1JjdC1sOFF0OUVmdHljeGhrbEhnZk9rWnFhaHNjQm9TWlZvR2pKcnY2bWNNQSIsImlzc3VlZF9hdCI6MTUzNTE3OTU1NCwidXNlcl9pZCI6IjEwMTU2NjIxNzM1MzY0MTgxIn0","reauthorize_required_in":7776000},"status":"connected"};

        const facebook = new FakeFacebook();
        facebook.setResponse(response);

        const client = new HttpClient();
        const auth = new Auth(facebook, client);

        spyOn(client, 'post');

        await auth.login();

        expect(client.post).toBeCalledWith(response);
   }) 
});