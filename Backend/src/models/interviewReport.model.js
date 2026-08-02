const mongoose= require('mongoose');

const technicalQuestionsSchema= new mongoose.Schema({
  questions:{
    type: String, 
    required: [true, 'Questions reequired']
  },
    intention:{
    type: String,
    required: [true, 'Intention required']
  },
  answer:{
    type: String,
    required: [true, 'answer required']
  },
},{
  _id:false
})

const behavioralQuestionsSchema= new mongoose.Schema({
  questions:{
   type: String, 
    required: [true, 'questions required']
  },
    intention:{
    type: String,
    required: [true, 'Intentions required']
  },
  answer:{
    type: String,
    required: [true, 'answer required']
  },
},{
  _id:false
})

const skillGapSchema= new mongoose.Schema({
  skill:{
    type: String,
    required: [true, 'Skill required']
  },
    severity:{
    type: String, 
    enum:['low', 'medium', 'high'],
    required: [true, 'severity required']
  },
},{
  _id:false
})

const preparationPlanSchema= new mongoose.Schema({
  day:{
    type: Number, 
    required: [true, 'Day required']
  },
    focus:{
    type: String,
    required: [true, 'focus required']
  },
  task:[{
    type: String,
    required: [true, 'Task required']
  }],
},{
  _id:false
})



const interviewReportSchema= new mongoose.Schema({
    jobDescription:{
        type: string,
        required: [true, 'Job description required']
    }
  ,
  resume:{
    type: String,
  },
  
  selfDescription:{
    type: String,
  },
  matchScore:{
    type:Number,
    min:0,
    max:100
,  },
technicalQuestions:[technicalQuestionSchema],
behavioralQuestions:[behavioralQuestionSchema],
skillGaps:[skillGapSchema],
preparationPlan:[preparationPlanSchema]
},{
  timestamps:true

})

const interviewReportModel= mongoose.model('InterviewReport',interviewReportSchema);

module.exports= interviewReportModel