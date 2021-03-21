import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let url = 'http://localhost:3000/appointments/';
const store = new Vuex.Store({
    // https://vuex.vuejs.org/guide/state.html
    state: {
        appointments: [],
        error: ''
    },
    // https://vuex.vuejs.org/guide/getters.html
    getters: {
        numberOfAppointments: (state) => state.appointments.length
    },
    // actions zijn asynchroon, aangeroepen via dispatch
    // https://vuex.vuejs.org/guide/actions.html
    actions: {
        fetchAppointments: function (state) {
            state.commit('_updateError', { error: '' });
            state.commit('_emptyAppointments');
            fetch(url)
                .then((response) => {
                    if (response.status == 200) {
                        return response.json();
                    } else {
                        throw `error with status ${response.status}`;
                    }
                })
                .then((appointments) => {
                    state.commit('_addAppointments', { appointments });
                })
                .catch((error) => {
                    state.commit('_updateError', { error });
                });
        },
        addAppointment: function (state, payload) {
            state.commit('_updateError', { error: '' });
            let { index, appointment } = payload;
            fetch(url,
                {
                    method: "POST",
                    body: JSON.stringify(appointment),
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
                .then((appointment) => {
                    state.commit('_addAppointment', { index, appointment });
                })
                .catch((error) => {
                    state.commit('_updateError', { error });
                });
        },
        deleteAppointment: function (state, payload) {
            state.commit('_updateError', { error: '' });
            let { index, appointment } = payload;
            fetch(url + appointment.id,
                {
                    method: "DELETE",
                    body: JSON.stringify(appointment),
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
                .then((appointment) => {
                    state.commit('_deleteAppointment', { index, appointment });
                })
                .catch((error) => {
                    state.commit('_updateError', { error });
                });
        },
        updateAppointment: function (state, payload) {
            state.commit('_updateError', { error: '' });
            let { index, appointment } = payload;
            fetch(url + appointment.id,
                {
                    method: "PUT",
                    body: JSON.stringify(appointment),
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
                .then((appointment) => {
                    state.commit('_updateAppointment', { index, appointment });
                })
                .catch((error) => {
                    state.commit('_updateError', { error });
                });
        }
    },
    // synchrone wijzigingen van state
    // https://vuex.vuejs.org/guide/mutations.html
    mutations: {
        _emptyAppointments(state) {
            state.appointments = [];
        },
        _addAppointments(state, payload) {
            state.appointments = payload.appointments;
        },
        _addAppointment(state, payload) {
            let { index, appointment } = payload;
            state.appointments[index] = appointment;
        },
        _deleteAppointment(state, payload) {
            let { index } = payload;
            state.appointments.splice(index, 1);
        },
        _updateAppointment(state, payload) {
            let { index, appointment } = payload;
            state.appointments[index] = appointment;
        },
        _updateError(state, payload) {
            state.error = payload.error;
        }

    }
});

export default store;
