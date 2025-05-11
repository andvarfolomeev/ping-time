import { defineStore } from "pinia";
import router from "../router";

export const useUserStore = defineStore("user", {
  state: (): { name: string; returnUrl?: string } => ({
    name: "",
    returnUrl: undefined,
  }),
  getters: {
    isLoggedIn: (state) => state.name != "",
  },
  actions: {
    login(name: string) {
      this.name = name;
      router.push(this.returnUrl ?? "/");
      this.returnUrl = undefined;
    },
    logout() {
      this.name = "";
      router.push("/");
    },
  },
  persist: true,
});
