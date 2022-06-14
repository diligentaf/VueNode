<template>
  <div class="page-content">
    <v-layout justify-space-between align-content-center column>
      <v-layout justify-space-between align-content-center>
        <h2>Campaign</h2>
        <v-btn color="success" @click="showAddModal()" :loading="usersLoading">
          Add Campaign
        </v-btn>
        <v-btn
          color="success"
          @click="createCampaign()"
          :loading="usersLoading"
        >
          Create Campaign
        </v-btn>
      </v-layout>
      <the-campaigns-list class="mt-5" />
    </v-layout>
  </div>
</template>

<script>
import TheCampaignsList from '../components/Campaigns/TheCampaignsList/TheCampaignsList.vue'
import NewCampaignForm from '../components/Campaigns/NewCampaignForm.vue'
import { loadingStates } from '../mixins/loading-state'
import { ModalService } from '../services/modal.service'

export default {
  name: 'CampaignsPage',
  mixins: [loadingStates],

  components: {
    TheCampaignsList,
  },

  data: () => ({
    name: '',
    age: 20,
    email: '',
  }),

  methods: {
    showAddModal() {
      ModalService.openGenericModal(NewCampaignForm)
    },
    async createCampaign() {
      try {
        const newUser = { name: this.name, age: this.age, email: this.email }

        console.log(newUser)

        // await this.$store.dispatch('campaigns/Add', newUser)

        // this.$emit('success', newUser)
      } catch (error) {
        console.error(error)
        this.$emit('error', { error })
      }
    },
  },
}
</script>

<style></style>
