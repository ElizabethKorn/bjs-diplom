const logoutAction = new LogoutButton();

logoutAction.action = () => {
    ApiConnector.logout((response) => {
        if (response.success) {
            location.reload();
        }
    });
}

ApiConnector.current((response) => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
});

const ratesBoard = new RatesBoard();
function getCurrencyRates() {
    ApiConnector.getStocks((response) => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    });
}

getCurrencyRates();
setInterval(() => {
    getCurrencyRates();
}, 6000);


const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, "Баланс успешно пополнен!");
        } else {
            moneyManager.setMessage(false, "Ошибка при пополнении баланса: " + response.error);
        }
    });
}

moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (response) => {
        if(response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, "Конвертация выполнена успешно!");
        } else {
            moneyManager.setMessage(false, "Ошибка при конвертации валюты: " + response.error);
        }
    });
}

moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, "Перевод выполнен успешно!");
        } else {
            moneyManager.setMessage(false, "Ошибка при переводе валюты: " + response.error);
        }
    });
}

const favouritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(response => {
    if(response.success) {
        favouritesWidget.clearTable();
        favouritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
});

favouritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, (response) => {
        if(response.success) {
            favouritesWidget.clearTable();
            favouritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favouritesWidget.setMessage(true, "Добавление пользователя выполнено успешно!");
        } else {
            favouritesWidget.setMessage(false, "Ошибка при добавлении пользователя: " + response.error);
        }
    });
}

favouritesWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, (response) => {
        if(response.success) {
            favouritesWidget.clearTable();
            favouritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favouritesWidget.setMessage(true, "Удаление пользователя выполнено успешно!");
        } else {
            favouritesWidget.setMessage(false, "Ошибка при удалении пользователя: " + response.error);
        }
    });
}
