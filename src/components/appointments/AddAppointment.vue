<template>
  <div>
    <b-button v-b-modal.modal-1>New Notification</b-button>

    <b-modal id="modal-1" cancel-only no-stacking title="Make your Appointment">
      <div>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <b-form-group id="input-group-1" label="Name:" label-for="input-1">
            <b-form-input
                id="input-1"
                v-model="form.name"
                placeholder="Enter name"
                required
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-2" label="Building:" label-for="input-2">
            <b-form-select
                id="input-2"
                v-model="form.building"
                :options="buildings"
                required
            ></b-form-select>
          </b-form-group>
          <b-form-group id="input-group-2" label="Floor:" label-for="input-3">
            <b-form-select
                id="input-3"
                v-model="form.floor"
                :options="floors"
                required
            ></b-form-select>
          </b-form-group>
          <b-form-group id="input-group-1" label="Room:" label-for="input-4">
            <b-form-input
                id="input-4"
                v-model="form.room"
                placeholder="Enter Room number"
                required
            ></b-form-input>
            <b-form-group id="input-group-2" label="Status:" label-for="input-5">
              <b-form-select
                  id="input-5"
                  v-model="form.status"
                  :options="status"
                  required
              ></b-form-select>
            </b-form-group>
          </b-form-group>
          <template>
            <div>
              <label>Choose a date</label>
              <b-form-datepicker
                  id="example-datepicker"
                  v-model="form.date"
                  class="mb-2"
              ></b-form-datepicker>
            </div>
          </template>
          <template>
            <div>
              <b-form-group label="Description:" label-for="textarea" class="mb-0">
                <b-form-textarea
                    id="textarea"
                    v-model="form.description"
                    placeholder="Give description of issue..."
                    rows="3"
                    max-rows="6"
                ></b-form-textarea>
              </b-form-group>

              <pre class="mt-3 mb-0">{{ text }}</pre>
            </div>
          </template>
          <b-button type="submit" variant="primary">Update</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
      </div>
    </b-modal>
  </div>
</template>


<script>
export default {
  data() {
    return {
      form: {
        name: "",
        building: "",
        floor: "",
        room: "",
        date: "",
        description: "",
        status: "",
        // id: "",
      },
      buildings: ["A", "B", "C", "D", "E", "F"],
      floors: ["EG", "1st", "2nd", "3rd"],
      status: ["Open", "Closed", "In progress"],
      show: true,
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.$store.dispatch("addAppointment", {
        index: this.index,
        appointment: this.form,
      });
      setTimeout(() => this.$store.dispatch("fetchAppointments"), 500);
      this.onReset;
      this.$bvModal.hide("modal-1");
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.name = "";
      this.form.building = "";
      this.form.floor = "";
      this.form.room = "";
      this.form.date = "";
      this.form.description = "";
      this.form.status = "";
      // this.form.id = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>