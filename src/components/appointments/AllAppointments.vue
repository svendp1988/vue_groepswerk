<template>
  <div>
    <add-appointment />
    <a> <br/> </a>
    <b-table
      striped
      light
      hover
      :busy="isBusy"
      :items="$store.state.appointments"
      :fields="fields"
    >
      <template #table-busy>
        <div class="text-center text-white my-2">
          <b-spinner
            :variant="light"
            type="grow"
            class="align-middle"
          ></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>
      <template #cell(actions)="row">
        <b-dropdown text="☰" right style="font-size: 32px" no-caret>
          <b-dropdown-item
            ><update-appointment v-bind:appointment="row" />
          </b-dropdown-item>
          <b-dropdown-item size="sm" @click="log(row)" class="mr-2">
            <b-button @click="deleteAppointment(row)"
              >Delete Notification</b-button
            >
          </b-dropdown-item>
        </b-dropdown>
      </template>
    </b-table>

  </div>
</template>

<script>
import AddAppointment from "./AddAppointment.vue";
import UpdateAppointment from "./UpdateAppointment.vue";
export default {
  components: { AddAppointment, UpdateAppointment },
  data() {
    return {
      isBusy: false,
      fields: ["date", "name", "building", "floor", "room", "description", "status", "actions"],
    };
  },
  methods: {
    getAppointments: function () {
      this.isBusy = true;
      this.$store.dispatch("fetchAppointments");
      setTimeout(() => (this.isBusy = false), 500);
    },
    deleteAppointment: function (row) {
      let index = row.index;
      let appointment = row.item;
      this.isBusy = true;
      this.$store.dispatch("deleteAppointment", { index, appointment });
      setTimeout(() => (this.isBusy = false), 500);
    },
  },
  beforeMount() {
    this.getAppointments();
  },
};
</script>
