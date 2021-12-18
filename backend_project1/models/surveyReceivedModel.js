import mongoose from "mongoose";
import Url from "../constaint/UrlConnect";
import StatusSurveyItem from "../constaint/StatusSurveyItem";
mongoose.connect(Url.DbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const { Schema } = mongoose;

const surveySchema = new Schema(
  {
    email_user: String,
    survey_received: [
      {
        title: String,
        option: [String],
        schedule_survey : [{id_schedule_survey:String , endDate : Date , startDate : Date}], 
        flag : {type :String, default : "SURVEY"} , 
        vote_number: Number, //so luong nguoi da vote
        note: String,
        decription: String,
        received_to: String,
        id_survey_send: String,
        user_voted: [Number], //option chon
        create_at: { type: Date, default: Date.now },
        is_check: { type: String, default: StatusSurveyItem.NOT_DONE }, //kiem tra da xem chua //NOT SEEN //SEEN // NOT DONE
      },
    ],
  },
  {
    collection: "survey_received",
  }
);
const SurveyModelReceived = mongoose.model("SurveyModelReceived", surveySchema);

export default SurveyModelReceived;
