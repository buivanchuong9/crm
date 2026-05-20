import { urlsApi } from "configs/urls";

export default {
  submit: (body: any) => {
    return fetch(urlsApi.adjustments.submit, {
      method: "POST",
      body: JSON.stringify(body),
    }).then((res) => res.json());
  },
  
};
