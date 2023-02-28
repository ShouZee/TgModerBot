const TelegramBot = require('node-telegram-bot-api');
const token = '5844033073:AAGETaVh-6F73t4zu6CdwdH5udr-mbXCcf4';
const ll = require('./tools')
const amir = 245394209;
const dana = 667998786;

const bot = new TelegramBot(token, {polling: true});

const BanWords = [
    /негр/gi, /пидор/gi,/гей/gi,/чурка/gi,/хахол/gi,/ислам/,/религия/gi,/бог/,/пидр/gi
]

const BanWord = [
    'негр','пидор','гей','чурка','хахол','ислам','религия','бог',
]




const start = () => {
    bot.setMyCommands([
        {command: '/about', description: 'Старт'},
        {command: '/info', description: 'Запретка'},
    ])

    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        ll('чат ид пользователя')
        ll(chatId)
        

        if (text === '/start'){
            return  bot.sendMessage(chatId, `Привет я бот который стучу админам за нарушения`)
        }
        if (text === '/info') {
            return  bot.sendMessage(chatId, `Я знаю про тебя все ${msg.from.first_name}\nЗапрещеные слова ${BanWord.join(', ')}\n Произнесешь и тебе пизда`);

        }
        if (text === 'иди нахуй'){
            return bot.sendMessage(chatId, 'Сам пошел нахуй уебан кожаный')
        }

        if (BanWords.find(m => text?.match(m))) {
            bot.sendMessage(chatId, `Не обзывайся ${msg.from.first_name} я все расскажу маме`);
           
            
            bot.sendMessage(amir, `Он выстрелил запретку ${msg.from.first_name}`);
            bot.sendMessage(dana, `Он выстрелил запретку ${msg.from.first_name}`);
            bot.forwardMessage(amir, chatId, msg.message_id)
            bot.forwardMessage(dana, chatId, msg.message_id)
        }

    })
}



start()