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
import detectEthereumProvider from '@metamask/detect-provider'
// import Web3 from 'web3'

export default {
  name: 'CampaignsPage',
  mixins: [loadingStates],

  components: {
    TheCampaignsList,
  },

  data: () => ({
    contractAddress: '0x75B0228fefc9937c72637bA8Fc711Bbc1B98912b',
    amount: '1000',
    numLink: '10',
    campaignID: '',
    privateKey: 20,
    contractType: 'ERC20',
    client: '',
  }),

  methods: {
    showAddModal() {
      ModalService.openGenericModal(NewCampaignForm)
    },
    async createCampaign() {
      try {
        this.campaignID = 'id' + Math.random().toString(16).slice(2)
        if (
          this.amount == '' ||
          this.numLink == '' ||
          this.contractAddress == ''
        ) {
          alert('please input all the blank fields')
          return
        }
        const newCampaign = {
          campaignID: this.campaignID,
          privateKey: this.privateKey,
          contractAddress: this.contractAddress,
          contractType: this.contractType,
          amount: parseInt(this.amount),
          numLink: parseInt(this.numLink),
          client: this.client,
        }

        await this.$store.dispatch('campaigns/Add', newCampaign)

        // this.$emit('success', newCampaign)
      } catch (error) {
        console.error(error)
        this.$emit('error', { error })
      }
    },
    // metamask shits
    async detectEthereum() {
      const provider = await detectEthereumProvider()
      if (provider) {
        await this.startApp(provider)
      } else {
        // 에러메세지
      }
    },
    startApp(provider) {
      if (provider !== window.ethereum) {
        this.failToast('Do you have multiple wallets installed?')
      } else if (window.ethereum && window.ethereum.isMetaMask) {
        this.connect()
      }
    },
    async connect() {
      await window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(this.handleAccountsChanged)
        .catch((err) => {
          if (err.code === 4001) {
            console.log(err.message)
          } else {
            console.error(err)
          }
        })
    },
    handleAccountsChanged(accounts) {
      this.client = accounts[0]
    },
  },
  mounted() {
    // console.log(detectEthereumProvider)
    // console.log(Web3)
    this.detectEthereum()
  },
}
</script>

<style></style>
