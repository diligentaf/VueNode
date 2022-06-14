<template>
  <div class="page-content">
    <v-layout justify-space-between align-content-center column>
      <v-layout justify-space-between align-content-center>
        <h2>Campaign</h2>
        <v-btn
          color="success"
          @click="createCampaign()"
          :loading="usersLoading"
        >
          Create Campaign
        </v-btn>
      </v-layout>
      <v-text-field v-model="contractAddress" label="ERC20 Token Address" />
      <v-text-field v-model="amount" label="amount" />
      <v-text-field v-model="numLink" label="number of links" />
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
    campaignID: '',
    privateKey: 20,
    contractAddress: '',
    contractType: 'ERC20',
    amount: '',
    numLink: '',
  }),

  methods: {
    showAddModal() {
      ModalService.openGenericModal(NewCampaignForm)
    },
    async createCampaign() {
      try {
        this.campaignID = 'id' + Math.random().toString(16).slice(2)
        const newCampaign = {
          campaignID: this.campaignID,
          privateKey: this.privateKey,
          contractAddress: this.contractAddress,
          contractType: this.contractType,
          amount: parseInt(this.amount),
          numLink: parseInt(this.numLink),
        }

        console.log(newCampaign)

        await this.$store.dispatch('campaigns/Add', newCampaign)

        // this.$emit('success', newCampaign)
      } catch (error) {
        console.error(error)
        this.$emit('error', { error })
      }
    },
  },
}
</script>

<style></style>
