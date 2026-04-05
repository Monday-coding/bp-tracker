// 获取血压分类
export const getBPClassification = (systolic, diastolic) => {
  if (systolic < 90 || diastolic < 60) {
    return { category: '低血壓', color: '#FFA500', advice: '請諮詢醫生' };
  }
  if (systolic >= 140 || diastolic >= 90) {
    return { category: '高血壓', color: '#FF4444', advice: '請諮詢醫生' };
  }
  if (systolic >= 120 || diastolic >= 80) {
    return { category: '正常偏高', color: '#FFA500', advice: '注意控制' };
  }
  return { category: '正常', color: '#4CAF50', advice: '保持良好' };
};

// 计算平均血压
export const calculateAverageBP = (records) => {
  if (!records || records.length === 0) return null;

  const sumSystolic = records.reduce((sum, r) => sum + r.systolic, 0);
  const sumDiastolic = records.reduce((sum, r) => sum + r.diastolic, 0);
  const sumPulse = records.reduce((sum, r) => sum + (r.pulse || 0), 0);

  return {
    systolic: Math.round(sumSystolic / records.length),
    diastolic: Math.round(sumDiastolic / records.length),
    pulse: Math.round(sumPulse / records.length),
  };
};

// 获取趋势
export const getBPTrend = (records) => {
  if (!records || records.length < 2) return 'stable';

  const sorted = [...records].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  const first = sorted[0];
  const last = sorted[sorted.length - 1];

  const diffSystolic = last.systolic - first.systolic;
  const diffDiastolic = last.diastolic - first.diastolic;

  if (diffSystolic > 5 || diffDiastolic > 5) return 'rising';
  if (diffSystolic < -5 || diffDiastolic < -5) return 'falling';
  return 'stable';
};

// 格式化日期时间
export const formatDateTime = (isoString) => {
  const date = new Date(isoString);
  return {
    date: date.toLocaleDateString('zh-HK', { year: 'numeric', month: '2-digit', day: '2-digit' }),
    time: date.toLocaleTimeString('zh-HK', { hour: '2-digit', minute: '2-digit' }),
  };
};
