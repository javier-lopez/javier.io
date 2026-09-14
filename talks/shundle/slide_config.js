var SLIDE_CONFIG = {
  // Slide settings
  settings: {
    title: 'Shundle',
    subtitle: 'Un administrador de plugins para la shell',
    //eventInfo: {
      //title: 'Jornada Universitaria de tecnologías de la información',
      //date: '03/26/2014'
    //},
    useBuilds: true, // Default: true. False will turn off slide animation builds.
    usePrettify: true, // Default: true
    enableSlideAreas: true, // Default: true. False turns off the click areas on either slide of the slides.
    enableTouch: true, // Default: true. If touch support should enabled. Note: the device must support touch.
    //analytics: 'UA-XXXXXXXX-1', // TODO: Using this breaks GA for some reason (probably requirejs). Update your tracking code in template.html instead.
    favIcon: 'images/ubuntu-tiny.png',
    // Disabled 2026-09-13. slide-deck.js#addFonts_ turns this array into a
    // runtime <link> to fonts.googleapis.com; the same two families are now
    // self-hosted and linked directly from index.html (theme/css/fonts.css),
    // so the deck keeps its original faces without the third-party request.
    // Re-enabling this would load them twice.
    //fonts: [
      //'Open Sans:regular,semibold,italic,italicsemibold',
      //'Source Code Pro'
    //],
    //theme: ['mytheme'], // Add your own custom themes or styles in /theme/css. Leave off the .css extension.
  },

  // Author information
  presenters: [{
    name: 'Javier López',
    company: 'Administrador de sistemas<br><a href="http://javier.io">javier.io</a> / <a href="https://github.com/javier-lopez">github.com/javier-lopez</a>',
    //gplus: 'http://plus.google.com/1234567890',
    //twitter: '@javier-lopez',
    //www: 'http://javier.io',
    //github: 'http://github.com/javier-lopez'
  }/*, {
    name: 'Second Name',
    company: 'Job Title, Google',
    gplus: 'http://plus.google.com/1234567890',
    twitter: '@yourhandle',
    www: 'http://www.you.com',
    github: 'http://github.com/you'
  }*/]
};

