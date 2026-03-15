
export type STATUS = "completed" | "pending" | "initialized" | "rejected" | ""

export type Transaction = {
  _id : string;
  amount : number;
  type : "credit_purchase" | "credit_withdraw" | "course_purchase"; 
  method : "razor_pay" | "wallet"; 
  createdAt : string ;
  status :  STATUS;
}

export type Wallet = {
  creditBalance : number;
  creditValue : number;
  transactions : Transaction[];
  creditConst :number
}