import { ReferralKey } from "./getReferral";

export type QueryParams = Record<string, string | number | boolean>;

const appendQueryParams = ({
  url,
  query,
}: {
  url: string;
  query: QueryParams;
}) => {
  const queryString = Object.entries(query)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value.toString())}`
    )
    .join("&");
  let separator = url.includes("?") ? "&" : "?";

  if (!queryString) {
    separator = "";
  }

  return `${url}${separator}${queryString}`;
};

const getSearchParamsObj = () => {
  if (typeof window === "undefined" || !window.location.search) {
    return {};
  }
  const searchParams = new URLSearchParams(window.location.search);
  return Object.fromEntries(searchParams.entries());
};

export const getRegisterLink = ({
  url,
  hasUtmSource = false,
  refId = "",
}: {
  url: string;
  hasUtmSource: boolean;
  refId?: string;
}) => {
  const searchParamsObj = getSearchParamsObj();

  if (refId) {
    // Remove specific keys from searchParamsObj
    const keysToRemove = [
      ReferralKey.bid,
      ReferralKey.cid,
      ReferralKey.refId,
      ReferralKey.refid,
    ];
    keysToRemove.forEach((key) => {
      delete searchParamsObj[key];
    });
  }

  const queryParams: QueryParams = {
    ...(hasUtmSource && { utm_source: "HSC_events" }),
    ...searchParamsObj,
    ...(refId && { refid: refId }),
  };

  const modifiedUrl = new URL(url);
  modifiedUrl.pathname = "/register-information";

  const baseRegisterUrl = modifiedUrl.toString();

  const registerLink = appendQueryParams({
    url: baseRegisterUrl,
    query: queryParams,
  });

  return registerLink;
};
