import WPAPI from 'wpapi';
var site = new WPAPI({
    endpoint: 'https://2f5b-167-88-61-250.ngrok.io/wp-next/wp-json',
    username: 'admin',
    password: '123',
});
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const createPosts = async () => {
    site.lines = site.registerRoute('wp/v2', '/line/(?P<id>\\d+)');
    return (
        site
            .lines()
            .create({ title: 'Test TTTTTTT', sport: 3, broadcast: 4, acf: { test: 'Hello acf' } })
            // .create({ title: 'Test Line', sport: 3, broadcast: 4, team1: 'NGB', team2: 'nbbbb', odds1: 'l', odds2: 'll' })
            .then(function (response: any) {
                console.log(response);
                // "response" will hold all properties of your newly-created post,
                // including the unique `id` the post was assigned on creation
                return response;
            })
            .catch(function (err: any) {
                console.log('errr', err);
                return err;
            })
    );
};

export { createPosts };
