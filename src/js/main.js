// 配置
const openWeekdays = [2, 3, 4, 5, 6]; // 周二~周六
const timeSlots = [
  "9:30-10:30",
  "10:30-11:30",
  "14:30-15:30",
  "15:30-16:30"
];

// 中文星期
const weekMap = ['周日','周一','周二','周三','周四','周五','周六'];

// 模拟配额（每个时间段1个名额，已预约则不可选，实际应由后端控制）
let slotQuota = {}; // { '2024-06-01': { '9:30-10:30': 1, ... } }

// 初始化日期选择器
flatpickr("#date", {
  minDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // 明天
  maxDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7天后
  dateFormat: "Y-m-d",
  locale: {
    weekdays: {
      shorthand: ['日', '一', '二', '三', '四', '五', '六'],
      longhand: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    },
    firstDayOfWeek: 1
  },
  disable: [
    function(date) {
      // 只允许周二~周六
      return !openWeekdays.includes(date.getDay());
    }
  ],
  onChange: function(selectedDates, dateStr, instance) {
    // 在输入框后面显示中文星期几
    if(selectedDates.length > 0) {
      const week = weekMap[selectedDates[0].getDay()];
      document.getElementById('weekday-label').textContent = week;
    } else {
      document.getElementById('weekday-label').textContent = '';
    }
    updateTimeSlots(dateStr);
  }
});

// 更新时间段下拉框
function updateTimeSlots(date) {
  const select = document.getElementById('time');
  select.innerHTML = '<option value="">请选择时间段</option>';
  timeSlots.forEach(slot => {
    // 检查配额
    const quota = slotQuota[date]?.[slot] || 0;
    const disabled = quota >= 1 ? 'disabled' : '';
    const text = quota >= 1 ? `${slot}（已约满）` : slot;
    select.innerHTML += `<option value="${slot}" ${disabled}>${text}</option>`;
  });
}

// 表单提交
document.getElementById('booking-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;

  if (!date || !time) {
    alert('请选择日期和时间段');
    return;
  }

  // 模拟预约成功
  if (!slotQuota[date]) slotQuota[date] = {};
  slotQuota[date][time] = 1;
  alert('预约成功！');
  updateTimeSlots(date);
  this.reset();
  document.getElementById('weekday-label').textContent = '';
}); 