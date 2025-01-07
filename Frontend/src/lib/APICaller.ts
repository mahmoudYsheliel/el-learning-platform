import axios from "axios";
import { useToken } from "@/stores/token";

export class HttpRequester {
  private endpoint;
  private bearer;
  private base_endpoint;
  private token;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
    //this.base_endpoint = "http://127.0.0.1:8000/";
    this.base_endpoint = "/";
    this.token = useToken();
    this.bearer = this.token.getToken;
  }

  public isUserSignedIn(): boolean {
    if (this.token.getIsAuthorized) {
      return true;
    }
    return false;
  }

  public async login(username:string,pass:string){
    let lofinString=`username=${username}&password=${pass}&scope=&client_id=&client_secret=`
    try {
      const url = this.base_endpoint + this.endpoint;
      let response = await axios.post(url.toString(), lofinString);
      if(response.data && response.status ==200 && response.data.access_token){
        this.token.addToken(response.data.access_token);
        return response.data;
      }
      else if (response.data && response.status ==200) {
        return response.data;
      } else {
        return false;
      }
    } catch (error) {
    }
  }
  
  public logOut() {
    this.token.logout();
  }

  public async callApi(queryParams?: object): Promise<any> {
    try {
      const url = this.base_endpoint + this.endpoint;

      const config = {
        headers: {
          Authorization: `Bearer ${this.bearer}`,
        },
      };
      let response = await axios.post(url.toString(), queryParams, config);

      if (response.data && response.status ==200) {
        return response.data;
      } else {
        return false;
      }
    } catch (error) {
    }
  }
}
