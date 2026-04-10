
export type STATUS = "completed" | "pending" | "initialized" | "rejected" | ""

export type Transaction = {
  _id : string;
  amount : number;
  type : "credit_purchase" | "credit_withdraw" | "course_purchase" | "tutor_earning"; 
  method : "razor_pay" | "wallet"; 
  createdAt : string ;
  status :  STATUS;
  creditBalance: number;
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  currency: string;
  courseId? : string;
  courseSnapshot?: {
    title: string;
    thumbnail: string;
    price: number;
    courseType: string;
    creditCost?: number;
  }
}


export type Wallet = {
  creditBalance : number;
  creditValue : number;
  transactions : Transaction[];
  creditConst :number;
  creditPurchaseCommision : number;
  creditWithdrawMinLimit : number ;
  creditWithdrawMaxLimit : number ;
  creditWithdrawCommision : number;
  creditWithdrawCommisionLimit : number;
}

export type QueryType = { 
  limit: number;
  status: string;
  refresh : boolean
}