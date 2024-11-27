// Inicializando o Facebook SDK
window.fbAsyncInit = function () {
    FB.init({
        appId: '465820006531647', // Substitua pelo seu App ID
        cookie: true,
        xfbml: true,
        version: 'v17.0' // Certifique-se de usar a versão mais recente
    });

    // Verifica o status de login ao carregar
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
};

// Verifica o status de login
function statusChangeCallback(response) {
    if (response.status === 'connected') {
        fetchUserInfo();
    } else {
        document.getElementById('user-info').classList.add('hidden');
    }
}

// Faz o login
document.getElementById('fb-login-btn').addEventListener('click', () => {
    FB.login(function (response) {
        if (response.status === 'connected') {
            fetchUserInfo();
        }
    }, { scope: 'public_profile,email' });
});

// Busca informações do usuário
function fetchUserInfo() {
    FB.api('/me', { fields: 'id,name,email,picture' }, function (response) {
        document.getElementById('user-name').textContent = response.name;
        document.getElementById('user-email').textContent = response.email || 'Email não disponível';
        document.getElementById('user-pic').src = response.picture.data.url;
        document.getElementById('user-info').classList.remove('hidden');
    });
}

// Faz logout
document.getElementById('logout-btn').addEventListener('click', () => {
    FB.logout(function (response) {
        document.getElementById('user-info').classList.add('hidden');
    });
});
