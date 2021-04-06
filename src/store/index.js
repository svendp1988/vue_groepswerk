import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let url = 'http://localhost:3000/';
// let url = 'D:\\GitHub\\vue_groepswerk\\json-server';
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
            fetch(url + 'appointments/')
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
            fetch(url + 'appointments/',
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
            fetch(url + 'appointments/' + appointment.id,
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
            fetch(url + 'appointments/' + appointment.id,
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
        },
        fetchBuildings: function (state) {
            state.commit('_updateError', { error: '' });
            state.commit('_emptyBuildings');
            fetch(url + 'buildings/')
                .then((response) => {
                    if (response.status == 200) {
                        return response.json();
                    } else {
                        throw `error with status ${response.status}`;
                    }
                })
                .then((buildings) => {
                    state.commit('_addBuildings', { buildings });
                })
                .catch((error) => {
                    state.commit('_updateError', { error });
                });
        },
        // fetchFloors: function (state) {
        //     state.commit('_updateError', { error: '' });
        //     state.commit('_emptyFloors');
        //     fetch(url + 'floors/')
        //         .then((response) => {
        //             if (response.status == 200) {
        //                 return response.json();
        //             } else {
        //                 throw `error with status ${response.status}`;
        //             }
        //         })
        //         .then((floors) => {
        //             state.commit('_addFloors', { floors });
        //         })
        //         .catch((error) => {
        //             state.commit('_updateError', { error });
        //         });
        // },
        fetchStatus: function (state) {
            state.commit('_updateError', { error: '' });
            state.commit('_emptyStatus');
            fetch(url + 'status/')
                .then((response) => {
                    if (response.status == 200) {
                        return response.json();
                    } else {
                        throw `error with status ${response.status}`;
                    }
                })
                .then((status) => {
                    state.commit('_addStatus', { status });
                })
                .catch((error) => {
                    state.commit('_updateError', { error });
                });
        },
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
        },
        _emptyBuildings(state) {
            state.buildings = [];
        },
        _emptyStatus(state) {
            state.status = [];
        },
        _addBuildings(state, payload) {
            state.buildings = payload.buildings;
        },
        _addFloors(state, payload) {
            state.floors = payload.floors;
        },
        _addStatus(state, payload) {
            state.status = payload.status;
        }
    }
});

export default store;
