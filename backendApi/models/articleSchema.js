import mongoose from "mongoose";
const { Schema } = mongoose;

const articleSchema = new Schema({
    title: {type: String, required: true, trim: true},
    body: {type: String, required: true},
    isPublic: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now} 
});

module.exports = mongoose.model('Article', articleSchema);

