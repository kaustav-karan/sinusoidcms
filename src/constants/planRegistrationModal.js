export const planRegistrationModal = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  universityName: "",
  photoIdUrl: "", // URL of the
  paymentProofUrl: "", // URL of the payment proof
  registrationTime: new Date().toISOString(),
};

export const plans = [
  {
    planid: "silver",
    planName: "Silver Plan",
  },
  {
    planid: "gold",
    planName: "Gold Plan",
  },
  {
    planid: "platinum",
    planName: "Platinum Plan",
  },
];