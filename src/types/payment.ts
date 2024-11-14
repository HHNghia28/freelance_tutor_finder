export type IPayment = {
  id: string;
  invoiceAmount: number;
  discount: number;
  amountCharged: number;
  timeCharge: string;
  note: string;
  tutorAdvertisementsId: string;
  tutorAdvertisementsTitle: string;
  tutorName: string;
};
