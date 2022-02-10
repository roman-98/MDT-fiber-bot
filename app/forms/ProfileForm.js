const options = require('../commands/options')
const {Starosta, Phones} = require("../../models/models");

class ProfileForm {
  constructor(bot, context) {
    this.bot = bot;
    this.chatId = context.chatId;
    this.filters = {};
    this.data = context.state.data;
  }

  get fields() {
    return [
      {
        name: 'phoneNumber',
        message: `\u{26A0}Для того, щоб Ви могли отримати доступ до бота та пройти перевірку необхідно ідентифікувати вашу особу.\n
      
          \u{2757}Вкажіть ваш номер телефону\u{1F4F2}`
      },
      {
        name: 'pib',
        message: `\u{1F513}Вітаємо! Ви можете пройти цю перевірку\n
          
          \u{2705}Вкажіть Ваше ПІБ, перевірте правильність перед відправленням`
      },
      {
        name: 'position',
        message: `\u{2705}Цей бот створено для старост територіальних громад Львівщини.\n 
          \u{1F4CC}Вкажіть свою посаду, перевірте правильність перед відправленням`
      },
      {
        name: 'settlement',
        message: `Вкажіть назву населеного пункту у Вашому віданні.\n 
          \u{1F4CC}Вказуйте лише назву населеного пункту, наприклад: Демидівка, замість село Демидівка чи с. Демидівка`
      },
      {
        name: 'community',
        message: `Тепер вкажіть назву громади, до якої відноситься населений пункт.\n
          \u{1F4CC}Вказуйте лише назву громади, без уточнень. Наприклад: Львівська, замість Львівська міська громада`
      },
      {
        name: 'district',
        message: `Вкажіть назву району.\n 
          \u{1F4CC}Вказуйте лише назву району. Наприклад: Львівський, замість Львівський р-н і т.п.`
      },
      {
        name: 'region',
        message: `Вкажіть назву області.\n 
          \u{1F4CC}Вкажіть лише назву області. Наприклад: Вінницька, замість Вінницька обл. і т.п.`
      },
      {
        name: 'cabel',
        message: `
          \u{2705}Щоб визначити наявність оптичної мережі необхідно оглянути електроопори вздовж вулиць.\n 
          \u{1F4CC} Приклади того, як виглядає оптичний кабель на електроопорі: http://bit.ly/fiber_explainer.\n 
          \u{1F4CC} За Вашими спостереженнями, чи наявний оптоволоконний кабель у населеному пункті?`,
        options: options.yesOrNo
      },
      {
        message: `\u{2705}Ознайомтесь з переліком можливих соціальних об'єктів:

          \u{1F3EB} 1) заклади дошкільної, загальної середньої, професійної (професійно-технічної) освіти, позашкільні заклади освіти, інтернатні заклади для дітей-сиріт та дітей, позбавлених батьківського піклування, заклади вищої освіти;\n

          \u{1F3E5} 2) заклади первинної та вторинної медичної допомоги, зокрема фельдшерсько-акушерські/фельдшерські пункти;\n

          \u{1F46A} 3) Заклади соціального захисту та заклади, що надають соціальні послуги, територіальні центри соціального обслуговування (надання соціальних послуг), центри соціальних служб, центри надання соціальних послуг, будинки-інтернати для громадян похилого віку та осіб з інвалідністю, дитячі будинки-інтернати, центри соціально-психологічної допомоги, соціальні центри матері та дитини, соціальні гуртожитки для дітей-сиріт та дітей, позбавлених батьківського піклування, центри соціально-психологічної реабілітації, центри для ВІЛ-інфікованих дітей та молоді, центри соціально-психологічної реабілітації дітей та молоді з функціональними обмеженнями, центри обліку бездомних осіб, заклади соціального захисту для бездомних осіб, центри соціальної адаптації осіб, які відбули покарання у виді обмеження волі;\n

          \u{1F3A5} 4) заклади культури (бібліотеки, музеї, галереї, заповідники, виставкові зали, кінотеатри, кіновідеопрокатні підприємства, об'єднання, палаци і будинки культури, інші клубні заклади тощо) та заклади освіти сфери культури (мистецькі школи);\n

          \u{1F3E2} 5) центри надання адміністративних послуг, віддалені робочі місця працівників центрів надання адміністративних послуг;\n

          \u{1F525} 6) місцеві пожежно-рятувальні підрозділи;\n

          \u{1F4BC} 7) представницькі органи місцевого самоврядування та виконавчі органи рад, а у разі їх відсутності відповідні військово-цивільні адміністрації, які розміщені у населених пунктах, що є адміністративними центрами територіальних громад.`,
        options: options.next
      },
      {
        name: 'socialObjects',
        message: "\u{2705}Чи є у населеному пункті соціальні об'єкти?",
        options: options.yesOrNo
      },
      {
        name: 'socialObjectName',
        message: `\u{2705}Вкажіть категорію соціального об'єкту згідно з переліком.`,
        options: options.categoriesSO
      },
      {
        name: 'connection',
        message: `\u{2705}Чи підключений соціальний об'єкт до оптичного кабелю?`,
        options: options.yesOrNo
      }
    ];
  }

  async sendMessage(message, options) {
    return this.bot.sendMessage(this.chatId, message, options);
  }

  async checkPhoneNumber(bot, context, phoneNumber) {
    const profileExists = await Phones.findOne({where: {phoneNumber}});
    if (!profileExists) {
      await this.bot.sendMessage(this.chatId, "\u{1F512}Вашого номеру немає в базі. Ви не можете пройти цю перевірку")
      return false;
    }
    return true;
  }

  static async handle(bot, context) {
    const form = new ProfileForm(bot, context);
    if (context.state.step === null) {
      context.state.step = -1;
      await form.start();
    }

    if (context.state.blocked) {
      context.state = {};
      return;
    }

    if (context.state.step > -1) {
      if (form.fields[context.state.step].name === 'phoneNumber') {
        const valid = await form.checkPhoneNumber(bot, context, context.currentMessage.text);
        if (!valid) {
          context.state.blocked = true;
          return;
        }
      }
      form.data[form.fields[context.state.step].name] = context.currentMessage.text;
    }

    context.state.step++;

    if (context.state.step > form.fields.length-1) {
      return form.finish();
    }

    await form.prompt(context.state.step);
  }

  async start() {
    await this.bot.sendMessage(this.chatId, "\u{2757}УВАГА\u{2757} Намагайтесь заповнювати форми уважно та без помилок.")
  }

  async finish() {
    const user = await Starosta.create(this.data);
    console.log(user);

    await this.bot.sendMessage(this.chatId, "\u{2705}Усі етапи виконано. Дякуємо!\u{1F64F}");
    await this.bot.sendMessage(this.chatId, "\u{1F4CC}Якщо у Вашому віданні є ще інші населені пункти, просимо натиснути кнопку /start та надати інформацію щодо них.", options.onstart);
  }

  async prompt(step, context) {
    const fields = this.fields;
    await this.sendMessage(fields[step].message, fields[step].options);
  }
}

module.exports = ProfileForm;