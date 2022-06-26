module.exports = {
    client: 'postgresql',
    connection: {
      host: 'ec2-34-248-169-69.eu-west-1.compute.amazonaws.com',
      port: 5432,
      user: 'cokcicjuysjhxk',
      password: '021c9aed431a8ed0529b07e59c608cd4208aec4088163d100be1f73702d5a077',
      database: 'd5hgm981vh1bu7',
    },
    migrations: {
      directory: __dirname + '/../migrations',
    },
    seeds: {
      directory: __dirname + '/../seeds',
    },
}