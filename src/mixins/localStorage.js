
import { Storage } from "@ionic/storage";

export default {
  name: 'StorageService',
  data() {
    return {
      localStorage: new Storage()
    }
  },
  mounted() {
    this.localStorage.create();
  },
  methods: {
    async setLocalStorage(index, value) {
      await this.localStorage.set(index, value);
    },
    async getLocalStorage(index) {
      await this.localStorage.get(index);
    },
    async removeLocalStorage(index) {
      await this.localStorage.remove(index);
    },
    async clearLocalStorage() {
      await this.localStorage.clear();
    }
  }
};
