export type ContentModules = {
  _id : string ;
  contentUrl : string ;
  courseId : string ;
  duration : number ;
  summary : string ;
  thumbnailUrl : string ;
  title : string ;
  subTitle ?: string ;
  next : number,
  quizData:{
    questions:string,
    answer:string,
    options:string[] 
  } | []
}

export type RoomChatType = {
  _id : string,
  sender : {
    _id : string,
    name : string,
    avatarUrl ?: string
  },
  message : string,
  createdAt : string
}

export type ChatType = {
  role : "system" | "user" | "assistent",
  content : string
}

export type CourseType = {
  _id : string;

  tutorId : {
    _id : string;
    name : string;
    avatarUrl : string;
    tutorProfile : {
      bio : string;
      experience : string;
    }
  };

  title : string;
  description : string;
  price : string;
  category : string ;
  contentModules : ContentModules[];
  courseType : "credit" | "paid";
  courseLevel : "beginner"| "intermediate"| "expert";
  courseSkills : string[];
  creditCost : number;
  ratingsAverage ?: number;
  status : string;
  thumbnailUrl : string;
  totalEnrollments : number;
  certified : boolean;
  courseDuration ?: number;
  courseResources : string[]
}

export type QuizType = {
  question : string,
  options : string[],
  answer : string
}