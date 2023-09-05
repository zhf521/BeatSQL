/*
如何判断用户的 SQL 语句是否正确呢？

不是直接去对比用户的输入语句和我们预设的答案是否一致（那样太死板了），而是依次执行以下 3 个操作：

分别提交用户的输入语句和答案语句，得到两份结果表
判断两个结果表输出的列名是否一致（名称和顺序都要一致）
判断两个结果表输出的数据是否一致
这里用了个 trick 方式来对比数据，直接把两份结果集转为 JSON 格式，对比 JSON 字符串是否一致即可，而不是多重 for 循环
*/

// 结果状态枚举
export const RESULT_STATUS_ENUM = {
    DEFAULT: -1,
    ERROR: 0,
    SUCCEED: 1,
};

// 结果状态信息映射
export const RESULT_STATUS_INFO_MAP = {
    '-1': '未执行',
    0: '❌ 错误',
    1: '✅ 正确',
};

// 判断结果是否正确
export const checkResult = (result, answerResult) => {
    if (!result?.[0] || !answerResult?.[0]) {
        return RESULT_STATUS_ENUM.ERROR;
    }
    // 列名需要一致
    const resultColumns = result[0].columns;
    const answerResultColumns = answerResult[0].columns;
    if (JSON.stringify(resultColumns) !== JSON.stringify(answerResultColumns)) {
        return RESULT_STATUS_ENUM.ERROR;
    }
    // 数据需要一致
    const resultValues = result[0].values;
    const answerResultValues = result[0].values;
    if (JSON.stringify(resultValues) === JSON.stringify(answerResultValues)) {
        return RESULT_STATUS_ENUM.SUCCEED;
    }
    return RESULT_STATUS_ENUM.ERROR;
};
