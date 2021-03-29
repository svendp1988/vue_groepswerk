<template>
  <div>
    <b-table
      striped
      light
      hover
      :busy="isBusy"
      :items="$store.state.notifications"
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
          <b-dropdown-item>
            <update-notification v-bind:notification="row" />
          </b-dropdown-item>
          <b-dropdown-item size="sm" @click="log(row)" class="mr-2">
            <b-button @click="deleteNotification(row)"
              >Delete Notification</b-button
            >
          </b-dropdown-item>
        </b-dropdown>
      </template>
    </b-table>
    <add-notification />
  </div>
</template>

<script>
import AddNotification from './AddNotification.vue'
import UpdateNotification from './UpdateNotification.vue'
export default {
  components: { AddNotification, UpdateNotification },
  data () {
    return {
      isBusy: false,
      fields: ['name', 'date', 'time', 'remark', 'actions']
    }
  },
  methods: {
    getNotifications: function () {
      this.isBusy = true
      this.$store.dispatch('fetchNotifications')
      setTimeout(() => (this.isBusy = false), 500)
    },
    deleteNotification: function (row) {
      const index = row.index
      const notification = row.item
      this.isBusy = true
      this.$store.dispatch('deleteNotification', { index, notification })
      setTimeout(() => (this.isBusy = false), 500)
    }
  },
  beforeMount () {
    this.getNotifications()
  }
}
</script>
