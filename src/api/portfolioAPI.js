import api from './axios'

export const portfolioAPI = {
  getAll: () => api.get('/portfolio'),
  getById: (id) => api.get(`/portfolio/${id}`),
  create: (data) => api.post('/portfolio', data),
  update: (id, data) => api.put(`/portfolio/${id}`, data),
  delete: (id) => api.delete(`/portfolio/${id}`),
  uploadImage: (file) => {
    const formData = new FormData()
    formData.append('image', file)
    return api.post('/portfolio/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
  uploadFile: (file) => {
    const formData = new FormData()
    formData.append('file', file)
    return api.post('/portfolio/upload-file', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
  getUploads: () => api.get('/portfolio/uploads/list'),
  deleteUpload: (filename) => api.delete(`/portfolio/uploads/${filename}`),
}
