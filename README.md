# 承庚工作室线上预约系统

## 功能简介
- 用户可在线预约指定日期和时间段
- 仅开放每周二~周六，时间段为 9:30-10:30、10:30-11:30、14:30-15:30、15:30-16:30
- 每个时间段配额为1，已约满不可选
- 用户填写姓名和手机号（本版不校验）
- 主色 #FE9C37，次色 #FFF5EB

## 目录结构
```
/project-root
│
├── DOC/                  # 设计文档
├── images/               # 图标、二维码等
├── src/
│   ├── index.html        # 预约页面
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── main.js
├── .gitignore
├── README.md
└── package.json          # 如用npm管理依赖
```

## 本地预览
1. 进入 `src/` 目录，直接用浏览器打开 `index.html` 即可。
2. 如需本地服务器，可用 VSCode Live Server 插件或 `npx serve src`。

## 部署到 Cloudflare Pages
1. 新建 GitHub 仓库并推送代码。
2. 登录 Cloudflare，进入 Pages，新建项目，选择 GitHub 仓库。
3. 构建设置：
   - 构建命令：无（静态站点）
   - 输出目录：`src`
4. 绑定自定义域名。
5. 以后每次 push 到 GitHub，Cloudflare Pages 会自动部署。

## 版本管理
- 每个功能/修复请新建分支，合并到主分支后打 tag。
- 详细设计见 `DOC/design_doc.md`。

## 设计与开发规范
- 详见 `DOC/design_doc.md`。 