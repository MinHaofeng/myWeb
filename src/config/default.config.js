var config = module.exports = {
  port: 8501,
  db: {
    uri: 'mongodb://127.0.0.1/myWeb',
    options: {
      user: '',
      pass: ''
    },
    delay: 3000
  },
  log: {
    format: 'dev',
    options: {}
  }
};

