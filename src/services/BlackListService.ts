import { urlsApi } from "configs/urls";

export default {
  update: (body: any) => {
    return fetch(urlsApi.bpmParticipant.update, {
      method: "POST",
      body: JSON.stringify(body),
    }).then((res) => res.json());
  },
};
