import { defineStore } from 'pinia';
import { authenticateUser, createRequestToken, getAccountInfo, deleteSession } from "@/api/api";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    expiresAt: null,
    sessionID: null,
    accountInfo: null
  }),

  getters: {
    _expiresAt: (state) => state.expiresAt,
    _sessionID: (state) => state.sessionID,
    _accountInfo: (state) => state.accountInfo,
  },

  actions: {
    async createRequest() {
      try {
        const { success, request_token, expires_at } = await createRequestToken();
        if(success) {
          this.expiresAt = expires_at;
          localStorage.setItem("requestToken", request_token);
          window.open(`https://www.themoviedb.org/authenticate/${request_token}?redirect_to=http://localhost:5173`);
        }    
      } catch (error) {
        console.log("createRequest-catch exception:", error.message);
      }
    },
    async authenticate(requestToken) {
      try {
        const result = await authenticateUser(requestToken);
        if(result.success === true) {
          if(result.session_id) {
            const accountInfo = await getAccountInfo(result.session_id);
            return {
              success: result.success, // Sử dụng cú pháp đúng để trả về một object
              session_id: result.session_id,
              account_info: accountInfo
            }
          }
        }
      } catch (error) {
        console.log("authenticate-catch exception:", error.message);      
      }
    },  
    saveAccountInfo(session_id, account_info) {
      this.sessionID = session_id;
      this.accountInfo = account_info;
    },
    async clearLogIn(sessionID) {
      return await deleteSession(sessionID);
    },
    async clearSavedInfo() {
      this.sessionID = null;
      this.accountInfo = null;
      localStorage.removeItem("requestToken");
      localStorage.removeItem("sessionID");
      localStorage.removeItem("accountInfo");
    },
  }  
})