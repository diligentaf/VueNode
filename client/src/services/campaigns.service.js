import axios from 'axios'

export const CampaignsService = {
  http: axios.create({
    baseURL: 'http://localhost:9000/api/campaigns',
  }),
  get() {
    return this.http.get()
  },
  post(campaignData) {
    return this.http.post('', campaignData)
  },
  put(id, campaignData) {
    return this.http.put(`/${id}`, campaignData)
  },
  delete(id) {
    return this.http.delete(`/${id}`)
  },
}
