<template>
  <div>
    <b-button v-b-modal.modal-1>New Notification</b-button>

    <b-modal id="modal-1" cancel-only no-stacking title="Make your Notification">
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
          <!--
          <b-form-group id="input-group-2" label="Service:" label-for="input-2">
            <b-form-select
              id="input-2"
              v-model="form.service"
              :options="services"
              required
            ></b-form-select>
          </b-form-group>
          -->
          <template>
            <div>
              <label for="example-datepicker">Choose a date</label>
              <b-form-datepicker
                id="example-datepicker"
                v-model="form.date"
                class="mb-2"
              ></b-form-datepicker>
            </div>
          </template>
          <template>
            <div>
              <label for="datepicker">Choose a date</label>
              <b-form-timepicker
                id="timepicker"
                v-model="form.time"
                locale="en"
              ></b-form-timepicker>
            </div>
          </template>
          <template>
            <div>
              <b-form-group label="Remark:" label-for="textarea" class="mb-0">
                <b-form-textarea
                  id="textarea"
                  v-model="text"
                  placeholder="Enter something..."
                  rows="3"
                  max-rows="6"
                ></b-form-textarea>
              </b-form-group>

              <pre class="mt-3 mb-0">{{ text }}</pre>
            </div>
          </template>

          <b-button type="submit" variant="primary">Submit</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
      </div>
    </b-modal>
  </div>
</template>

<script>

export default {
  data () {
    return {
      form: {
        name: '',
        // service: "",
        date: '',
        time: '',
        remark: ''
      },
      // services: ["Haircut", "Haircut & Shave (+/- 60 min.)", "Hot Towel Shave"],
      show: true
    }
  },
  methods: {
    onSubmit (event) {
      event.preventDefault()
      this.$store.dispatch('addNotifications', {
        index: this.index,
        notification: this.form
      })
      setTimeout(() => this.$store.dispatch('fetchNotifications'), 500)
      // this.onReset
      this.$bvModal.hide('modal-1')
    },
    onReset (event) {
      event.preventDefault()
      // Reset our form values
      this.form.name = ''
      // this.form.service = "";
      this.form.date = ''
      this.form.time = ''
      this.form.remark = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>
