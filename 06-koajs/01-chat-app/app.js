const path = require('path');
const Koa = require('koa');
const app = new Koa();

app.use(require('koa-static')(path.join(__dirname, 'public')));
app.use(require('koa-bodyparser')());

const Router = require('koa-router');
const router = new Router();
const chat = require('./chat');

router.get('/subscribe', async (ctx, next) => {
    const message = await chat.subscribe();
    ctx.response.body = message;
});

router.post('/publish', async (ctx, next) => {
    const { message } = ctx.request.body;
    if (message) {
        chat.publish(message);
    }
    ctx.response.status = 200;
});

app.use(router.routes());

module.exports = app;
