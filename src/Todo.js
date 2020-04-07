
import { Model } from 'radiks';

export default class Todo extends Model {
    static className = "Todo";
    
    static schema = {
        title: String,          // 标题
        description: String,    // 描述
        progress: Number,       // 进度
        isCompleted: Boolean,   // 是否完成
        startAt: Number,        // 开始时间
        deadline: Number,       // 截止时间
        flag: {
            type: Boolean,
            decrypted: true
        }
    }
}