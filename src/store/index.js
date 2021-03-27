import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let url = 'http://localhost:3000/notifications/';
const store = new Vuex.Store({
    // https://vuex.vuejs.org/guide/state.html
    state: {
        notifications: [],
        error: ''
    },
    // https://vuex.vuejs.org/guide/getters.html
    getters: {
        numberOfNotifications: (state) => state.notifications.length
    },
    // actions zijn asynchroon, aangeroepen via dispatch
    // https://vuex.vuejs.org/guide/actions.html
    actions: {
        fetchNotifications: function (state) {
            state.commit('_updateError', { error: '' });
            state.commit('_emptyNotifications');
            fetch(url)
                .then((response) => {
                    if (response.status == 200) {
                        return response.json();
                    } else {
                        throw `error with status ${response.status}`;
                    }
                })
                .then((notifications) => {
                    state.commit('_addNotifications', { notifications });
                })
                .catch((error) => {
                    state.commit('_updateError', { error });
                });
        },
        addNotifications: function (state, payload) {
            state.commit('_updateError', { error: '' });
            let { index, notification } = payload;
            console.log({index})
            fetch(url,
                {
                    method: "POST",
                    body: JSON.stringify(notification),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                .then((response) => {
                    if (response.status == 200 || response.status == 201) {
                        return response.json();
                    } else {
                        throw `error with status ${response.status}`;
                    }
                })
                .then((notification) => {
                    state.commit('_addNotification', { index, notification });
                })
                .catch((error) => {
                    state.commit('_updateError', { error });
                });
        },
        deleteNotification: function (state, payload) {
            state.commit('_updateError', { error: '' });
            let { index, notification } = payload;
            fetch(url + notification.id,
                {
                    method: "DELETE",
                    body: JSON.stringify(notification),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                .then((response) => {
                    if (response.status == 200 || response.status == 202 || response.status == 204) {
                        return response.json();
                    } else {
                        throw `error with status ${response.status}`;
                    }
                })
                .then((notification) => {
                    state.commit('_deleteNotification', { index, notification });
                })
                .catch((error) => {
                    state.commit('_updateError', { error });
                });
        },
        updateNotification: function (state, payload) {
            state.commit('_updateError', { error: '' });
            let { index, notification } = payload;
            fetch(url + notification.id,
                {
                    method: "PUT",
                    body: JSON.stringify(notification),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                .then((response) => {
                    if (response.status == 200 || response.status == 201) {
                        return response.json();
                    } else {
                        throw `error with status ${response.status}`;
                    }
                })
                .then((notification) => {
                    state.commit('_updateNotification', { index, notification });
                })
                .catch((error) => {
                    state.commit('_updateError', { error });
                });
        }
    },
    // synchrone wijzigingen van state
    // https://vuex.vuejs.org/guide/mutations.html
    mutations: {
        _emptyNotifications(state) {
            state.notifications = [];
        },
        _addNotifications(state, payload) {
            state.notifications = payload.notifications;
        },
        _addNotification(state, payload) {
            let { index, notification } = payload;
            state.notifications[index] = notification;
        },
        _deleteNotification(state, payload) {
            let { index } = payload;
            state.notifications.splice(index, 1);
        },
        _updateNotification(state, payload) {
            let { index, notification } = payload;
            state.notifications[index] = notification;
        },
        _updateError(state, payload) {
            state.error = payload.error;
        }
        
    }
});

export default store;
