import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
    {
        id:{
            
        },
        videoFile:{
            type: String, //cloudinary url
            required: true,
        },
        thumbnail:{
            type:String,
            requrired: true
        },
        title:{
            type: String,
            required: true
        },
        description:{
            type: String,

        },
        duration:{
            type: String, // cloudinary
            required: true
        },
        views:{
            type: Number,
            default: 0
        },
        isPublished:{
            type:Boolean,
            default: true
        },
        owner:{
            type: Schema.Types.ObjectId,
            ref: "User"
        }


},{timestamps: true}
)


videoSchema.plugin(mongooseAggregatePaginate)
export const Video = mongoose.model("Video", videoSchema)