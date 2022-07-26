import * as  mongoose from 'mongoose';
const Schema = mongoose.Schema

const userSchema = new mongoose.Schema({
        username: {
            type: String,
            unique: true,
        },
        email: {
            type: String,
            unique: true,
        },
        password: String,
        role: String,
        firstName: String,
        lastName: String,
        nickName: String,
        about: String,
        API_KEY: String,
        uuid: String,
        age: Number,
        followingCount: {type:Number,min:0},
        followersCount: {type:Number,min:0},
        postsCount: {type:Number,min:0},
        following: Array,
        posts: [{type: Schema.Types.ObjectId, ref: 'post'}],
        followers: Array,
        blockList: Array,
        conversation: [{type: Schema.Types.ObjectId, ref: 'conversation'}],
        profileImage: String,
        gender: String,
        relationshipStatus: String,
        city: String,
        country: String,
        status: String,
        keyMaster: Boolean,
    }
    , {timestamps: true}
);


// module.exports = mongoose.model("user", userSchema)
export default mongoose.model("user", userSchema)