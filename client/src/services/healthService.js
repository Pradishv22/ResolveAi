import api from './api';

export const healthService = {
  async getHealth() {
    return api.get('/health');
  }
};
