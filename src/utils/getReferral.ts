export enum ReferralKey {
  refId = 'refId',
  bid = 'bid',
  cid = 'cid',
  refid = 'refid',
}

// TODO: Add unit test after merge into 1.1.30
export const getReferral = () => {
  if (typeof window === 'undefined' || !window.location.search)
    return { referral: '', referralKeyAndValue: '' };
  const searchParams = new URLSearchParams(window.location.search);

  const referral =
    searchParams.get(ReferralKey.refId) ||
    searchParams.get(ReferralKey.bid) ||
    searchParams.get(ReferralKey.cid) ||
    searchParams.get(ReferralKey.refid) ||
    '';

  return {
    referral,
  };
};
