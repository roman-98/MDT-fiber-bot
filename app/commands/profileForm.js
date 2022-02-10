const ProfileForm = require('../forms/ProfileForm');

async function startProfileForm(bot, context) {
  context.state = {
    command: 'profileForm',
    step: null,
    data: {},
  };

  await ProfileForm.handle(bot, context);
}

async function profileForm(bot, context) {
  await ProfileForm.handle(bot, context);
}


module.exports = {
  startProfileForm,
  profileForm,
};