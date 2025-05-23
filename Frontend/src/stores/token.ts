import type { TwoLang } from "@/lib/Interfaces";
import { defineStore } from "pinia";

export const useToken = defineStore("token", {
  state: () => ({
    token: null as string | null,
    isAuthorized: false,
  }),
  actions: {
    addToken(token: string) {
      this.token = token;
      this.isAuthorized = true;
      this.saveToLocalStorage();
    },
    
    saveToLocalStorage() {
      localStorage.setItem("token", JSON.stringify(this.token));
      localStorage.setItem("isAuthorized", JSON.stringify(this.isAuthorized));
    },
    
    logout() {
      this.token = null;
      this.isAuthorized = false;
      localStorage.clear();
    },
  },
  getters: {
    getToken(state) {
      const data = localStorage.getItem("token");

      if (data) {
        this.token = JSON.parse(data);
      }
      return state.token;
    },
    getIsAuthorized(state) {
      const data = localStorage.getItem("isAuthorized");
      if (data != null) {
        this.isAuthorized = JSON.parse(data);
      }
      return state.isAuthorized;
    },
  },
});

interface Notification {
  title: any;
  description: string;
  type: string;
  analysis_quiz_id: string;
  enrollment_request_id: string;
  status: string; //waiting  done
}

interface info {
  userType: string;
  id:string
  firstName:string
  lastName:string
  email:string
  gender:string
  notifications: Notification[];
}

export const usePersonalInfo = defineStore("personalInfo", {
  state: () => ({
    info: null as info | null,
  }),
  actions: {
    addInfo(info: info) {
      this.info = info;
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      localStorage.setItem("info", JSON.stringify(this.info));
    },
  },
  getters: {
    getInfo(state) {
      const data = localStorage.getItem("info");

      if (data) {
        this.info = JSON.parse(data);
      }
      return state.info;
    },
  },
});

interface Material {
  Id: string;
  order: number;
  title: string;
  type: string; //Lesson Quiz Assesment
}

export const useMaterial = defineStore("addedMaterial", {
  state: () => ({
    material: [] as Material[],
  }),
  actions: {
    addMaterial(Id: string, order: number, title: string, type: string) {
      this.material.push({ Id: Id, order: order, title: title, type: type });
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      localStorage.setItem("material", JSON.stringify(this.material));
    },
    deleteMaterial() {
      localStorage.removeItem("material");
    },
  },
  getters: {
    getMaterial(state) {
      const data = localStorage.getItem("material");

      if (data) {
        this.material = JSON.parse(data);
      }
      return state.material;
    },
  },
});

export const useLang = defineStore("lang", {
  state: () => ({
    selectedLang: "en",
  }),
  actions: {
    setLang(lang: string) {
      this.selectedLang = lang;
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      localStorage.setItem("selectedLang", this.selectedLang);
    },
  },
  getters: {
    getLang(state) {
      const data = localStorage.getItem("selectedLang");
      if (data) {
        this.selectedLang = data;
      }
      return state.selectedLang;
    },
  },
});



interface Order {
  courseTitle: TwoLang
  coursePrice: number
}




export const useOrder = defineStore("rder", {
  state: () => ({
    order: {},
  }),
  actions: {
    setOrder(order: Order) {
      this.order = order;
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      localStorage.setItem("order", JSON.stringify(this.order));
    },
  },
  getters: {
    getOrder(state) {
      const data = localStorage.getItem("order");
      if (data) {
        this.order = JSON.parse(data);
      }
      return state.order;
    },
  },
});