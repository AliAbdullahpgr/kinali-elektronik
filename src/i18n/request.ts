import { getRequestConfig } from "next-intl/server";

import trMessages from "../../messages/tr.json";

export default getRequestConfig(async () => {
  return {
    locale: "tr",
    messages: trMessages,
  };
});
