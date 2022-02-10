module.exports = {

  next: {
    reply_markup: JSON.stringify({
      keyboard: [
        ['Далі \u{27A1}']
      ],
      one_time_keyboard: true
    })
  },

  yesOrNo: {
    reply_markup: JSON.stringify({
      keyboard: [
        ['Так'],
        ['Ні']
      ],
      one_time_keyboard: true
    })
  },

  onstart: {
    reply_markup: JSON.stringify({
      keyboard: [
        ['/start']
      ],
      one_time_keyboard: true
    })
  },

  letCheck: {
    reply_markup: JSON.stringify({
      keyboard: [
        ['Розпочати перевірку \u{1F680}']
      ],
      one_time_keyboard: true
    })
  },

  categoriesSO: {
    reply_markup: JSON.stringify({
      keyboard: [
        ['Заклади освіти'],['Заклади медичної допомоги'],
        ['Заклади соціального захисту'],['Заклади культури'],
        ['Центри надання адміністративних послуг'],['Заклади пожежної безпеки'],
        ['Органи місцевого самоврядування'],['Інше'], [`Соціальних об'єктів немає`]
      ],
      one_time_keyboard: true
    })
  }
  
}