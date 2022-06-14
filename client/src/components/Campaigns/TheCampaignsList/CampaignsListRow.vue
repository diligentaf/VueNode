<template>
  <v-list-item class="user-row elevation-2">
    <v-layout row align-content-center justify-space-between pa-3>
      <div class="d-flex flex-column align-start pl-1">
        <div class="d-flex">campaign ID : {{ campaign.campaignID }}</div>
        <div class="d-flex">
          contract address : {{ campaign.contractAddress }}
        </div>
        <div class="d-flex">number of link : {{ campaign.numLink }}</div>
      </div>
      <div class="d-flex align-center">
        <v-btn
          @click="openDeleteModal()"
          class="error bright--text align-self-center mr-2"
          icon
          :loading="usersLoading"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </div>
    </v-layout>
  </v-list-item>
</template>

<script>
import { loadingStates } from '../../../mixins/loading-state'
import { ModalService } from '../../../services/modal.service'

export default {
  name: 'CampaignListRow',
  mixins: [loadingStates],

  props: {
    campaign: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    showAddModal: false,
    showConfirmModal: false,
  }),

  methods: {
    toggleAddModal(show) {
      this.showAddModal = !!show
    },

    openDeleteModal() {
      console.log(this.campaign)
      ModalService.openConfirmModal({
        loading: () => this.$store.getters['campaigns/Loading'],
        destructive: true,
        heading: `Delete Campaign "${this.campaign.campaignID}"?`,
        body: `"${this.campaign.campaignID}" will be permanently deleted.`,
        id: this.campaign._id,
      })
    },
  },
}
</script>
