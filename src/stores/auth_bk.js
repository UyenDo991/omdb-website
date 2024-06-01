import { defineStore } from 'pinia';
import { authenticateUser, createRequestToken, getAccountInfo } from "@/api/api";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    requestToken: null,
    expiresAt: null,
    sessionID: null,
    accountInfo: null
  }),

  getters: {
    _requestToken: (state) => state.requestToken,
    _expiresAt: (state) => state.expiresAt,
    _sessionID: (state) => state.sessionID,
    _accountInfo: (state) => state.accountInfo,
  },

  actions: {
    async createRequest() {
      try {
        const { success, request_token, expires_at } = await createRequestToken();
        if(success) {
          console.log("requestToken:", request_token);
          this.requestToken = request_token;
          this.expiresAt = expires_at;
          window.open(`https://www.themoviedb.org/authenticate/${request_token}`, "_blank");
          // window.open(`https://www.themoviedb.org/authenticate/${request_token}?redirect_to=http://localhost:5173/login`, "_blank")
          // https://www.themoviedb.org/authenticate/{REQUEST_TOKEN}?redirect_to=http://www.yourapp.com/approved
        }    
      } catch (error) {
        console.log("createRequest-catch exception:", error.message);
      }
    },
    async authenticate() {
      try {
        const result = await authenticateUser(this.requestToken);
        if(result.success) {
          // console.log("session_id:", session_id);
          if(result.session_id) {
            const accountInfo = await getAccountInfo(result.session_id);
            // console.log("accountInfo:", accountInfo);
            return {
              ...result,
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
    }
  }  
})