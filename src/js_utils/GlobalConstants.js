var gConstants = {};

gConstants.LISTENING_PORT = 7777;
gConstants.INDEX_FILE_LOCATION = "./src/components/index/index.html";

gConstants.METHOD_ON_PAGE_ALLOWED = {
    '/index.html':['GET','POST'],
    '/':['GET','POST']
};
gConstants.BASE_PATH = './src/components';
gConstants.URL_PATH_MAP = {
    '/':'/index/index/html',
    '/index.html':'/index/index.html',
    '/login.html':'/login/login.html'
};

module.exports = gConstants;