var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');

var CommentSchema = new Schema({
  user: {
    type: String,
    "default": ''
  },
  createtime: {
    type: String,
    "default": ''
  },
  content: {
    type: String,
    "default": ''
  },
  type: {
    type: String,
    "default": ''
  },
  targetId: {
    type: String,
    "default": ''
  },
  attention: {    //集赞数
    type: Number,
    "default": 0
  },
  attentionUsers: {//点赞用户名，每个用户限赞一次
    type: Array,
    "default": []
  },
  score: {          //评分，根据集赞数自动评分，管理员可以根据评论质量手动加分或减分
    type: Number,
    "default": 0
  },
  id: {             //数据库自动生成的_id转String类型，用于输出到前端
    type: String,
    "default":　""
  }
});


mongoose.model('Comment', CommentSchema);

