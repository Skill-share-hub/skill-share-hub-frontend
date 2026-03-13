export type Transaction = {
  amount : number,
  type : "credit_purchase" | "credit_withdraw" | "course_purchase", 
  method : "razor_pay" | "wallet", 
  date:string, 
  status :  "completed" | "pending" | "initialized"
}