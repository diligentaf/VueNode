import { CampaignsService } from '../services/campaigns.service'

const campaignsGetterTypes = {
  campaigns: 'Campaigns',
  loading: 'Loading',
}

const campaignsMutationTypes = {
  setLoading: 'SetLoading',
  setSuccess: 'SetSuccess',
  setError: 'SetError',
}

const campaignsActionTypes = {
  get: 'GetAll',
  add: 'Add',
  update: 'Update',
  delete: 'Delete',
}

const state = () => ({
  records: undefined,
  loading: false,
})

const getters = {
  [campaignsGetterTypes.campaigns]: (state) => state.records,
  [campaignsGetterTypes.loading]: (state) => state.loading,
}

const mutations = {
  [campaignsMutationTypes.setLoading](state) {
    state.loading = true
  },

  [campaignsMutationTypes.setSuccess](state, campaignRecords) {
    state.records = campaignRecords
    state.loading = false
  },

  [campaignsMutationTypes.setError](state) {
    state.records = []
    state.loading = false
  },
}

const actions = {
  async [campaignsActionTypes.get]({ state, commit }, bustCache) {
    if (state.records && !bustCache) {
      return
    }

    commit(campaignsMutationTypes.setLoading)

    try {
      const response = await CampaignsService.get()
      commit(campaignsMutationTypes.setSuccess, response.data.campaigns)
    } catch (error) {
      console.error(error)
      commit(campaignsMutationTypes.setError)
    }
  },

  async [campaignsActionTypes.add]({ dispatch, commit }, campaignData) {
    commit(campaignsMutationTypes.setLoading)

    try {
      await CampaignsService.post(campaignData)
      dispatch(campaignsActionTypes.get, true)
    } catch (error) {
      console.error(error)
      commit(campaignsMutationTypes.setError)
    }
  },

  async [campaignsActionTypes.update]({ dispatch, commit }, payload) {
    commit(campaignsMutationTypes.setLoading)

    try {
      await CampaignsService.put(payload.id, payload.data)
      await dispatch(campaignsActionTypes.get, true)
    } catch (error) {
      console.error(error)
      commit(campaignsMutationTypes.setError)
    }
  },

  async [campaignsActionTypes.delete]({ dispatch, commit }, id) {
    commit(campaignsMutationTypes.setLoading)

    try {
      await CampaignsService.delete(id)
      await dispatch(campaignsActionTypes.get, true)
    } catch (error) {
      console.error(error)
      await dispatch(campaignsActionTypes.get, true)
    }
  },
}

export const campaignsStoreModule = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
