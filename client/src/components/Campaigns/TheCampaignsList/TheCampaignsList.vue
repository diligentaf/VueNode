<template>
  <div>
    <v-list rounded flat two-line class="transparent">
      <campaigns-list-row
        v-for="user in users"
        :key="user.email"
        :user="user"
      />
    </v-list>
  </div>
</template>

<script>
import CampaignsListRow from './CampaignsListRow.vue'

export default {
  name: 'TheCampaignsList',

  components: {
    CampaignsListRow,
  },

  data: () => ({
    // users: [],
  }),

  computed: {
    users() {
      return this.$store.getters['users/Users'] || []
    },
  },

  methods: {
    fetchUsers() {
      this.$store.dispatch('users/GetAll')
    },
  },

  mounted() {
    this.fetchUsers()
  },
}
</script>
