<template>
  <div>
    <b-table
      striped
      dark
      hover
      :items="$store.state.appointments"
      :fields="fields"
    >
      <template #cell(actions)="row">
        <b-dropdown text="☰" right style="font-size: 32px" no-caret>
          <b-dropdown-item
            ><update-appointment v-bind:appointment="row"
          /></b-dropdown-item>
          <b-dropdown-item size="sm" @click="log(row)" class="mr-2">
            LOG
          </b-dropdown-item>
        </b-dropdown>
      </template>
    </b-table>
    <add-appointment />
  </div>
</template>

<script>
import AddAppointment from "./AddAppointment.vue";
import UpdateAppointment from "./UpdateAppointment.vue";
export default {
  components: { AddAppointment, UpdateAppointment },
  data() {
    return {
      fields: ["name", "service", "date", "time", "remark", "actions"],
    };
  },
  methods: {
    log: function (row) {
      console.log(row);
    },
    getAppointments: function () {
      this.$store.dispatch("fetchAppointments");
    },
  },
  beforeMount() {
    this.getAppointments();
  },
};
</script>
