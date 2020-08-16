/**
 * Config shared across all environments
 */
module.exports = {
  database_object_modeling: null, // (mongoose | sequelize | null)
  sessions_enabled: false,
  about: {
    website: {
      name: 'boilerplate-webapp',
      launched: 2017,
    },
    author: {
      name: 'William McMurray',
      website: 'http://wimantis.ninja',
    }
  },
  seo: {
    title         : 'Webapp Boilerplate',
    description   : 'A foundation to build web apps upon.',
    keywords      : '',
    og_type       : 'website',
    og_locale     : 'en_CA',
    og_site_name  : '',
    og_image      : '',
  }
};
