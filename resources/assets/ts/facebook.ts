export class Facebook {
    async login(scope: string = 'email'): Promise<any> {
        const FB: any = await this.init();

        return new Promise((resolve) => {
            FB.login((response: any) => {
                resolve(response);
            }, {scope: scope})
        });
    }

    async init(): Promise<any> {
        const win: any = window;

        return new Promise((resolve) => {
            if (win.FB) {
                resolve(win.FB);
            }

            const script = document.createElement('script');
            script.addEventListener('load', () => {
                win.FB.init({
                    appId      : '294194448050723',
                    cookie     : true,
                    xfbml      : true,
                    version    : 'v3.1'
                });

                resolve(win.FB);
            });
            script.src = '//connect.facebook.net/en_US/sdk.js';
            document.body.appendChild(script);
        });
    }
}