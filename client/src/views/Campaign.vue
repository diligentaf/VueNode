<template>
  <div class="page-content">
    <v-layout justify-space-between align-content-center column>
      <v-layout justify-space-between align-content-center>
        <h2>Campaign</h2>
        <v-btn color="success" @click="showAddModal()" :loading="usersLoading">
          Add Campaign
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
    // showAddModal: false,
  }),

  methods: {
    // toggleAddModal(show) {
    //   this.showAddModal = !!show
    // },

    showAddModal() {
      ModalService.openGenericModal(NewCampaignForm)
    },
  },
}
</script>

<style></style>
