# Demo Page - LeetCode API Test Interface

## 📋 Overview

Demo page được tạo để test và demo LeetCode API với giao diện người dùng thân thiện. Page này cho phép submit JavaScript code và nhận kết quả thực thi real-time.

## 🚀 Features

### ✅ Code Editor

- **JavaScript Editor**: Textarea với monospace font cho việc viết code
- **Syntax Highlighting**: Sẵn sàng cho tích hợp syntax highlighter
- **Auto-resize**: Textarea có thể resize theo nội dung
- **Placeholder Text**: Hướng dẫn người dùng

### ✅ Code Execution

- **Submit Code**: Gửi JavaScript code đến LeetCode API (Language ID: 63)
- **Real-time Results**: Polling để lấy kết quả execution ngay lập tức
- **Status Tracking**: Hiển thị trạng thái submission với icons và colors

### ✅ Input/Output Management

- **Standard Input**: Textarea để nhập stdin cho program
- **Execution Output**: Hiển thị stdout từ code execution
- **Error Display**: Hiển thị compilation errors và runtime errors
- **Performance Metrics**: Hiển thị execution time và memory usage

### ✅ UI/UX Features

- **Responsive Design**: Hoạt động tốt trên desktop và mobile
- **Dark/Light Mode**: Tương thích với theme system hiện có
- **Loading States**: Spinner và disabled buttons khi đang process
- **Error Handling**: User-friendly error messages

## 🔧 Technical Implementation

### API Integration

```javascript
// API Configuration
const API_BASE_URL = "http://localhost:3001/api";
const LANGUAGE_ID = 63; // JavaScript (Node.js)

// Submit code
POST /api/submissions
{
  "source_code": "console.log('Hello World')",
  "language_id": 63,
  "stdin": "",
  "cpu_time_limit": 2,
  "memory_limit": 128000,
  "wall_time_limit": 5
}

// Get results
GET /api/submissions/{submission_id}
```

### Polling Mechanism

- **Interval**: 1 second
- **Max Attempts**: 30 (30 seconds timeout)
- **Auto-stop**: Khi execution completed hoặc timeout

### Status Handling

- ✅ **Accepted** (Green): Code chạy thành công
- ❌ **Wrong Answer** (Red): Kết quả không đúng
- ⚠️ **Runtime/Compilation Error** (Orange): Lỗi khi chạy
- ⏳ **Processing** (Gray): Đang xử lý

## 📁 File Structure

```
src/pages/Demo/
├── index.jsx           # Main Demo component
├── Demo.module.scss    # Styling cho Demo page
└── README.md          # Documentation này
```

## 🎨 Styling

### Design System Integration

- **Colors**: Sử dụng CSS variables từ design system
- **Spacing**: Tuân theo spacing scale của project
- **Typography**: Monospace font cho code editor
- **Components**: Tương thích với existing components

### Key Styles

```scss
// Code Editor
.codeEditor {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  background: var(--color-background);
  border: 1px solid var(--color-border);
}

// Status Badges
.statusBadge.green {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}
```

## 🔗 Navigation

Demo page có thể được truy cập thông qua:

- **URL**: `http://localhost:3000/demo`
- **Header Navigation**: Link "Demo" trong header menu
- **Direct Navigation**: Sử dụng React Router

## 🚀 Usage

1. **Navigate to Demo**: Click "Demo" link in header hoặc go to `/demo`
2. **Write Code**: Enter JavaScript code trong editor
3. **Add Input**: (Optional) Add stdin input if needed
4. **Submit**: Click "Run Code" button
5. **View Results**: Results sẽ appear trong right panel

## 🔄 Demo Code

Page đi kèm với sample code sẵn có:

```javascript
// JavaScript Demo Code
function twoSum(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        map.set(nums[i], i);
    }
    
    return [];
}

// Test the function
console.log(twoSum([2, 7, 11, 15], 9)); // Expected: [0, 1]
console.log(twoSum([3, 2, 4], 6));      // Expected: [1, 2]
```

## 🔧 Configuration

### API Configuration

File: `src/configs/api.js`

```javascript
export const API_CONFIG = {
    BASE_URL: "http://localhost:3001/api",
    LANGUAGES: {
        JAVASCRIPT: 63
    },
    POLLING: {
        INTERVAL: 1000,
        MAX_ATTEMPTS: 30
    }
};
```

## 🎯 Future Enhancements

- [ ] **Syntax Highlighting**: Integrate CodeMirror hoặc Monaco Editor
- [ ] **Multiple Languages**: Support Python, Java, C++ và các ngôn ngữ khác
- [ ] **Code Templates**: Pre-built code templates cho common problems
- [ ] **Save/Load**: Ability to save và load code snippets
- [ ] **History**: Track submission history
- [ ] **Test Cases**: Add custom test cases functionality
- [ ] **Performance Charts**: Visualize execution metrics

## 🐛 Known Issues

- **CORS**: Cần ensure API server có CORS configured correctly
- **Polling**: Có thể optimize polling mechanism để efficient hơn
- **Error Handling**: Có thể improve error messages và handling

## 📞 Testing

To test Demo page:

1. **Start API Server**: `cd leetcode-api && npm start`
2. **Start UI Server**: `cd leetcode-ui && npm run dev`  
3. **Navigate**: Go to `http://localhost:3000/demo`
4. **Submit Code**: Use demo code hoặc write custom JavaScript
5. **Check Results**: Verify execution results appear correctly
